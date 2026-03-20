<<<<<<< HEAD
use crate::constants::files::DNS_CONFIG;
use crate::{config::Config, process::AsyncHandler, utils::dirs};
use anyhow::Error;
use arc_swap::{ArcSwap, ArcSwapOption};
use clash_verge_logging::{Type, logging};
use once_cell::sync::OnceCell;
use reqwest_dav::list_cmd::{ListEntity, ListFile};
use smartstring::alias::String;
use std::{
    collections::HashMap,
    env::{consts::OS, temp_dir},
    io::Write as _,
    path::PathBuf,
    sync::Arc,
    time::Duration,
};
use tokio::{fs, time::timeout};
use zip::write::SimpleFileOptions;

// 应用版本常量，来自 tauri.conf.json
const APP_VERSION: &str = env!("CARGO_PKG_VERSION");

=======
use crate::config::Config;
use crate::utils::dirs;
use anyhow::Error;
use once_cell::sync::OnceCell;
use parking_lot::Mutex;
use reqwest_dav::list_cmd::{ListEntity, ListFile};
use std::collections::HashMap;
use std::env::{consts::OS, temp_dir};
use std::fs;
use std::io::Write;
use std::path::PathBuf;
use std::sync::Arc;
use std::time::Duration;
use tokio::time::timeout;
use zip::write::SimpleFileOptions;

>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
const TIMEOUT_UPLOAD: u64 = 300; // 上传超时 5 分钟
const TIMEOUT_DOWNLOAD: u64 = 300; // 下载超时 5 分钟
const TIMEOUT_LIST: u64 = 3; // 列表超时 30 秒
const TIMEOUT_DELETE: u64 = 3; // 删除超时 30 秒

#[derive(Clone)]
struct WebDavConfig {
    url: String,
    username: String,
    password: String,
}

#[derive(Debug, Clone, Copy, Hash, Eq, PartialEq)]
enum Operation {
    Upload,
    Download,
    List,
    Delete,
}

impl Operation {
<<<<<<< HEAD
    const fn timeout(&self) -> u64 {
        match self {
            Self::Upload => TIMEOUT_UPLOAD,
            Self::Download => TIMEOUT_DOWNLOAD,
            Self::List => TIMEOUT_LIST,
            Self::Delete => TIMEOUT_DELETE,
=======
    fn timeout(&self) -> u64 {
        match self {
            Operation::Upload => TIMEOUT_UPLOAD,
            Operation::Download => TIMEOUT_DOWNLOAD,
            Operation::List => TIMEOUT_LIST,
            Operation::Delete => TIMEOUT_DELETE,
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }
    }
}

pub struct WebDavClient {
<<<<<<< HEAD
    config: ArcSwapOption<WebDavConfig>,
    clients: ArcSwap<HashMap<Operation, reqwest_dav::Client>>,
}

impl WebDavClient {
    pub fn global() -> &'static Self {
        static WEBDAV_CLIENT: OnceCell<WebDavClient> = OnceCell::new();
        WEBDAV_CLIENT.get_or_init(|| Self {
            config: ArcSwapOption::new(None),
            clients: ArcSwap::new(Arc::new(HashMap::new())),
=======
    config: Arc<Mutex<Option<WebDavConfig>>>,
    clients: Arc<Mutex<HashMap<Operation, reqwest_dav::Client>>>,
}

impl WebDavClient {
    pub fn global() -> &'static WebDavClient {
        static WEBDAV_CLIENT: OnceCell<WebDavClient> = OnceCell::new();
        WEBDAV_CLIENT.get_or_init(|| WebDavClient {
            config: Arc::new(Mutex::new(None)),
            clients: Arc::new(Mutex::new(HashMap::new())),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        })
    }

    async fn get_client(&self, op: Operation) -> Result<reqwest_dav::Client, Error> {
        // 先尝试从缓存获取
        {
<<<<<<< HEAD
            let clients_map = self.clients.load();
            if let Some(client) = clients_map.get(&op) {
=======
            let clients = self.clients.lock();
            if let Some(client) = clients.get(&op) {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                return Ok(client.clone());
            }
        }

        // 获取或创建配置
        let config = {
<<<<<<< HEAD
            // 首先检查是否已有配置
            let existing_config = self.config.load();

            if let Some(cfg_arc) = existing_config.clone() {
                (*cfg_arc).clone()
            } else {
                // 释放锁后获取异步配置
                let verge = Config::verge().await.data_arc();
                if verge.webdav_url.is_none() || verge.webdav_username.is_none() || verge.webdav_password.is_none() {
                    let msg: String =
                        "Unable to create web dav client, please make sure the webdav config is correct".into();
=======
            let mut lock = self.config.lock();
            if let Some(cfg) = lock.as_ref() {
                cfg.clone()
            } else {
                let verge = Config::verge().latest().clone();
                if verge.webdav_url.is_none()
                    || verge.webdav_username.is_none()
                    || verge.webdav_password.is_none()
                {
                    let msg = "Unable to create web dav client, please make sure the webdav config is correct".to_string();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                    return Err(anyhow::Error::msg(msg));
                }

                let config = WebDavConfig {
                    url: verge
                        .webdav_url
<<<<<<< HEAD
                        .clone()
                        .unwrap_or_default()
                        .trim_end_matches('/')
                        .into(),
                    username: verge.webdav_username.clone().unwrap_or_default(),
                    password: verge.webdav_password.clone().unwrap_or_default(),
                };

                // 存储配置到 ArcSwapOption
                self.config.store(Some(Arc::new(config.clone())));
=======
                        .unwrap_or_default()
                        .trim_end_matches('/')
                        .to_string(),
                    username: verge.webdav_username.unwrap_or_default(),
                    password: verge.webdav_password.unwrap_or_default(),
                };

                *lock = Some(config.clone());
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                config
            }
        };

        // 创建新的客户端
        let client = reqwest_dav::ClientBuilder::new()
            .set_agent(
                reqwest::Client::builder()
<<<<<<< HEAD
                    .use_rustls_tls()
                    .danger_accept_invalid_certs(true)
                    .timeout(Duration::from_secs(op.timeout()))
                    .user_agent(format!("clash-verge/{APP_VERSION} ({OS} WebDAV-Client)"))
                    .redirect(reqwest::redirect::Policy::custom(|attempt| {
                        // 允许所有请求类型的重定向，包括PUT
                        if attempt.previous().len() >= 5 {
                            attempt.error("重定向次数过多")
                        } else {
                            attempt.follow()
                        }
                    }))
                    .build()?,
            )
            .set_host(config.url.into())
            .set_auth(reqwest_dav::Auth::Basic(config.username.into(), config.password.into()))
            .build()?;

        // 尝试检查目录是否存在，如果不存在尝试创建
        if client
            .list(dirs::BACKUP_DIR, reqwest_dav::Depth::Number(0))
            .await
            .is_err()
        {
            match client.mkcol(dirs::BACKUP_DIR).await {
                Ok(_) => logging!(info, Type::Backup, "Successfully created backup directory"),
                Err(e) => {
                    logging!(warn, Type::Backup, "Warning: Failed to create backup directory: {}", e);
                    // 清除缓存，强制下次重新尝试
                    self.reset();
                    return Err(anyhow::Error::msg(format!("Failed to create backup directory: {}", e)));
                }
            }
        }

        {
            self.clients.rcu(|clients_map| {
                let mut new_map = (**clients_map).clone();
                new_map.insert(op, client.clone());
                Arc::new(new_map)
            });
=======
                    .danger_accept_invalid_certs(true)
                    .timeout(Duration::from_secs(op.timeout()))
                    .build()
                    .unwrap(),
            )
            .set_host(config.url)
            .set_auth(reqwest_dav::Auth::Basic(config.username, config.password))
            .build()?;

        // 确保备份目录存在
        let list_result = client
            .list(dirs::BACKUP_DIR, reqwest_dav::Depth::Number(0))
            .await;
        if list_result.is_err() {
            client.mkcol(dirs::BACKUP_DIR).await?;
        }

        // 缓存客户端
        {
            let mut clients = self.clients.lock();
            clients.insert(op, client.clone());
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }

        Ok(client)
    }

    pub fn reset(&self) {
<<<<<<< HEAD
        self.config.store(None);
        self.clients.store(Arc::new(HashMap::new()));
=======
        *self.config.lock() = None;
        self.clients.lock().clear();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    }

    pub async fn upload(&self, file_path: PathBuf, file_name: String) -> Result<(), Error> {
        let client = self.get_client(Operation::Upload).await?;
<<<<<<< HEAD
        let webdav_path: String = format!("{}/{}", dirs::BACKUP_DIR, file_name).into();

        // 读取文件并上传，如果失败尝试一次重试
        let file_content = fs::read(&file_path).await?;

        // 添加超时保护
        let upload_result = timeout(
            Duration::from_secs(TIMEOUT_UPLOAD),
            client.put(&webdav_path, file_content.clone()),
        )
        .await;

        match upload_result {
            Err(_) => {
                logging!(warn, Type::Backup, "Warning: Upload timed out, retrying once");
                tokio::time::sleep(Duration::from_millis(500)).await;
                timeout(
                    Duration::from_secs(TIMEOUT_UPLOAD),
                    client.put(&webdav_path, file_content),
                )
                .await??;
                Ok(())
            }

            Ok(Err(e)) => {
                logging!(warn, Type::Backup, "Warning: Upload failed, retrying once: {e}");
                tokio::time::sleep(Duration::from_millis(500)).await;
                timeout(
                    Duration::from_secs(TIMEOUT_UPLOAD),
                    client.put(&webdav_path, file_content),
                )
                .await??;
                Ok(())
            }
            Ok(Ok(_)) => Ok(()),
        }
=======
        let webdav_path: String = format!("{}/{}", dirs::BACKUP_DIR, file_name);
        let fut = client.put(webdav_path.as_ref(), fs::read(file_path)?);
        timeout(Duration::from_secs(TIMEOUT_UPLOAD), fut).await??;
        Ok(())
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    }

    pub async fn download(&self, filename: String, storage_path: PathBuf) -> Result<(), Error> {
        let client = self.get_client(Operation::Download).await?;
        let path = format!("{}/{}", dirs::BACKUP_DIR, filename);

        let fut = async {
            let response = client.get(path.as_str()).await?;
            let content = response.bytes().await?;
<<<<<<< HEAD
            fs::write(&storage_path, &content).await?;
=======
            fs::write(&storage_path, &content)?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            Ok::<(), Error>(())
        };

        timeout(Duration::from_secs(TIMEOUT_DOWNLOAD), fut).await??;
        Ok(())
    }

    pub async fn list(&self) -> Result<Vec<ListFile>, Error> {
        let client = self.get_client(Operation::List).await?;
        let path = format!("{}/", dirs::BACKUP_DIR);

        let fut = async {
<<<<<<< HEAD
            let files = client.list(path.as_str(), reqwest_dav::Depth::Number(1)).await?;
=======
            let files = client
                .list(path.as_str(), reqwest_dav::Depth::Number(1))
                .await?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            let mut final_files = Vec::new();
            for file in files {
                if let ListEntity::File(file) = file {
                    final_files.push(file);
                }
            }
            Ok::<Vec<ListFile>, Error>(final_files)
        };

        timeout(Duration::from_secs(TIMEOUT_LIST), fut).await?
    }

    pub async fn delete(&self, file_name: String) -> Result<(), Error> {
        let client = self.get_client(Operation::Delete).await?;
        let path = format!("{}/{}", dirs::BACKUP_DIR, file_name);

        let fut = client.delete(&path);
        timeout(Duration::from_secs(TIMEOUT_DELETE), fut).await??;
        Ok(())
    }
}

<<<<<<< HEAD
pub async fn create_backup() -> Result<(String, PathBuf), Error> {
    let now = chrono::Local::now().format("%Y-%m-%d_%H-%M-%S").to_string();
    let zip_file_name: String = format!("{OS}-backup-{now}.zip").into();
    let zip_path = temp_dir().join(zip_file_name.as_str());

    let value = zip_path.clone();
    let file = AsyncHandler::spawn_blocking(move || std::fs::File::create(&value)).await??;
    let mut zip = zip::ZipWriter::new(file);
    zip.add_directory("profiles/", SimpleFileOptions::default())?;
    let options = SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);

    if let Ok(mut entries) = fs::read_dir(dirs::app_profiles_dir()?).await {
        while let Some(entry) = entries.next_entry().await? {
            let path = entry.path();
            if path.is_file() {
                let file_name_os = entry.file_name();
                let file_name = file_name_os
                    .to_str()
                    .ok_or_else(|| anyhow::Error::msg("Invalid file name encoding"))?;
                let backup_path = format!("profiles/{}", file_name);
                zip.start_file(backup_path, options)?;
                let file_content = fs::read(&path).await?;
                zip.write_all(&file_content)?;
=======
pub fn create_backup() -> Result<(String, PathBuf), Error> {
    let now = chrono::Local::now().format("%Y-%m-%d_%H-%M-%S").to_string();
    let zip_file_name = format!("{}-backup-{}.zip", OS, now);
    let zip_path = temp_dir().join(&zip_file_name);

    let file = fs::File::create(&zip_path)?;
    let mut zip = zip::ZipWriter::new(file);
    zip.add_directory("profiles/", SimpleFileOptions::default())?;
    let options = SimpleFileOptions::default().compression_method(zip::CompressionMethod::Stored);
    if let Ok(entries) = fs::read_dir(dirs::app_profiles_dir()?) {
        for entry in entries {
            let entry = entry.unwrap();
            let path = entry.path();
            if path.is_file() {
                let backup_path = format!("profiles/{}", entry.file_name().to_str().unwrap());
                zip.start_file(backup_path, options)?;
                zip.write_all(fs::read(path).unwrap().as_slice())?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }
        }
    }
    zip.start_file(dirs::CLASH_CONFIG, options)?;
<<<<<<< HEAD
    zip.write_all(fs::read(dirs::clash_path()?).await?.as_slice())?;

    let verge_text = fs::read_to_string(dirs::verge_path()?).await?;
    let mut verge_config: serde_json::Value = serde_yaml_ng::from_str(&verge_text)?;
=======
    zip.write_all(fs::read(dirs::clash_path()?)?.as_slice())?;

    let mut verge_config: serde_json::Value =
        serde_yaml::from_str(&fs::read_to_string(dirs::verge_path()?)?)?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    if let Some(obj) = verge_config.as_object_mut() {
        obj.remove("webdav_username");
        obj.remove("webdav_password");
        obj.remove("webdav_url");
    }
    zip.start_file(dirs::VERGE_CONFIG, options)?;
<<<<<<< HEAD
    zip.write_all(serde_yaml_ng::to_string(&verge_config)?.as_bytes())?;

    let dns_config_path = dirs::app_home_dir()?.join(DNS_CONFIG);
    if dns_config_path.exists() {
        zip.start_file(DNS_CONFIG, options)?;
        zip.write_all(fs::read(&dns_config_path).await?.as_slice())?;
    }

    zip.start_file(dirs::PROFILE_YAML, options)?;
    zip.write_all(fs::read(dirs::profiles_path()?).await?.as_slice())?;
=======
    zip.write_all(serde_yaml::to_string(&verge_config)?.as_bytes())?;

    zip.start_file(dirs::PROFILE_YAML, options)?;
    zip.write_all(fs::read(dirs::profiles_path()?)?.as_slice())?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    zip.finish()?;
    Ok((zip_file_name, zip_path))
}
