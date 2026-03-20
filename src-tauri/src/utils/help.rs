<<<<<<< HEAD
use crate::{config::with_encryption, enhance::seq::SeqMap};
use anyhow::{Context as _, Result, anyhow, bail};
use clash_verge_logging::{Type, logging};
use nanoid::nanoid;
use serde::{Serialize, de::DeserializeOwned};
use serde_yaml_ng::Mapping;
#[cfg(target_os = "windows")]
use std::path::Path;
use std::{path::PathBuf, str::FromStr};

/// read data from yaml as struct T
pub async fn read_yaml<T: DeserializeOwned>(path: &PathBuf) -> Result<T> {
    if !tokio::fs::try_exists(path).await.unwrap_or(false) {
        bail!("file not found \"{}\"", path.display());
    }

    let yaml_str = tokio::fs::read_to_string(path).await?;

    Ok(with_encryption(|| async { serde_yaml_ng::from_str::<T>(&yaml_str) }).await?)
}

/// read mapping from yaml
pub async fn read_mapping(path: &PathBuf) -> Result<Mapping> {
    if !tokio::fs::try_exists(path).await.unwrap_or(false) {
        bail!("file not found \"{}\"", path.display());
    }

    let yaml_str = tokio::fs::read_to_string(path)
        .await
        .with_context(|| format!("failed to read the file \"{}\"", path.display()))?;

    // YAML语法检查
    match serde_yaml_ng::from_str::<serde_yaml_ng::Value>(&yaml_str) {
        Ok(mut val) => {
            val.apply_merge()
                .with_context(|| format!("failed to apply merge \"{}\"", path.display()))?;

            Ok(val
                .as_mapping()
                .ok_or_else(|| anyhow!("failed to transform to yaml mapping \"{}\"", path.display()))?
                .to_owned())
        }
        Err(err) => {
            let error_msg = format!("YAML syntax error in {}: {}", path.display(), err);
            logging!(error, Type::Config, "{}", error_msg);

            crate::core::handle::Handle::notice_message("config_validate::yaml_syntax_error", &error_msg);

            bail!("YAML syntax error: {}", err)
        }
    }
}

/// read mapping from yaml fix #165
pub async fn read_seq_map(path: &PathBuf) -> Result<SeqMap> {
    read_yaml(path).await
=======
use crate::enhance::seq::SeqMap;
use anyhow::{anyhow, bail, Context, Result};
use nanoid::nanoid;
use serde::{de::DeserializeOwned, Serialize};
use serde_yaml::{Mapping, Value};
use std::{fs, path::PathBuf, str::FromStr};

/// read data from yaml as struct T
pub fn read_yaml<T: DeserializeOwned>(path: &PathBuf) -> Result<T> {
    if !path.exists() {
        bail!("file not found \"{}\"", path.display());
    }

    let yaml_str = fs::read_to_string(path)
        .with_context(|| format!("failed to read the file \"{}\"", path.display()))?;

    serde_yaml::from_str::<T>(&yaml_str).with_context(|| {
        format!(
            "failed to read the file with yaml format \"{}\"",
            path.display()
        )
    })
}

/// read mapping from yaml fix #165
pub fn read_mapping(path: &PathBuf) -> Result<Mapping> {
    let mut val: Value = read_yaml(path)?;
    val.apply_merge()
        .with_context(|| format!("failed to apply merge \"{}\"", path.display()))?;

    Ok(val
        .as_mapping()
        .ok_or(anyhow!(
            "failed to transform to yaml mapping \"{}\"",
            path.display()
        ))?
        .to_owned())
}

/// read mapping from yaml fix #165
pub fn read_seq_map(path: &PathBuf) -> Result<SeqMap> {
    let val: SeqMap = read_yaml(path)?;

    Ok(val)
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}

/// save the data to the file
/// can set `prefix` string to add some comments
<<<<<<< HEAD
pub async fn save_yaml<T: Serialize + Sync>(path: &PathBuf, data: &T, prefix: Option<&str>) -> Result<()> {
    let data_str = with_encryption(|| async { serde_yaml_ng::to_string(data) }).await?;
=======
pub fn save_yaml<T: Serialize>(path: &PathBuf, data: &T, prefix: Option<&str>) -> Result<()> {
    let data_str = serde_yaml::to_string(data)?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    let yaml_str = match prefix {
        Some(prefix) => format!("{prefix}\n\n{data_str}"),
        None => data_str,
    };

    let path_str = path.as_os_str().to_string_lossy().to_string();
<<<<<<< HEAD
    tokio::fs::write(path, yaml_str.as_bytes())
        .await
        .with_context(|| format!("failed to save file \"{path_str}\""))?;
    tokio::time::sleep(std::time::Duration::from_millis(50)).await;
    Ok(())
}

const ALPHABET: [char; 62] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
=======
    fs::write(path, yaml_str.as_bytes())
        .with_context(|| format!("failed to save file \"{path_str}\""))
}

const ALPHABET: [char; 62] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B',
    'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
    'V', 'W', 'X', 'Y', 'Z',
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
];

/// generate the uid
pub fn get_uid(prefix: &str) -> String {
    let id = nanoid!(11, &ALPHABET);
    format!("{prefix}{id}")
}

/// parse the string
/// xxx=123123; => 123123
pub fn parse_str<T: FromStr>(target: &str, key: &str) -> Option<T> {
    target.split(';').map(str::trim).find_map(|s| {
        let mut parts = s.splitn(2, '=');
        match (parts.next(), parts.next()) {
            (Some(k), Some(v)) if k == key => v.parse::<T>().ok(),
            _ => None,
        }
    })
}

<<<<<<< HEAD
/// Mask sensitive parts of a subscription URL for safe logging.
/// Examples:
/// - `https://example.com/api/v1/clash?token=abc123` → `https://example.com/api/v1/clash?token=***`
/// - `https://example.com/abc123def456ghi789/clash` → `https://example.com/***/clash`
pub fn mask_url(url: &str) -> String {
    // Split off query string
    let (path_part, query_part) = match url.find('?') {
        Some(pos) => (&url[..pos], Some(&url[pos + 1..])),
        None => (url, None),
    };

    // Extract scheme+host prefix (everything up to the first '/' after "://")
    let host_end = path_part
        .find("://")
        .and_then(|scheme_end| {
            path_part[scheme_end + 3..]
                .find('/')
                .map(|slash| scheme_end + 3 + slash)
        })
        .unwrap_or(path_part.len());

    let scheme_and_host = &path_part[..host_end];
    let path = &path_part[host_end..]; // starts with '/' or empty

    let mut result = scheme_and_host.to_owned();

    // Mask path segments that look like tokens (longer than 16 chars)
    if !path.is_empty() {
        let masked: Vec<&str> = path
            .split('/')
            .map(|seg| if seg.len() > 16 { "***" } else { seg })
            .collect();
        result.push_str(&masked.join("/"));
    }

    // Keep query param keys, mask values
    if let Some(query) = query_part {
        result.push('?');
        let masked_query: Vec<String> = query
            .split('&')
            .map(|param| match param.find('=') {
                Some(eq) => format!("{}=***", &param[..eq]),
                None => param.to_owned(),
            })
            .collect();
        result.push_str(&masked_query.join("&"));
    }

    result
}

/// Mask all URLs embedded in an error/log string for safe logging.
///
/// Scans the string for `http://` or `https://` and replaces each URL
/// (terminated by whitespace or `)`, `]`, `"`, `'`) with its masked form.
/// Text between URLs is copied verbatim.
pub fn mask_err(err: &str) -> String {
    let mut result = String::with_capacity(err.len());
    let mut remaining = err;

    loop {
        let http = remaining.find("http://");
        let https = remaining.find("https://");
        let start = match (http, https) {
            (None, None) => {
                result.push_str(remaining);
                break;
            }
            (Some(a), None) | (None, Some(a)) => a,
            (Some(a), Some(b)) => a.min(b),
        };

        result.push_str(&remaining[..start]);
        remaining = &remaining[start..];

        let url_end = remaining
            .find(|c: char| c.is_whitespace() || matches!(c, ')' | ']' | '"' | '\''))
            .unwrap_or(remaining.len());

        result.push_str(&mask_url(&remaining[..url_end]));
        remaining = &remaining[url_end..];
    }

    result
}

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
/// get the last part of the url, if not found, return empty string
pub fn get_last_part_and_decode(url: &str) -> Option<String> {
    let path = url.split('?').next().unwrap_or(""); // Splits URL and takes the path part
    let segments: Vec<&str> = path.split('/').collect();
    let last_segment = segments.last()?;

    Some(
        percent_encoding::percent_decode_str(last_segment)
            .decode_utf8_lossy()
            .to_string(),
    )
}

/// open file
<<<<<<< HEAD
pub fn open_file(path: PathBuf) -> Result<()> {
=======
pub fn open_file(_: tauri::AppHandle, path: PathBuf) -> Result<()> {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    open::that_detached(path.as_os_str())?;
    Ok(())
}

<<<<<<< HEAD
=======
#[cfg(target_os = "macos")]
pub fn is_monochrome_image_from_bytes(data: &[u8]) -> anyhow::Result<bool> {
    let img = image::load_from_memory(data)?;
    let rgb_img = img.to_rgb8();

    for pixel in rgb_img.pixels() {
        if pixel[0] != pixel[1] || pixel[1] != pixel[2] {
            return Ok(false);
        }
    }
    Ok(true)
}

>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
#[cfg(target_os = "linux")]
pub fn linux_elevator() -> String {
    use std::process::Command;
    match Command::new("which").arg("pkexec").output() {
        Ok(output) => {
            if !output.stdout.is_empty() {
                // Convert the output to a string slice
                if let Ok(path) = std::str::from_utf8(&output.stdout) {
                    path.trim().to_string()
                } else {
                    "sudo".to_string()
                }
            } else {
                "sudo".to_string()
            }
        }
        Err(_) => "sudo".to_string(),
    }
}

<<<<<<< HEAD
#[cfg(target_os = "windows")]
/// copy the file to the dist path and return the dist path
pub fn snapshot_path(original_path: &Path) -> Result<PathBuf> {
    let temp_dir = original_path
        .parent()
        .ok_or_else(|| anyhow!("Invalid log path"))?
        .join("temp");

    std::fs::create_dir_all(&temp_dir)?;

    let temp_path = temp_dir.join(format!(
        "{}_{}.log",
        original_path.file_stem().unwrap_or_default().to_string_lossy(),
        chrono::Local::now().format("%Y-%m-%d_%H-%M-%S")
    ));

    std::fs::copy(original_path, &temp_path)?;

    Ok(temp_path)
=======
#[macro_export]
macro_rules! error {
    ($result: expr) => {
        log::error!(target: "app", "{}", $result);
    };
}

#[macro_export]
macro_rules! log_err {
    ($result: expr) => {
        if let Err(err) = $result {
            log::error!(target: "app", "{err}");
        }
    };

    ($result: expr, $err_str: expr) => {
        if let Err(_) = $result {
            log::error!(target: "app", "{}", $err_str);
        }
    };
}

#[macro_export]
macro_rules! trace_err {
    ($result: expr, $err_str: expr) => {
        if let Err(err) = $result {
            log::trace!(target: "app", "{}, err {}", $err_str, err);
        }
    }
}

/// wrap the anyhow error
/// transform the error to String
#[macro_export]
macro_rules! wrap_err {
    ($stat: expr) => {
        match $stat {
            Ok(a) => Ok(a),
            Err(err) => {
                log::error!(target: "app", "{}", err.to_string());
                Err(format!("{}", err.to_string()))
            }
        }
    };
}

/// return the string literal error
#[macro_export]
macro_rules! ret_err {
    ($str: expr) => {
        return Err($str.into())
    };
}

#[macro_export]
macro_rules! t {
    ($en:expr, $zh:expr, $use_zh:expr) => {
        if $use_zh {
            $zh
        } else {
            $en
        }
    };
}

/// 将字节数转换为可读的流量字符串
/// 支持 B/s、KB/s、MB/s、GB/s 的自动转换
///
/// # Examples
/// ```
/// assert_eq!(format_bytes_speed(1000), "1000B/s");
/// assert_eq!(format_bytes_speed(1024), "1.0KB/s");
/// assert_eq!(format_bytes_speed(1024 * 1024), "1.0MB/s");
/// ```
#[cfg(target_os = "macos")]
pub fn format_bytes_speed(speed: u64) -> String {
    if speed < 1024 {
        format!("{}B/s", speed)
    } else if speed < 1024 * 1024 {
        format!("{:.1}KB/s", speed as f64 / 1024.0)
    } else if speed < 1024 * 1024 * 1024 {
        format!("{:.1}MB/s", speed as f64 / 1024.0 / 1024.0)
    } else {
        format!("{:.1}GB/s", speed as f64 / 1024.0 / 1024.0 / 1024.0)
    }
}

#[test]
fn test_format_bytes_speed() {
    assert_eq!(format_bytes_speed(0), "0B/s");
    assert_eq!(format_bytes_speed(1023), "1023B/s");
    assert_eq!(format_bytes_speed(1024), "1.0KB/s");
    assert_eq!(format_bytes_speed(1024 * 1024), "1.0MB/s");
    assert_eq!(format_bytes_speed(1024 * 1024 * 1024), "1.0GB/s");
    assert_eq!(format_bytes_speed(1024 * 500), "500.0KB/s");
    assert_eq!(format_bytes_speed(1024 * 1024 * 2), "2.0MB/s");
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
