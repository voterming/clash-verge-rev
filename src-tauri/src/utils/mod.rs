pub mod dirs;
<<<<<<< HEAD
=======
pub mod error;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
pub mod help;
pub mod init;
#[cfg(target_os = "linux")]
pub mod linux;
pub mod network;
pub mod notification;
pub mod resolve;
#[cfg(target_os = "windows")]
pub mod schtasks;
pub mod server;
<<<<<<< HEAD
pub mod singleton;
pub mod tmpl;
pub mod window_manager;
=======
pub mod tmpl;
pub mod i18n;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
