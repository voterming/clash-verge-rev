<<<<<<< HEAD
use crate::config::Config;
use crate::{
    config::{DEFAULT_PAC, deserialize_encrypted, serialize_encrypted},
    utils::{dirs, help},
};
use anyhow::Result;
use clash_verge_logging::{Type, logging};
=======
use crate::config::DEFAULT_PAC;
use crate::config::{deserialize_encrypted, serialize_encrypted};
use crate::utils::i18n;
use crate::utils::{dirs, help};
use anyhow::Result;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
use log::LevelFilter;
use serde::{Deserialize, Serialize};
use smartstring::alias::String;

/// ### `verge.yaml` schema
#[derive(Default, Debug, Clone, Deserialize, Serialize)]
pub struct IVerge {
    /// app log level
    /// silent | error | warn | info | debug | trace
    pub app_log_level: Option<String>,

<<<<<<< HEAD
    /// app log max size in KB
    pub app_log_max_size: Option<u64>,

    /// app log max count
    pub app_log_max_count: Option<usize>,

    // i18n
    pub language: Option<String>,

    /// `light` or `dark` or `system`
    pub theme_mode: Option<String>,

=======
    // i18n
    pub language: Option<String>,

    /// `light` or `dark` or `system`
    pub theme_mode: Option<String>,

>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    /// tray click event
    pub tray_event: Option<String>,

    /// copy env type
    pub env_type: Option<String>,

    /// start page
    pub start_page: Option<String>,
    /// startup script path
    pub startup_script: Option<String>,

    /// enable traffic graph default is true
    pub traffic_graph: Option<bool>,

    /// show memory info (only for Clash Meta)
    pub enable_memory_usage: Option<bool>,

    /// enable group icon
<<<<<<< HEAD
    #[serde(skip_serializing_if = "Option::is_none")]
    pub enable_group_icon: Option<bool>,

    /// pause render traffic stats on blur
    pub pause_render_traffic_stats_on_blur: Option<bool>,

    /// common tray icon
    #[serde(skip_serializing_if = "Option::is_none")]
=======
    pub enable_group_icon: Option<bool>,

    /// common tray icon
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    pub common_tray_icon: Option<bool>,

    /// tray icon
    #[cfg(target_os = "macos")]
<<<<<<< HEAD
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tray_icon: Option<String>,

    /// menu icon
    #[serde(skip_serializing_if = "Option::is_none")]
    pub menu_icon: Option<String>,

    /// menu order
    #[serde(skip_serializing_if = "Option::is_none")]
    pub menu_order: Option<Vec<String>>,

    /// toast / notice position on screen
    #[serde(skip_serializing_if = "Option::is_none")]
    pub notice_position: Option<String>,

    /// collapse navigation bar
    pub collapse_navbar: Option<bool>,

=======
    pub tray_icon: Option<String>,

    /// menu icon
    pub menu_icon: Option<String>,

>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    /// sysproxy tray icon
    pub sysproxy_tray_icon: Option<bool>,

    /// tun tray icon
    pub tun_tray_icon: Option<bool>,

    /// clash tun mode
    pub enable_tun_mode: Option<bool>,

    /// can the app auto startup
    pub enable_auto_launch: Option<bool>,

    /// not show the window on launch
    pub enable_silent_start: Option<bool>,

    /// set system proxy
    pub enable_system_proxy: Option<bool>,

    /// enable proxy guard
    pub enable_proxy_guard: Option<bool>,

<<<<<<< HEAD
    /// enable bypass format check
    pub enable_bypass_check: Option<bool>,

    /// enable dns settings - this controls whether dns_config.yaml is applied
    pub enable_dns_settings: Option<bool>,

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    /// always use default bypass
    pub use_default_bypass: Option<bool>,

    /// set system proxy bypass
    pub system_proxy_bypass: Option<String>,

    /// proxy guard duration
    pub proxy_guard_duration: Option<u64>,

    /// use pac mode
    pub proxy_auto_config: Option<bool>,

    /// pac script content
    pub pac_file_content: Option<String>,

<<<<<<< HEAD
    /// proxy host address
    pub proxy_host: Option<String>,

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    /// theme setting
    pub theme_setting: Option<IVergeTheme>,

    /// web ui list
    pub web_ui_list: Option<Vec<String>>,

    /// clash core path
    #[serde(skip_serializing_if = "Option::is_none")]
    pub clash_core: Option<String>,

    /// hotkey map
    /// format: {func},{key}
<<<<<<< HEAD
    #[serde(skip_serializing_if = "Option::is_none")]
    pub hotkeys: Option<Vec<String>>,

    /// enable global hotkey
    pub enable_global_hotkey: Option<bool>,

    /// 首页卡片设置
    /// 控制首页各个卡片的显示和隐藏
    pub home_cards: Option<serde_json::Value>,

=======
    pub hotkeys: Option<Vec<String>>,

>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    /// 切换代理时自动关闭连接
    pub auto_close_connection: Option<bool>,

    /// 是否自动检查更新
    pub auto_check_update: Option<bool>,

    /// 默认的延迟测试连接
    pub default_latency_test: Option<String>,

    /// 默认的延迟测试超时时间
<<<<<<< HEAD
    pub default_latency_timeout: Option<i16>,

    /// 是否自动检测当前节点延迟
    pub enable_auto_delay_detection: Option<bool>,

    /// 自动检测当前节点延迟的间隔（分钟）
    pub auto_delay_detection_interval_minutes: Option<u64>,
=======
    pub default_latency_timeout: Option<i32>,
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    /// 是否使用内部的脚本支持，默认为真
    pub enable_builtin_enhanced: Option<bool>,

    /// proxy 页面布局 列数
<<<<<<< HEAD
    pub proxy_layout_column: Option<u8>,
=======
    pub proxy_layout_column: Option<i32>,
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    /// 测试站列表
    pub test_list: Option<Vec<IVergeTestItem>>,

    /// 日志清理
<<<<<<< HEAD
    /// 0: 不清理; 1: 1天；2: 7天; 3: 30天; 4: 90天
    pub auto_log_clean: Option<i32>,

    /// Enable scheduled automatic backups
    pub enable_auto_backup_schedule: Option<bool>,

    /// Automatic backup interval in hours
    pub auto_backup_interval_hours: Option<u64>,

    /// Create backups automatically when critical configs change
    pub auto_backup_on_change: Option<bool>,
=======
    /// 0: 不清理; 1: 7天; 2: 30天; 3: 90天
    pub auto_log_clean: Option<i32>,

    /// 是否启用随机端口
    pub enable_random_port: Option<bool>,
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    /// verge 的各种 port 用于覆盖 clash 的各种 port
    #[cfg(not(target_os = "windows"))]
    pub verge_redir_port: Option<u16>,

    #[cfg(not(target_os = "windows"))]
    pub verge_redir_enabled: Option<bool>,

    #[cfg(target_os = "linux")]
    pub verge_tproxy_port: Option<u16>,

    #[cfg(target_os = "linux")]
    pub verge_tproxy_enabled: Option<bool>,

    pub verge_mixed_port: Option<u16>,

    pub verge_socks_port: Option<u16>,

    pub verge_socks_enabled: Option<bool>,

    pub verge_port: Option<u16>,

    pub verge_http_enabled: Option<bool>,

    /// WebDAV 配置 (加密存储)
    #[serde(
        serialize_with = "serialize_encrypted",
        deserialize_with = "deserialize_encrypted",
        skip_serializing_if = "Option::is_none",
        default
    )]
    pub webdav_url: Option<String>,

    /// WebDAV 用户名 (加密存储)
    #[serde(
        serialize_with = "serialize_encrypted",
        deserialize_with = "deserialize_encrypted",
        skip_serializing_if = "Option::is_none",
        default
    )]
    pub webdav_username: Option<String>,

    /// WebDAV 密码 (加密存储)
    #[serde(
        serialize_with = "serialize_encrypted",
        deserialize_with = "deserialize_encrypted",
        skip_serializing_if = "Option::is_none",
        default
    )]
    pub webdav_password: Option<String>,

<<<<<<< HEAD
    #[serde(skip)]
    pub enable_tray_speed: Option<bool>,

    // pub enable_tray_icon: Option<bool>,
    /// show proxy groups directly on tray root menu
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tray_proxy_groups_display_mode: Option<String>,
    /// show outbound modes directly on tray root menu
    pub tray_inline_outbound_modes: Option<bool>,

    /// 自动进入轻量模式
    pub enable_auto_light_weight_mode: Option<bool>,

    /// 自动进入轻量模式的延迟（分钟）
    pub auto_light_weight_minutes: Option<u64>,

    /// 启用代理页面自动滚动
    pub enable_hover_jump_navigator: Option<bool>,

    /// 代理页面自动滚动延迟（毫秒）
    pub hover_jump_navigator_delay: Option<u64>,

    /// 启用外部控制器
    pub enable_external_controller: Option<bool>,
=======
    pub enable_tray_speed: Option<bool>,
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}

#[derive(Default, Debug, Clone, Deserialize, Serialize)]
pub struct IVergeTestItem {
    pub uid: Option<String>,
    pub name: Option<String>,
    pub icon: Option<String>,
    pub url: Option<String>,
}

#[derive(Default, Debug, Clone, Deserialize, Serialize)]
pub struct IVergeTheme {
    pub primary_color: Option<String>,
    pub secondary_color: Option<String>,
    pub primary_text: Option<String>,
    pub secondary_text: Option<String>,

    pub info_color: Option<String>,
    pub error_color: Option<String>,
    pub warning_color: Option<String>,
    pub success_color: Option<String>,

    pub font_family: Option<String>,
    pub css_injection: Option<String>,
}

impl IVerge {
<<<<<<< HEAD
    /// 有效的clash核心名称
    pub const VALID_CLASH_CORES: &'static [&'static str] = &["verge-mihomo", "verge-mihomo-alpha"];

    /// 验证并修正配置文件中的clash_core值
    pub async fn validate_and_fix_config() -> Result<()> {
        let config_path = dirs::verge_path()?;
        let mut config = match help::read_yaml::<Self>(&config_path).await {
            Ok(config) => config,
            Err(_) => Self::template(),
        };

        let mut needs_fix = false;

        if let Some(ref core) = config.clash_core {
            let core_str = core.trim();
            if core_str.is_empty() || !Self::VALID_CLASH_CORES.contains(&core_str) {
                logging!(
                    warn,
                    Type::Config,
                    "启动时发现无效的clash_core配置: '{}', 将自动修正为 'verge-mihomo'",
                    core
                );
                config.clash_core = Some("verge-mihomo".into());
                needs_fix = true;
            }
        } else {
            logging!(
                info,
                Type::Config,
                "启动时发现未配置clash_core, 将设置为默认值 'verge-mihomo'"
            );
            config.clash_core = Some("verge-mihomo".into());
            needs_fix = true;
        }

        // 修正后保存配置
        if needs_fix {
            logging!(info, Type::Config, "正在保存修正后的配置文件...");
            help::save_yaml(&config_path, &config, Some("# Clash Verge Config")).await?;
            logging!(info, Type::Config, "配置文件修正完成，需要重新加载配置");

            Self::reload_config_after_fix(config).await?;
        } else {
            logging!(info, Type::Config, "clash_core配置验证通过: {:?}", config.clash_core);
        }

        Ok(())
    }

    /// 配置修正后重新加载配置
    async fn reload_config_after_fix(updated_config: Self) -> Result<()> {
        logging!(
            info,
            Type::Config,
            "内存配置已强制更新，新的clash_core: {:?}",
            &updated_config.clash_core
        );

        let config_draft = Config::verge().await;
        config_draft.edit_draft(|d| {
            *d = updated_config;
        });
        config_draft.apply();

        Ok(())
    }

    pub fn get_valid_clash_core(&self) -> String {
        self.clash_core.clone().unwrap_or_else(|| "verge-mihomo".into())
    }

    pub async fn new() -> Self {
        match dirs::verge_path() {
            Ok(path) => match help::read_yaml::<Self>(&path).await {
                Ok(mut config) => {
                    // compatibility
                    if let Some(start_page) = config.start_page.clone()
                        && start_page == "/home"
                    {
                        config.start_page = Some(String::from("/"));
                    }
                    config
                }
                Err(err) => {
                    logging!(error, Type::Config, "{err}");
                    Self::template()
                }
            },
            Err(err) => {
                logging!(error, Type::Config, "{err}");
=======
    fn get_system_language() -> String {
        let sys_lang = sys_locale::get_locale()
            .unwrap_or_else(|| String::from("en"))
            .to_lowercase();

        let lang_code = sys_lang.split(['_', '-']).next().unwrap_or("en");
        let supported_languages = i18n::get_supported_languages();

        if supported_languages.contains(&lang_code.to_string()) {
            lang_code.to_string()
        } else {
            String::from("en")
        }
    }

    pub fn new() -> Self {
        match dirs::verge_path().and_then(|path| help::read_yaml::<IVerge>(&path)) {
            Ok(config) => config,
            Err(err) => {
                log::error!(target: "app", "{err}");
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                Self::template()
            }
        }
    }

    pub fn template() -> Self {
        Self {
<<<<<<< HEAD
            app_log_max_size: Some(128),
            app_log_max_count: Some(8),
            clash_core: Some("verge-mihomo".into()),
            language: Some(clash_verge_i18n::system_language().into()),
=======
            clash_core: Some("verge-mihomo".into()),
            language: Some(Self::get_system_language()),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            theme_mode: Some("system".into()),
            #[cfg(not(target_os = "windows"))]
            env_type: Some("bash".into()),
            #[cfg(target_os = "windows")]
            env_type: Some("powershell".into()),
            start_page: Some("/".into()),
            traffic_graph: Some(true),
            enable_memory_usage: Some(true),
            enable_group_icon: Some(true),
<<<<<<< HEAD
            pause_render_traffic_stats_on_blur: Some(true),
            #[cfg(target_os = "macos")]
            tray_icon: Some("monochrome".into()),
            menu_icon: Some("monochrome".into()),
            notice_position: Some("top-right".into()),
            collapse_navbar: Some(false),
=======
            #[cfg(target_os = "macos")]
            tray_icon: Some("monochrome".into()),
            menu_icon: Some("monochrome".into()),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            common_tray_icon: Some(false),
            sysproxy_tray_icon: Some(false),
            tun_tray_icon: Some(false),
            enable_auto_launch: Some(false),
            enable_silent_start: Some(false),
<<<<<<< HEAD
            enable_hover_jump_navigator: Some(true),
            hover_jump_navigator_delay: Some(280),
            enable_system_proxy: Some(false),
            proxy_auto_config: Some(false),
            pac_file_content: Some(DEFAULT_PAC.into()),
            proxy_host: Some("127.0.0.1".into()),
=======
            enable_system_proxy: Some(false),
            proxy_auto_config: Some(false),
            pac_file_content: Some(DEFAULT_PAC.into()),
            enable_random_port: Some(false),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            #[cfg(not(target_os = "windows"))]
            verge_redir_port: Some(7895),
            #[cfg(not(target_os = "windows"))]
            verge_redir_enabled: Some(false),
            #[cfg(target_os = "linux")]
            verge_tproxy_port: Some(7896),
            #[cfg(target_os = "linux")]
            verge_tproxy_enabled: Some(false),
            verge_mixed_port: Some(7897),
            verge_socks_port: Some(7898),
            verge_socks_enabled: Some(false),
            verge_port: Some(7899),
            verge_http_enabled: Some(false),
            enable_proxy_guard: Some(false),
<<<<<<< HEAD
            enable_bypass_check: Some(true),
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            use_default_bypass: Some(true),
            proxy_guard_duration: Some(30),
            auto_close_connection: Some(true),
            auto_check_update: Some(true),
            enable_builtin_enhanced: Some(true),
<<<<<<< HEAD
            auto_log_clean: Some(2), // 1: 1天, 2: 7天, 3: 30天, 4: 90天
            enable_auto_backup_schedule: Some(false),
            auto_backup_interval_hours: Some(24),
            auto_backup_on_change: Some(true),
            webdav_url: None,
            webdav_username: None,
            webdav_password: None,
            enable_tray_speed: Some(false),
            // enable_tray_icon: Some(true),
            tray_proxy_groups_display_mode: Some("default".into()),
            tray_inline_outbound_modes: Some(false),
            enable_global_hotkey: Some(true),
            enable_auto_light_weight_mode: Some(false),
            auto_light_weight_minutes: Some(10),
            enable_dns_settings: Some(false),
            home_cards: None,
            enable_external_controller: Some(false),
=======
            auto_log_clean: Some(3),
            webdav_url: None,
            webdav_username: None,
            webdav_password: None,
            enable_tray_speed: Some(true),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            ..Self::default()
        }
    }

    /// Save IVerge App Config
<<<<<<< HEAD
    pub async fn save_file(&self) -> Result<()> {
        help::save_yaml(&dirs::verge_path()?, &self, Some("# Clash Verge Config")).await
=======
    pub fn save_file(&self) -> Result<()> {
        help::save_yaml(&dirs::verge_path()?, &self, Some("# Clash Verge Config"))
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    }

    /// patch verge config
    /// only save to file
<<<<<<< HEAD
    #[allow(clippy::cognitive_complexity)]
    pub fn patch_config(&mut self, patch: &Self) {
        macro_rules! patch {
            ($key: tt) => {
                if patch.$key.is_some() {
                    self.$key = patch.$key.clone();
=======
    pub fn patch_config(&mut self, patch: IVerge) {
        macro_rules! patch {
            ($key: tt) => {
                if patch.$key.is_some() {
                    self.$key = patch.$key;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                }
            };
        }

        patch!(app_log_level);
<<<<<<< HEAD
        patch!(app_log_max_size);
        patch!(app_log_max_count);

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        patch!(language);
        patch!(theme_mode);
        patch!(tray_event);
        patch!(env_type);
        patch!(start_page);
        patch!(startup_script);
        patch!(traffic_graph);
        patch!(enable_memory_usage);
        patch!(enable_group_icon);
<<<<<<< HEAD
        patch!(pause_render_traffic_stats_on_blur);
        #[cfg(target_os = "macos")]
        patch!(tray_icon);
        patch!(menu_icon);
        patch!(menu_order);
        patch!(notice_position);
        patch!(collapse_navbar);
=======
        #[cfg(target_os = "macos")]
        patch!(tray_icon);
        patch!(menu_icon);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        patch!(common_tray_icon);
        patch!(sysproxy_tray_icon);
        patch!(tun_tray_icon);

        patch!(enable_tun_mode);
        patch!(enable_auto_launch);
        patch!(enable_silent_start);
<<<<<<< HEAD
        patch!(enable_hover_jump_navigator);
        patch!(hover_jump_navigator_delay);
=======
        patch!(enable_random_port);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        #[cfg(not(target_os = "windows"))]
        patch!(verge_redir_port);
        #[cfg(not(target_os = "windows"))]
        patch!(verge_redir_enabled);
        #[cfg(target_os = "linux")]
        patch!(verge_tproxy_port);
        #[cfg(target_os = "linux")]
        patch!(verge_tproxy_enabled);
        patch!(verge_mixed_port);
        patch!(verge_socks_port);
        patch!(verge_socks_enabled);
        patch!(verge_port);
        patch!(verge_http_enabled);
        patch!(enable_system_proxy);
        patch!(enable_proxy_guard);
<<<<<<< HEAD
        patch!(enable_bypass_check);
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        patch!(use_default_bypass);
        patch!(system_proxy_bypass);
        patch!(proxy_guard_duration);
        patch!(proxy_auto_config);
        patch!(pac_file_content);
<<<<<<< HEAD
        patch!(proxy_host);
=======

>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        patch!(theme_setting);
        patch!(web_ui_list);
        patch!(clash_core);
        patch!(hotkeys);
<<<<<<< HEAD
        patch!(enable_global_hotkey);
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

        patch!(auto_close_connection);
        patch!(auto_check_update);
        patch!(default_latency_test);
        patch!(default_latency_timeout);
<<<<<<< HEAD
        patch!(enable_auto_delay_detection);
        patch!(auto_delay_detection_interval_minutes);
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        patch!(enable_builtin_enhanced);
        patch!(proxy_layout_column);
        patch!(test_list);
        patch!(auto_log_clean);
<<<<<<< HEAD
        patch!(enable_auto_backup_schedule);
        patch!(auto_backup_interval_hours);
        patch!(auto_backup_on_change);
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

        patch!(webdav_url);
        patch!(webdav_username);
        patch!(webdav_password);
        patch!(enable_tray_speed);
<<<<<<< HEAD
        // patch!(enable_tray_icon);
        patch!(tray_proxy_groups_display_mode);
        patch!(tray_inline_outbound_modes);
        patch!(enable_auto_light_weight_mode);
        patch!(auto_light_weight_minutes);
        patch!(enable_dns_settings);
        patch!(home_cards);
        patch!(enable_external_controller);
    }

    pub const fn get_singleton_port() -> u16 {
        crate::constants::network::ports::SINGLETON_SERVER
=======
    }

    /// 在初始化前尝试拿到单例端口的值
    pub fn get_singleton_port() -> u16 {
        #[cfg(not(feature = "verge-dev"))]
        const SERVER_PORT: u16 = 33331;
        #[cfg(feature = "verge-dev")]
        const SERVER_PORT: u16 = 11233;
        SERVER_PORT
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    }

    /// 获取日志等级
    pub fn get_log_level(&self) -> LevelFilter {
        if let Some(level) = self.app_log_level.as_ref() {
            match level.to_lowercase().as_str() {
                "silent" => LevelFilter::Off,
                "error" => LevelFilter::Error,
                "warn" => LevelFilter::Warn,
                "info" => LevelFilter::Info,
                "debug" => LevelFilter::Debug,
                "trace" => LevelFilter::Trace,
                _ => LevelFilter::Info,
            }
        } else {
            LevelFilter::Info
        }
    }
<<<<<<< HEAD
=======
}

#[derive(Debug, Clone, Serialize)]
pub struct IVergeResponse {
    pub app_log_level: Option<String>,
    pub language: Option<String>,
    pub theme_mode: Option<String>,
    pub tray_event: Option<String>,
    pub env_type: Option<String>,
    pub start_page: Option<String>,
    pub startup_script: Option<String>,
    pub traffic_graph: Option<bool>,
    pub enable_memory_usage: Option<bool>,
    pub enable_group_icon: Option<bool>,
    pub common_tray_icon: Option<bool>,
    #[cfg(target_os = "macos")]
    pub tray_icon: Option<String>,
    pub menu_icon: Option<String>,
    pub sysproxy_tray_icon: Option<bool>,
    pub tun_tray_icon: Option<bool>,
    pub enable_tun_mode: Option<bool>,
    pub enable_auto_launch: Option<bool>,
    pub enable_silent_start: Option<bool>,
    pub enable_system_proxy: Option<bool>,
    pub enable_proxy_guard: Option<bool>,
    pub use_default_bypass: Option<bool>,
    pub system_proxy_bypass: Option<String>,
    pub proxy_guard_duration: Option<u64>,
    pub proxy_auto_config: Option<bool>,
    pub pac_file_content: Option<String>,
    pub theme_setting: Option<IVergeTheme>,
    pub web_ui_list: Option<Vec<String>>,
    pub clash_core: Option<String>,
    pub hotkeys: Option<Vec<String>>,
    pub auto_close_connection: Option<bool>,
    pub auto_check_update: Option<bool>,
    pub default_latency_test: Option<String>,
    pub default_latency_timeout: Option<i32>,
    pub enable_builtin_enhanced: Option<bool>,
    pub proxy_layout_column: Option<i32>,
    pub test_list: Option<Vec<IVergeTestItem>>,
    pub auto_log_clean: Option<i32>,
    pub enable_random_port: Option<bool>,
    #[cfg(not(target_os = "windows"))]
    pub verge_redir_port: Option<u16>,
    #[cfg(not(target_os = "windows"))]
    pub verge_redir_enabled: Option<bool>,
    #[cfg(target_os = "linux")]
    pub verge_tproxy_port: Option<u16>,
    #[cfg(target_os = "linux")]
    pub verge_tproxy_enabled: Option<bool>,
    pub verge_mixed_port: Option<u16>,
    pub verge_socks_port: Option<u16>,
    pub verge_socks_enabled: Option<bool>,
    pub verge_port: Option<u16>,
    pub verge_http_enabled: Option<bool>,
    pub webdav_url: Option<String>,
    pub webdav_username: Option<String>,
    pub webdav_password: Option<String>,
    pub enable_tray_speed: Option<bool>,
}

impl From<IVerge> for IVergeResponse {
    fn from(verge: IVerge) -> Self {
        Self {
            app_log_level: verge.app_log_level,
            language: verge.language,
            theme_mode: verge.theme_mode,
            tray_event: verge.tray_event,
            env_type: verge.env_type,
            start_page: verge.start_page,
            startup_script: verge.startup_script,
            traffic_graph: verge.traffic_graph,
            enable_memory_usage: verge.enable_memory_usage,
            enable_group_icon: verge.enable_group_icon,
            common_tray_icon: verge.common_tray_icon,
            #[cfg(target_os = "macos")]
            tray_icon: verge.tray_icon,
            menu_icon: verge.menu_icon,
            sysproxy_tray_icon: verge.sysproxy_tray_icon,
            tun_tray_icon: verge.tun_tray_icon,
            enable_tun_mode: verge.enable_tun_mode,
            enable_auto_launch: verge.enable_auto_launch,
            enable_silent_start: verge.enable_silent_start,
            enable_system_proxy: verge.enable_system_proxy,
            enable_proxy_guard: verge.enable_proxy_guard,
            use_default_bypass: verge.use_default_bypass,
            system_proxy_bypass: verge.system_proxy_bypass,
            proxy_guard_duration: verge.proxy_guard_duration,
            proxy_auto_config: verge.proxy_auto_config,
            pac_file_content: verge.pac_file_content,
            theme_setting: verge.theme_setting,
            web_ui_list: verge.web_ui_list,
            clash_core: verge.clash_core,
            hotkeys: verge.hotkeys,
            auto_close_connection: verge.auto_close_connection,
            auto_check_update: verge.auto_check_update,
            default_latency_test: verge.default_latency_test,
            default_latency_timeout: verge.default_latency_timeout,
            enable_builtin_enhanced: verge.enable_builtin_enhanced,
            proxy_layout_column: verge.proxy_layout_column,
            test_list: verge.test_list,
            auto_log_clean: verge.auto_log_clean,
            enable_random_port: verge.enable_random_port,
            #[cfg(not(target_os = "windows"))]
            verge_redir_port: verge.verge_redir_port,
            #[cfg(not(target_os = "windows"))]
            verge_redir_enabled: verge.verge_redir_enabled,
            #[cfg(target_os = "linux")]
            verge_tproxy_port: verge.verge_tproxy_port,
            #[cfg(target_os = "linux")]
            verge_tproxy_enabled: verge.verge_tproxy_enabled,
            verge_mixed_port: verge.verge_mixed_port,
            verge_socks_port: verge.verge_socks_port,
            verge_socks_enabled: verge.verge_socks_enabled,
            verge_port: verge.verge_port,
            verge_http_enabled: verge.verge_http_enabled,
            webdav_url: verge.webdav_url,
            webdav_username: verge.webdav_username,
            webdav_password: verge.webdav_password,
            enable_tray_speed: verge.enable_tray_speed,
        }
    }
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
