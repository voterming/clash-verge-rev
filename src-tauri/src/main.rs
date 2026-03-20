#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
<<<<<<< HEAD
    #[cfg(feature = "tokio-trace")]
    console_subscriber::init();

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    app_lib::run();
}
