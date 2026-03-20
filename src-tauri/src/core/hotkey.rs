<<<<<<< HEAD
use crate::process::AsyncHandler;
use crate::singleton;
use crate::utils::notification::{NotificationEvent, notify_event};
use crate::utils::window_manager::WindowManager;
use crate::{config::Config, core::handle, feat, module::lightweight::entry_lightweight_mode};
use anyhow::{Result, bail};
use arc_swap::ArcSwap;
use clash_verge_logging::{Type, logging};
use smartstring::alias::String;
use std::{collections::HashMap, fmt, str::FromStr, sync::Arc};
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt as _, ShortcutState};

/// Enum representing all available hotkey functions
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum HotkeyFunction {
    OpenOrCloseDashboard,
    ClashModeRule,
    ClashModeGlobal,
    ClashModeDirect,
    ToggleSystemProxy,
    ToggleTunMode,
    EntryLightweightMode,
    ReactivateProfiles,
    Quit,
    #[cfg(target_os = "macos")]
    Hide,
}

impl fmt::Display for HotkeyFunction {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::OpenOrCloseDashboard => "open_or_close_dashboard",
            Self::ClashModeRule => "clash_mode_rule",
            Self::ClashModeGlobal => "clash_mode_global",
            Self::ClashModeDirect => "clash_mode_direct",
            Self::ToggleSystemProxy => "toggle_system_proxy",
            Self::ToggleTunMode => "toggle_tun_mode",
            Self::EntryLightweightMode => "entry_lightweight_mode",
            Self::ReactivateProfiles => "reactivate_profiles",
            Self::Quit => "quit",
            #[cfg(target_os = "macos")]
            Self::Hide => "hide",
        };
        write!(f, "{s}")
    }
}

impl FromStr for HotkeyFunction {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.trim() {
            "open_or_close_dashboard" => Ok(Self::OpenOrCloseDashboard),
            "clash_mode_rule" => Ok(Self::ClashModeRule),
            "clash_mode_global" => Ok(Self::ClashModeGlobal),
            "clash_mode_direct" => Ok(Self::ClashModeDirect),
            "toggle_system_proxy" => Ok(Self::ToggleSystemProxy),
            "toggle_tun_mode" => Ok(Self::ToggleTunMode),
            "entry_lightweight_mode" => Ok(Self::EntryLightweightMode),
            "reactivate_profiles" => Ok(Self::ReactivateProfiles),
            "quit" => Ok(Self::Quit),
            #[cfg(target_os = "macos")]
            "hide" => Ok(Self::Hide),
            _ => bail!("invalid hotkey function: {}", s),
        }
    }
}

#[cfg(target_os = "macos")]
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
/// Enum representing predefined system hotkeys
pub enum SystemHotkey {
    CmdQ,
    CmdW,
}

#[cfg(target_os = "macos")]
impl fmt::Display for SystemHotkey {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::CmdQ => "CMD+Q",
            Self::CmdW => "CMD+W",
        };
        write!(f, "{s}")
    }
}

#[cfg(target_os = "macos")]
impl SystemHotkey {
    pub const fn function(self) -> HotkeyFunction {
        match self {
            Self::CmdQ => HotkeyFunction::Quit,
            Self::CmdW => HotkeyFunction::Hide,
        }
    }
}

pub struct Hotkey {
    current: ArcSwap<Vec<String>>,
}

impl Hotkey {
    fn new() -> Self {
        Self {
            current: ArcSwap::new(Arc::new(Vec::new())),
        }
    }

    /// Execute the function associated with a hotkey function enum
    fn execute_function(function: HotkeyFunction) {
        match function {
            HotkeyFunction::OpenOrCloseDashboard => {
                AsyncHandler::spawn(async move || {
                    crate::feat::open_or_close_dashboard().await;
                    notify_event(NotificationEvent::DashboardToggled).await;
                });
            }
            HotkeyFunction::ClashModeRule => {
                AsyncHandler::spawn(async move || {
                    feat::change_clash_mode("rule".into()).await;
                    notify_event(NotificationEvent::ClashModeChanged { mode: "Rule" }).await;
                });
            }
            HotkeyFunction::ClashModeGlobal => {
                AsyncHandler::spawn(async move || {
                    feat::change_clash_mode("global".into()).await;
                    notify_event(NotificationEvent::ClashModeChanged { mode: "Global" }).await;
                });
            }
            HotkeyFunction::ClashModeDirect => {
                AsyncHandler::spawn(async move || {
                    feat::change_clash_mode("direct".into()).await;
                    notify_event(NotificationEvent::ClashModeChanged { mode: "Direct" }).await;
                });
            }
            HotkeyFunction::ToggleSystemProxy => {
                AsyncHandler::spawn(async move || {
                    feat::toggle_system_proxy().await;
                    notify_event(NotificationEvent::SystemProxyToggled).await;
                });
            }
            HotkeyFunction::ToggleTunMode => {
                AsyncHandler::spawn(async move || {
                    feat::toggle_tun_mode(None).await;
                    notify_event(NotificationEvent::TunModeToggled).await;
                });
            }
            HotkeyFunction::EntryLightweightMode => {
                AsyncHandler::spawn(async move || {
                    entry_lightweight_mode().await;
                    notify_event(NotificationEvent::LightweightModeEntered).await;
                });
            }
            HotkeyFunction::ReactivateProfiles => {
                AsyncHandler::spawn(async move || match feat::enhance_profiles().await {
                    Ok((true, _)) => {
                        handle::Handle::refresh_clash();
                        notify_event(NotificationEvent::ProfilesReactivated).await;
                    }
                    Ok((false, msg)) => {
                        let message = if msg.is_empty() {
                            "Failed to reactivate profiles.".to_string()
                        } else {
                            msg.to_string()
                        };
                        logging!(
                            warn,
                            Type::Hotkey,
                            "Hotkey profile reactivation failed validation: {}",
                            message.as_str()
                        );
                        handle::Handle::notice_message("reactivate_profiles::error", message);
                    }
                    Err(err) => {
                        logging!(
                            error,
                            Type::Hotkey,
                            "Failed to reactivate subscriptions via hotkey: {}",
                            err
                        );
                        handle::Handle::notice_message("reactivate_profiles::error", err.to_string());
                    }
                });
            }
            HotkeyFunction::Quit => {
                AsyncHandler::spawn(async move || {
                    notify_event(NotificationEvent::AppQuit).await;
                    feat::quit().await;
                });
            }
            #[cfg(target_os = "macos")]
            HotkeyFunction::Hide => {
                AsyncHandler::spawn(async move || {
                    feat::hide().await;
                    notify_event(NotificationEvent::AppHidden).await;
                });
            }
        }
    }

    #[cfg(target_os = "macos")]
    /// Register a system hotkey using enum
    pub async fn register_system_hotkey(&self, hotkey: SystemHotkey) -> Result<()> {
        let hotkey_str = hotkey.to_string();
        let function = hotkey.function();
        self.register_hotkey_with_function(&hotkey_str, function).await
    }

    #[cfg(target_os = "macos")]
    /// Unregister a system hotkey using enum
    pub fn unregister_system_hotkey(&self, hotkey: SystemHotkey) -> Result<()> {
        let hotkey_str = hotkey.to_string();
        self.unregister(&hotkey_str)
    }

    /// Register a hotkey with function enum
    #[allow(clippy::unused_async)]
    pub async fn register_hotkey_with_function(&self, hotkey: &str, function: HotkeyFunction) -> Result<()> {
        let app_handle = handle::Handle::app_handle();
        let manager = app_handle.global_shortcut();

        logging!(
            debug,
            Type::Hotkey,
            "Attempting to register hotkey: {} for function: {}",
            hotkey,
            function
        );

        if manager.is_registered(hotkey) {
            logging!(
                debug,
                Type::Hotkey,
                "Hotkey {} was already registered, unregistering first",
                hotkey
            );
            manager.unregister(hotkey)?;
        }

        let is_quit = matches!(function, HotkeyFunction::Quit);

        manager.on_shortcut(hotkey, move |_app_handle, hotkey_event, event| {
            if event.state == ShortcutState::Pressed {
                logging!(debug, Type::Hotkey, "Hotkey pressed: {:?}", hotkey_event);
                let hotkey = hotkey_event.key;
                if hotkey == Code::KeyQ && is_quit {
                    if let Some(window) = WindowManager::get_main_window()
                        && window.is_focused().unwrap_or(false)
                    {
                        logging!(debug, Type::Hotkey, "Executing quit function");
                        Self::execute_function(function);
                    }
                } else {
                    AsyncHandler::spawn(move || async move {
                        logging!(debug, Type::Hotkey, "Executing function directly");

                        let is_enable_global_hotkey =
                            Config::verge().await.data_arc().enable_global_hotkey.unwrap_or(true);

                        if is_enable_global_hotkey {
                            Self::execute_function(function);
                        } else {
                            use crate::utils::window_manager::WindowManager;
                            let window = WindowManager::get_main_window();
                            let is_visible = WindowManager::is_main_window_visible(window.as_ref());
                            let is_focused = WindowManager::is_main_window_focused(window.as_ref());

                            if is_focused && is_visible {
                                Self::execute_function(function);
                            }
                        }
                    });
                }
            }
        })?;

        logging!(
            debug,
            Type::Hotkey,
            "Successfully registered hotkey {} for {}",
            hotkey,
            function
        );
        Ok(())
    }
}

singleton!(Hotkey, INSTANCE);

impl Hotkey {
    pub async fn init(&self, skip: bool) -> Result<()> {
        if skip {
            logging!(debug, Type::Hotkey, "skip register all hotkeys");
            return Ok(());
        }
        let verge = Config::verge().await;
        let enable_global_hotkey = verge.latest_arc().enable_global_hotkey.unwrap_or(true);

        logging!(
            debug,
            Type::Hotkey,
            "Initializing global hotkeys: {}",
            enable_global_hotkey
        );

        // Extract hotkeys data before async operations
        let hotkeys = verge.latest_arc().hotkeys.clone();

        if let Some(hotkeys) = hotkeys {
            logging!(debug, Type::Hotkey, "Has {} hotkeys need to register", hotkeys.len());

=======
use crate::core::handle;
use crate::{config::Config, feat, log_err};
use anyhow::{bail, Result};
use once_cell::sync::OnceCell;
use parking_lot::Mutex;
use std::{collections::HashMap, sync::Arc};
use tauri::Manager;
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, ShortcutState};
pub struct Hotkey {
    current: Arc<Mutex<Vec<String>>>, // 保存当前的热键设置
}

impl Hotkey {
    pub fn global() -> &'static Hotkey {
        static HOTKEY: OnceCell<Hotkey> = OnceCell::new();

        HOTKEY.get_or_init(|| Hotkey {
            current: Arc::new(Mutex::new(Vec::new())),
        })
    }

    pub fn init(&self) -> Result<()> {
        let verge = Config::verge();

        if let Some(hotkeys) = verge.latest().hotkeys.as_ref() {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            for hotkey in hotkeys.iter() {
                let mut iter = hotkey.split(',');
                let func = iter.next();
                let key = iter.next();

                match (key, func) {
                    (Some(key), Some(func)) => {
<<<<<<< HEAD
                        logging!(debug, Type::Hotkey, "Registering hotkey: {} -> {}", key, func);
                        if let Err(e) = self.register(key, func).await {
                            logging!(
                                error,
                                Type::Hotkey,
                                "Failed to register hotkey {} -> {}: {:?}",
                                key,
                                func,
                                e
                            );
                        } else {
                            logging!(
                                debug,
                                Type::Hotkey,
                                "Successfully registered hotkey {} -> {}",
                                key,
                                func
                            );
                        }
=======
                        log_err!(self.register(key, func));
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                    }
                    _ => {
                        let key = key.unwrap_or("None");
                        let func = func.unwrap_or("None");
<<<<<<< HEAD
                        logging!(
                            error,
                            Type::Hotkey,
                            "Invalid hotkey configuration: `{}`:`{}`",
                            key,
                            func
                        );
                    }
                }
            }
            self.current.store(Arc::new(hotkeys));
        } else {
            logging!(debug, Type::Hotkey, "No hotkeys configured");
=======
                        log::error!(target: "app", "invalid hotkey `{key}`:`{func}`");
                    }
                }
            }
            self.current.lock().clone_from(hotkeys);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }

        Ok(())
    }

<<<<<<< HEAD
    pub fn reset(&self) -> Result<()> {
        let app_handle = handle::Handle::app_handle();
        let manager = app_handle.global_shortcut();
        manager.unregister_all()?;
        Ok(())
    }

    /// Register a hotkey with string-based function (backward compatibility)
    pub async fn register(&self, hotkey: &str, func: &str) -> Result<()> {
        let function = HotkeyFunction::from_str(func)?;
        self.register_hotkey_with_function(hotkey, function).await
    }

    pub fn unregister(&self, hotkey: &str) -> Result<()> {
        let app_handle = handle::Handle::app_handle();
        let manager = app_handle.global_shortcut();
        manager.unregister(hotkey)?;
        logging!(debug, Type::Hotkey, "Unregister hotkey {}", hotkey);
        Ok(())
    }

    pub async fn update(&self, new_hotkeys: Vec<String>) -> Result<()> {
        // Extract current hotkeys before async operations
        let current_hotkeys = &*self.current.load();
        let old_map = Self::get_map_from_vec(current_hotkeys);
=======
    pub fn register(&self, hotkey: &str, func: &str) -> Result<()> {
        let app_handle = handle::Handle::global().app_handle().unwrap();
        let manager = app_handle.global_shortcut();

        if manager.is_registered(hotkey) {
            manager.unregister(hotkey)?;
        }

        let f = match func.trim() {
            "open_or_close_dashboard" => feat::open_or_close_dashboard,
            "clash_mode_rule" => || feat::change_clash_mode("rule".into()),
            "clash_mode_global" => || feat::change_clash_mode("global".into()),
            "clash_mode_direct" => || feat::change_clash_mode("direct".into()),
            "toggle_system_proxy" => feat::toggle_system_proxy,
            "toggle_tun_mode" => feat::toggle_tun_mode,
            "quit" => || feat::quit(Some(0)),

            _ => bail!("invalid function \"{func}\""),
        };

        let _ = manager.on_shortcut(hotkey, move |app_handle, hotkey, event| {
            if event.state == ShortcutState::Pressed {
                if hotkey.key == Code::KeyQ {
                    if let Some(window) = app_handle.get_webview_window("main") {
                        if window.is_focused().unwrap_or(false) {
                            f();
                        }
                    }
                } else {
                    f();
                }
            }
        });

        log::debug!(target: "app", "register hotkey {hotkey} {func}");
        Ok(())
    }

    pub fn unregister(&self, hotkey: &str) -> Result<()> {
        let app_handle = handle::Handle::global().app_handle().unwrap();
        let manager = app_handle.global_shortcut();
        manager.unregister(hotkey)?;

        log::debug!(target: "app", "unregister hotkey {hotkey}");
        Ok(())
    }

    pub fn update(&self, new_hotkeys: Vec<String>) -> Result<()> {
        let mut current = self.current.lock();
        let old_map = Self::get_map_from_vec(&current);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        let new_map = Self::get_map_from_vec(&new_hotkeys);

        let (del, add) = Self::get_diff(old_map, new_map);

        del.iter().for_each(|key| {
            let _ = self.unregister(key);
        });

<<<<<<< HEAD
        for (key, func) in add.iter() {
            self.register(key, func).await?;
        }

        // Update the current hotkeys after all async operations
        self.current.store(Arc::new(new_hotkeys));
=======
        add.iter().for_each(|(key, func)| {
            log_err!(self.register(key, func));
        });

        *current = new_hotkeys;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        Ok(())
    }

    fn get_map_from_vec(hotkeys: &[String]) -> HashMap<&str, &str> {
        let mut map = HashMap::new();

        hotkeys.iter().for_each(|hotkey| {
            let mut iter = hotkey.split(',');
            let func = iter.next();
            let key = iter.next();

<<<<<<< HEAD
            if let (Some(func), Some(key)) = (func, key) {
                let func = func.trim();
                let key = key.trim();
=======
            if func.is_some() && key.is_some() {
                let func = func.unwrap().trim();
                let key = key.unwrap().trim();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                map.insert(key, func);
            }
        });
        map
    }

    fn get_diff<'a>(
        old_map: HashMap<&'a str, &'a str>,
        new_map: HashMap<&'a str, &'a str>,
    ) -> (Vec<&'a str>, Vec<(&'a str, &'a str)>) {
        let mut del_list = vec![];
        let mut add_list = vec![];

        old_map.iter().for_each(|(&key, func)| {
            match new_map.get(key) {
                Some(new_func) => {
                    if new_func != func {
                        del_list.push(key);
                        add_list.push((key, *new_func));
                    }
                }
                None => del_list.push(key),
            };
        });

        new_map.iter().for_each(|(&key, &func)| {
            if !old_map.contains_key(key) {
                add_list.push((key, func));
            }
        });

        (del_list, add_list)
    }
}

impl Drop for Hotkey {
    fn drop(&mut self) {
<<<<<<< HEAD
        let app_handle = handle::Handle::app_handle();
        if let Err(e) = app_handle.global_shortcut().unregister_all() {
            logging!(error, Type::Hotkey, "Error unregistering all hotkeys: {:?}", e);
=======
        let app_handle = handle::Handle::global().app_handle().unwrap();
        if let Err(e) = app_handle.global_shortcut().unregister_all() {
            log::error!(target:"app", "Error unregistering all hotkeys: {:?}", e);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }
    }
}
