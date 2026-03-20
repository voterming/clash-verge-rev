<<<<<<< HEAD
pub mod autostart;
pub mod backup;
pub mod handle;
pub mod hotkey;
pub mod logger;
pub mod manager;
mod notification;
=======
pub mod backup;
pub mod clash_api;
#[allow(clippy::module_inception)]
mod core;
pub mod handle;
pub mod hotkey;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
pub mod service;
pub mod sysopt;
pub mod timer;
pub mod tray;
<<<<<<< HEAD
pub mod validate;
pub mod win_uwp;

pub use self::{manager::CoreManager, timer::Timer};
=======
pub mod win_uwp;

pub use self::core::*;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
