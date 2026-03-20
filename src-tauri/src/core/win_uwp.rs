#![cfg(target_os = "windows")]

use crate::utils::dirs;
<<<<<<< HEAD
use anyhow::{Result, bail};
=======
use anyhow::{bail, Result};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
use deelevate::{PrivilegeLevel, Token};
use runas::Command as RunasCommand;
use std::process::Command as StdCommand;

<<<<<<< HEAD
pub fn invoke_uwptools() -> Result<()> {
=======
pub async fn invoke_uwptools() -> Result<()> {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    let resource_dir = dirs::app_resources_dir()?;
    let tool_path = resource_dir.join("enableLoopback.exe");

    if !tool_path.exists() {
        bail!("enableLoopback exe not found");
    }

    let token = Token::with_current_process()?;
    let level = token.privilege_level()?;

    match level {
        PrivilegeLevel::NotPrivileged => RunasCommand::new(tool_path).status()?,
        _ => StdCommand::new(tool_path).status()?,
    };

    Ok(())
}
