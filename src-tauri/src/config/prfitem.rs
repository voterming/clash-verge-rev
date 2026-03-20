<<<<<<< HEAD
use crate::{
    config::profiles,
    utils::{
        dirs, help,
        network::{NetworkManager, ProxyType},
        tmpl,
    },
};
use anyhow::{Context as _, Result, bail};
use serde::{Deserialize, Serialize};
use serde_yaml_ng::Mapping;
use smartstring::alias::String;
use std::time::Duration;
use tokio::fs;
// TODO, use other re-export
use reqwest_dav::re_exports::url::form_urlencoded;
use tauri::Url;
=======
use crate::utils::{dirs, help, resolve::VERSION, tmpl};
use anyhow::{bail, Context, Result};
use reqwest::StatusCode;
use serde::{Deserialize, Serialize};
use serde_yaml::Mapping;
use std::fs;
use sysproxy::Sysproxy;

use super::Config;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

#[derive(Debug, Clone, Deserialize, Serialize, Default)]
pub struct PrfItem {
    pub uid: Option<String>,

    /// profile item type
    /// enum value: remote | local | script | merge
    #[serde(rename = "type")]
    pub itype: Option<String>,

    /// profile name
    pub name: Option<String>,

    /// profile file
    pub file: Option<String>,

    /// profile description
    #[serde(skip_serializing_if = "Option::is_none")]
    pub desc: Option<String>,

    /// source url
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,

    /// selected information
    #[serde(skip_serializing_if = "Option::is_none")]
    pub selected: Option<Vec<PrfSelected>>,

    /// subscription user info
    #[serde(skip_serializing_if = "Option::is_none")]
    pub extra: Option<PrfExtra>,

    /// updated time
    pub updated: Option<usize>,

    /// some options of the item
    #[serde(skip_serializing_if = "Option::is_none")]
    pub option: Option<PrfOption>,

    /// profile web page url
    #[serde(skip_serializing_if = "Option::is_none")]
    pub home: Option<String>,

    /// the file data
    #[serde(skip)]
    pub file_data: Option<String>,
}

#[derive(Default, Debug, Clone, Deserialize, Serialize)]
pub struct PrfSelected {
    pub name: Option<String>,
    pub now: Option<String>,
}

#[derive(Default, Debug, Clone, Copy, Deserialize, Serialize)]
pub struct PrfExtra {
    pub upload: u64,
    pub download: u64,
    pub total: u64,
    pub expire: u64,
}

#[derive(Default, Debug, Clone, Deserialize, Serialize, PartialEq, Eq)]
pub struct PrfOption {
    /// for `remote` profile's http request
    /// see issue #13
    #[serde(skip_serializing_if = "Option::is_none")]
    pub user_agent: Option<String>,

    /// for `remote` profile
    /// use system proxy
    #[serde(skip_serializing_if = "Option::is_none")]
    pub with_proxy: Option<bool>,

    /// for `remote` profile
    /// use self proxy
    #[serde(skip_serializing_if = "Option::is_none")]
    pub self_proxy: Option<bool>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub update_interval: Option<u64>,

    /// for `remote` profile
<<<<<<< HEAD
    /// HTTP request timeout in seconds
    /// default is 60 seconds
    #[serde(skip_serializing_if = "Option::is_none")]
    pub timeout_seconds: Option<u64>,

    /// for `remote` profile
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    /// disable certificate validation
    /// default is `false`
    #[serde(skip_serializing_if = "Option::is_none")]
    pub danger_accept_invalid_certs: Option<bool>,

<<<<<<< HEAD
    #[serde(default = "default_allow_auto_update")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub allow_auto_update: Option<bool>,

=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    pub merge: Option<String>,

    pub script: Option<String>,

    pub rules: Option<String>,

    pub proxies: Option<String>,

    pub groups: Option<String>,
}

impl PrfOption {
<<<<<<< HEAD
    pub fn merge(one: Option<&Self>, other: Option<&Self>) -> Option<Self> {
        match (one, other) {
            (Some(a_ref), Some(b_ref)) => {
                let mut result = a_ref.clone();
                result.user_agent = b_ref.user_agent.clone().or(result.user_agent);
                result.with_proxy = b_ref.with_proxy.or(result.with_proxy);
                result.self_proxy = b_ref.self_proxy.or(result.self_proxy);
                result.danger_accept_invalid_certs =
                    b_ref.danger_accept_invalid_certs.or(result.danger_accept_invalid_certs);
                result.allow_auto_update = b_ref.allow_auto_update.or(result.allow_auto_update);
                result.update_interval = b_ref.update_interval.or(result.update_interval);
                result.merge = b_ref.merge.clone().or(result.merge);
                result.script = b_ref.script.clone().or(result.script);
                result.rules = b_ref.rules.clone().or(result.rules);
                result.proxies = b_ref.proxies.clone().or(result.proxies);
                result.groups = b_ref.groups.clone().or(result.groups);
                result.timeout_seconds = b_ref.timeout_seconds.or(result.timeout_seconds);
                Some(result)
            }
            (Some(a_ref), None) => Some(a_ref.clone()),
            (None, Some(b_ref)) => Some(b_ref.clone()),
            (None, None) => None,
=======
    pub fn merge(one: Option<Self>, other: Option<Self>) -> Option<Self> {
        match (one, other) {
            (Some(mut a), Some(b)) => {
                a.user_agent = b.user_agent.or(a.user_agent);
                a.with_proxy = b.with_proxy.or(a.with_proxy);
                a.self_proxy = b.self_proxy.or(a.self_proxy);
                a.danger_accept_invalid_certs = b
                    .danger_accept_invalid_certs
                    .or(a.danger_accept_invalid_certs);
                a.update_interval = b.update_interval.or(a.update_interval);
                a.merge = b.merge.or(a.merge);
                a.script = b.script.or(a.script);
                a.rules = b.rules.or(a.rules);
                a.proxies = b.proxies.or(a.proxies);
                a.groups = b.groups.or(a.groups);
                Some(a)
            }
            t => t.0.or(t.1),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }
    }
}

impl PrfItem {
    /// From partial item
    /// must contain `itype`
<<<<<<< HEAD
    pub async fn from(item: &Self, file_data: Option<String>) -> Result<Self> {
=======
    pub async fn from(item: PrfItem, file_data: Option<String>) -> Result<PrfItem> {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        if item.itype.is_none() {
            bail!("type should not be null");
        }

<<<<<<< HEAD
        let itype = item
            .itype
            .as_ref()
            .ok_or_else(|| anyhow::anyhow!("type should not be null"))?;
        match itype.as_str() {
            "remote" => {
                let url = item
                    .url
                    .as_ref()
                    .ok_or_else(|| anyhow::anyhow!("url should not be null"))?;
                let name = item.name.as_ref();
                let desc = item.desc.as_ref();
                let option = item.option.as_ref();
                Self::from_url(url, name, desc, option).await
            }
            "local" => {
                let name = item.name.clone().unwrap_or_else(|| "Local File".into());
                let desc = item.desc.clone().unwrap_or_else(|| "".into());
                let option = item.option.as_ref();
                Self::from_local(name, desc, file_data, option).await
=======
        match item.itype.unwrap().as_str() {
            "remote" => {
                if item.url.is_none() {
                    bail!("url should not be null");
                }
                let url = item.url.as_ref().unwrap().as_str();
                let name = item.name;
                let desc = item.desc;
                PrfItem::from_url(url, name, desc, item.option).await
            }
            "local" => {
                let name = item.name.unwrap_or("Local File".into());
                let desc = item.desc.unwrap_or("".into());
                PrfItem::from_local(name, desc, file_data, item.option)
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }
            typ => bail!("invalid profile item type \"{typ}\""),
        }
    }

    /// ## Local type
    /// create a new item from name/desc
<<<<<<< HEAD
    pub async fn from_local(
        name: String,
        desc: String,
        file_data: Option<String>,
        option: Option<&PrfOption>,
    ) -> Result<Self> {
        let uid = help::get_uid("L").into();
        let file = format!("{uid}.yaml").into();
=======
    pub fn from_local(
        name: String,
        desc: String,
        file_data: Option<String>,
        option: Option<PrfOption>,
    ) -> Result<PrfItem> {
        let uid = help::get_uid("L");
        let file = format!("{uid}.yaml");
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        let opt_ref = option.as_ref();
        let update_interval = opt_ref.and_then(|o| o.update_interval);
        let mut merge = opt_ref.and_then(|o| o.merge.clone());
        let mut script = opt_ref.and_then(|o| o.script.clone());
        let mut rules = opt_ref.and_then(|o| o.rules.clone());
        let mut proxies = opt_ref.and_then(|o| o.proxies.clone());
        let mut groups = opt_ref.and_then(|o| o.groups.clone());

        if merge.is_none() {
<<<<<<< HEAD
            let merge_item = &mut Self::from_merge(None)?;
            profiles::profiles_append_item_safe(merge_item).await?;
            merge = merge_item.uid.clone();
        }
        if script.is_none() {
            let script_item = &mut Self::from_script(None)?;
            profiles::profiles_append_item_safe(script_item).await?;
            script = script_item.uid.clone();
        }
        if rules.is_none() {
            let rules_item = &mut Self::from_rules()?;
            profiles::profiles_append_item_safe(rules_item).await?;
            rules = rules_item.uid.clone();
        }
        if proxies.is_none() {
            let proxies_item = &mut Self::from_proxies()?;
            profiles::profiles_append_item_safe(proxies_item).await?;
            proxies = proxies_item.uid.clone();
        }
        if groups.is_none() {
            let groups_item = &mut Self::from_groups()?;
            profiles::profiles_append_item_safe(groups_item).await?;
            groups = groups_item.uid.clone();
        }
        Ok(Self {
=======
            let merge_item = PrfItem::from_merge(None)?;
            Config::profiles().data().append_item(merge_item.clone())?;
            merge = merge_item.uid;
        }
        if script.is_none() {
            let script_item = PrfItem::from_script(None)?;
            Config::profiles().data().append_item(script_item.clone())?;
            script = script_item.uid;
        }
        if rules.is_none() {
            let rules_item = PrfItem::from_rules()?;
            Config::profiles().data().append_item(rules_item.clone())?;
            rules = rules_item.uid;
        }
        if proxies.is_none() {
            let proxies_item = PrfItem::from_proxies()?;
            Config::profiles()
                .data()
                .append_item(proxies_item.clone())?;
            proxies = proxies_item.uid;
        }
        if groups.is_none() {
            let groups_item = PrfItem::from_groups()?;
            Config::profiles().data().append_item(groups_item.clone())?;
            groups = groups_item.uid;
        }
        Ok(PrfItem {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            uid: Some(uid),
            itype: Some("local".into()),
            name: Some(name),
            desc: Some(desc),
            file: Some(file),
            url: None,
            selected: None,
            extra: None,
            option: Some(PrfOption {
                update_interval,
                merge,
                script,
                rules,
                proxies,
                groups,
                ..PrfOption::default()
            }),
            home: None,
            updated: Some(chrono::Local::now().timestamp() as usize),
<<<<<<< HEAD
            file_data: Some(file_data.unwrap_or_else(|| tmpl::ITEM_LOCAL.into())),
=======
            file_data: Some(file_data.unwrap_or(tmpl::ITEM_LOCAL.into())),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        })
    }

    /// ## Remote type
    /// create a new item from url
    pub async fn from_url(
        url: &str,
<<<<<<< HEAD
        name: Option<&String>,
        desc: Option<&String>,
        option: Option<&PrfOption>,
    ) -> Result<Self> {
        let with_proxy = option.is_some_and(|o| o.with_proxy.unwrap_or(false));
        let self_proxy = option.is_some_and(|o| o.self_proxy.unwrap_or(false));
        let accept_invalid_certs = option.is_some_and(|o| o.danger_accept_invalid_certs.unwrap_or(false));
        let allow_auto_update = option.map(|o| o.allow_auto_update.unwrap_or(true));
        let user_agent = option.and_then(|o| o.user_agent.clone());
        let update_interval = option.and_then(|o| o.update_interval);
        let timeout = option.and_then(|o| o.timeout_seconds).unwrap_or(20);
        let mut merge = option.and_then(|o| o.merge.clone());
        let mut script = option.and_then(|o| o.script.clone());
        let mut rules = option.and_then(|o| o.rules.clone());
        let mut proxies = option.and_then(|o| o.proxies.clone());
        let mut groups = option.and_then(|o| o.groups.clone());

        // 选择代理类型
        let proxy_type = if self_proxy {
            ProxyType::Localhost
        } else if with_proxy {
            ProxyType::System
        } else {
            ProxyType::None
        };

        let url = fix_dirty_url(url)?;

        // 使用网络管理器发送请求
        let resp = match NetworkManager::new()
            .get_with_interrupt(
                url.as_str(),
                proxy_type,
                Some(timeout),
                user_agent.clone(),
                accept_invalid_certs,
            )
            .await
        {
            Ok(r) => r,
            Err(e) => {
                tokio::time::sleep(Duration::from_millis(100)).await;
                bail!("failed to fetch remote profile: {}", e);
            }
        };

        let status_code = resp.status();
        if !status_code.is_success() {
=======
        name: Option<String>,
        desc: Option<String>,
        option: Option<PrfOption>,
    ) -> Result<PrfItem> {
        let opt_ref = option.as_ref();
        let with_proxy = opt_ref.map_or(false, |o| o.with_proxy.unwrap_or(false));
        let self_proxy = opt_ref.map_or(false, |o| o.self_proxy.unwrap_or(false));
        let accept_invalid_certs =
            opt_ref.map_or(false, |o| o.danger_accept_invalid_certs.unwrap_or(false));
        let user_agent = opt_ref.and_then(|o| o.user_agent.clone());
        let update_interval = opt_ref.and_then(|o| o.update_interval);
        let mut merge = opt_ref.and_then(|o| o.merge.clone());
        let mut script = opt_ref.and_then(|o| o.script.clone());
        let mut rules = opt_ref.and_then(|o| o.rules.clone());
        let mut proxies = opt_ref.and_then(|o| o.proxies.clone());
        let mut groups = opt_ref.and_then(|o| o.groups.clone());
        let mut builder = reqwest::ClientBuilder::new().use_rustls_tls().no_proxy();

        // 使用软件自己的代理
        if self_proxy {
            let port = Config::verge()
                .latest()
                .verge_mixed_port
                .unwrap_or(Config::clash().data().get_mixed_port());

            let proxy_scheme = format!("http://127.0.0.1:{port}");

            if let Ok(proxy) = reqwest::Proxy::http(&proxy_scheme) {
                builder = builder.proxy(proxy);
            }
            if let Ok(proxy) = reqwest::Proxy::https(&proxy_scheme) {
                builder = builder.proxy(proxy);
            }
            if let Ok(proxy) = reqwest::Proxy::all(&proxy_scheme) {
                builder = builder.proxy(proxy);
            }
        }
        // 使用系统代理
        else if with_proxy {
            if let Ok(p @ Sysproxy { enable: true, .. }) = Sysproxy::get_system_proxy() {
                let proxy_scheme = format!("http://{}:{}", p.host, p.port);

                if let Ok(proxy) = reqwest::Proxy::http(&proxy_scheme) {
                    builder = builder.proxy(proxy);
                }
                if let Ok(proxy) = reqwest::Proxy::https(&proxy_scheme) {
                    builder = builder.proxy(proxy);
                }
                if let Ok(proxy) = reqwest::Proxy::all(&proxy_scheme) {
                    builder = builder.proxy(proxy);
                }
            }
        }

        let version = match VERSION.get() {
            Some(v) => format!("clash-verge/v{}", v),
            None => "clash-verge/unknown".to_string(),
        };

        builder = builder.danger_accept_invalid_certs(accept_invalid_certs);
        builder = builder.user_agent(user_agent.unwrap_or(version));

        let resp = builder.build()?.get(url).send().await?;

        let status_code = resp.status();
        if !StatusCode::is_success(&status_code) {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            bail!("failed to fetch remote profile with status {status_code}")
        }

        let header = resp.headers();

        // parse the Subscription UserInfo
<<<<<<< HEAD
        let extra;
        'extra: {
            for (k, v) in header.iter() {
                let key_lower = k.as_str().to_ascii_lowercase();
                // Accept standard custom-metadata prefixes (x-amz-meta-, x-obs-meta-, x-cos-meta-, etc.).
                if key_lower
                    .strip_suffix("subscription-userinfo")
                    .is_some_and(|prefix| prefix.is_empty() || prefix.ends_with('-'))
                {
                    let sub_info = v.to_str().unwrap_or("");
                    extra = Some(PrfExtra {
                        upload: help::parse_str(sub_info, "upload").unwrap_or(0),
                        download: help::parse_str(sub_info, "download").unwrap_or(0),
                        total: help::parse_str(sub_info, "total").unwrap_or(0),
                        expire: help::parse_str(sub_info, "expire").unwrap_or(0),
                    });
                    break 'extra;
                }
            }
            extra = None;
        }
=======
        let extra = match header.get("Subscription-Userinfo") {
            Some(value) => {
                let sub_info = value.to_str().unwrap_or("");
                Some(PrfExtra {
                    upload: help::parse_str(sub_info, "upload").unwrap_or(0),
                    download: help::parse_str(sub_info, "download").unwrap_or(0),
                    total: help::parse_str(sub_info, "total").unwrap_or(0),
                    expire: help::parse_str(sub_info, "expire").unwrap_or(0),
                })
            }
            None => None,
        };
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

        // parse the Content-Disposition
        let filename = match header.get("Content-Disposition") {
            Some(value) => {
                let filename = format!("{value:?}");
                let filename = filename.trim_matches('"');
                match help::parse_str::<String>(filename, "filename*") {
                    Some(filename) => {
                        let iter = percent_encoding::percent_decode(filename.as_bytes());
                        let filename = iter.decode_utf8().unwrap_or_default();
<<<<<<< HEAD
                        filename.split("''").last().map(|s| s.into())
=======
                        filename.split("''").last().map(|s| s.to_string())
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                    }
                    None => match help::parse_str::<String>(filename, "filename") {
                        Some(filename) => {
                            let filename = filename.trim_matches('"');
<<<<<<< HEAD
                            Some(filename.into())
=======
                            Some(filename.to_string())
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                        }
                        None => None,
                    },
                }
            }
<<<<<<< HEAD
            None => {
                Some(crate::utils::help::get_last_part_and_decode(url.as_str()).unwrap_or_else(|| "Remote File".into()))
            }
=======
            None => Some(
                crate::utils::help::get_last_part_and_decode(url).unwrap_or("Remote File".into()),
            ),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        };
        let update_interval = match update_interval {
            Some(val) => Some(val),
            None => match header.get("profile-update-interval") {
                Some(value) => match value.to_str().unwrap_or("").parse::<u64>() {
                    Ok(val) => Some(val * 60), // hour -> min
                    Err(_) => None,
                },
                None => None,
            },
        };

        let home = match header.get("profile-web-page-url") {
            Some(value) => {
                let str_value = value.to_str().unwrap_or("");
<<<<<<< HEAD
                Some(str_value.into())
=======
                Some(str_value.to_string())
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }
            None => None,
        };

<<<<<<< HEAD
        let uid = help::get_uid("R").into();
        let file = format!("{uid}.yaml").into();
        let name = name
            .map(|s| s.to_owned())
            .unwrap_or_else(|| filename.map(|s| s.into()).unwrap_or_else(|| "Remote File".into()));
        let data = resp.text_with_charset()?;
=======
        let uid = help::get_uid("R");
        let file = format!("{uid}.yaml");
        let name = name.unwrap_or(filename.unwrap_or("Remote File".into()));
        let data = resp.text_with_charset("utf-8").await?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

        // process the charset "UTF-8 with BOM"
        let data = data.trim_start_matches('\u{feff}');

        // check the data whether the valid yaml format
<<<<<<< HEAD
        let yaml = serde_yaml_ng::from_str::<Mapping>(data).context("the remote profile data is invalid yaml")?;
=======
        let yaml = serde_yaml::from_str::<Mapping>(data)
            .context("the remote profile data is invalid yaml")?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

        if !yaml.contains_key("proxies") && !yaml.contains_key("proxy-providers") {
            bail!("profile does not contain `proxies` or `proxy-providers`");
        }

        if merge.is_none() {
<<<<<<< HEAD
            let merge_item = &mut Self::from_merge(None)?;
            profiles::profiles_append_item_safe(merge_item).await?;
            merge = merge_item.uid.clone();
        }
        if script.is_none() {
            let script_item = &mut Self::from_script(None)?;
            profiles::profiles_append_item_safe(script_item).await?;
            script = script_item.uid.clone();
        }
        if rules.is_none() {
            let rules_item = &mut Self::from_rules()?;
            profiles::profiles_append_item_safe(rules_item).await?;
            rules = rules_item.uid.clone();
        }
        if proxies.is_none() {
            let proxies_item = &mut Self::from_proxies()?;
            profiles::profiles_append_item_safe(proxies_item).await?;
            proxies = proxies_item.uid.clone();
        }
        if groups.is_none() {
            let groups_item = &mut Self::from_groups()?;
            profiles::profiles_append_item_safe(groups_item).await?;
            groups = groups_item.uid.clone();
        }

        Ok(Self {
            uid: Some(uid),
            itype: Some("remote".into()),
            name: Some(name),
            desc: desc.cloned(),
            file: Some(file),
            url: Some(url.as_str().into()),
=======
            let merge_item = PrfItem::from_merge(None)?;
            Config::profiles().data().append_item(merge_item.clone())?;
            merge = merge_item.uid;
        }
        if script.is_none() {
            let script_item = PrfItem::from_script(None)?;
            Config::profiles().data().append_item(script_item.clone())?;
            script = script_item.uid;
        }
        if rules.is_none() {
            let rules_item = PrfItem::from_rules()?;
            Config::profiles().data().append_item(rules_item.clone())?;
            rules = rules_item.uid;
        }
        if proxies.is_none() {
            let proxies_item = PrfItem::from_proxies()?;
            Config::profiles()
                .data()
                .append_item(proxies_item.clone())?;
            proxies = proxies_item.uid;
        }
        if groups.is_none() {
            let groups_item = PrfItem::from_groups()?;
            Config::profiles().data().append_item(groups_item.clone())?;
            groups = groups_item.uid;
        }

        Ok(PrfItem {
            uid: Some(uid),
            itype: Some("remote".into()),
            name: Some(name),
            desc,
            file: Some(file),
            url: Some(url.into()),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            selected: None,
            extra,
            option: Some(PrfOption {
                update_interval,
                merge,
                script,
                rules,
                proxies,
                groups,
<<<<<<< HEAD
                allow_auto_update,
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                ..PrfOption::default()
            }),
            home,
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(data.into()),
        })
    }

    /// ## Merge type (enhance)
    /// create the enhanced item by using `merge` rule
<<<<<<< HEAD
    pub fn from_merge(uid: Option<String>) -> Result<Self> {
        let (id, template) = if let Some(uid) = uid {
            (uid, tmpl::ITEM_MERGE.into())
        } else {
            (help::get_uid("m").into(), tmpl::ITEM_MERGE_EMPTY.into())
        };
        let file = format!("{id}.yaml").into();

        Ok(Self {
            uid: Some(id),
            itype: Some("merge".into()),
            file: Some(file),
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(template),
            ..Default::default()
=======
    pub fn from_merge(uid: Option<String>) -> Result<PrfItem> {
        let mut id = help::get_uid("m");
        let mut template = tmpl::ITEM_MERGE_EMPTY.into();
        if let Some(uid) = uid {
            id = uid;
            template = tmpl::ITEM_MERGE.into();
        }
        let file = format!("{id}.yaml");

        Ok(PrfItem {
            uid: Some(id),
            itype: Some("merge".into()),
            name: None,
            desc: None,
            file: Some(file),
            url: None,
            selected: None,
            extra: None,
            option: None,
            home: None,
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(template),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        })
    }

    /// ## Script type (enhance)
    /// create the enhanced item by using javascript quick.js
<<<<<<< HEAD
    pub fn from_script(uid: Option<String>) -> Result<Self> {
        let id = if let Some(uid) = uid {
            uid
        } else {
            help::get_uid("s").into()
        };
        let file = format!("{id}.js").into(); // js ext
        Ok(Self {
            uid: Some(id),
            itype: Some("script".into()),
            file: Some(file),
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(tmpl::ITEM_SCRIPT.into()),
            ..Default::default()
=======
    pub fn from_script(uid: Option<String>) -> Result<PrfItem> {
        let mut id = help::get_uid("s");
        if let Some(uid) = uid {
            id = uid;
        }
        let file = format!("{id}.js"); // js ext

        Ok(PrfItem {
            uid: Some(id),
            itype: Some("script".into()),
            name: None,
            desc: None,
            file: Some(file),
            url: None,
            home: None,
            selected: None,
            extra: None,
            option: None,
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(tmpl::ITEM_SCRIPT.into()),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        })
    }

    /// ## Rules type (enhance)
<<<<<<< HEAD
    pub fn from_rules() -> Result<Self> {
        let uid = help::get_uid("r").into();
        let file = format!("{uid}.yaml").into(); // yaml ext

        Ok(Self {
            uid: Some(uid),
            itype: Some("rules".into()),
            file: Some(file),
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(tmpl::ITEM_RULES.into()),
            ..Default::default()
=======
    pub fn from_rules() -> Result<PrfItem> {
        let uid = help::get_uid("r");
        let file = format!("{uid}.yaml"); // yaml ext

        Ok(PrfItem {
            uid: Some(uid),
            itype: Some("rules".into()),
            name: None,
            desc: None,
            file: Some(file),
            url: None,
            home: None,
            selected: None,
            extra: None,
            option: None,
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(tmpl::ITEM_RULES.into()),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        })
    }

    /// ## Proxies type (enhance)
<<<<<<< HEAD
    pub fn from_proxies() -> Result<Self> {
        let uid = help::get_uid("p").into();
        let file = format!("{uid}.yaml").into(); // yaml ext

        Ok(Self {
            uid: Some(uid),
            itype: Some("proxies".into()),
            file: Some(file),
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(tmpl::ITEM_PROXIES.into()),
            ..Default::default()
=======
    pub fn from_proxies() -> Result<PrfItem> {
        let uid = help::get_uid("p");
        let file = format!("{uid}.yaml"); // yaml ext

        Ok(PrfItem {
            uid: Some(uid),
            itype: Some("proxies".into()),
            name: None,
            desc: None,
            file: Some(file),
            url: None,
            home: None,
            selected: None,
            extra: None,
            option: None,
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(tmpl::ITEM_PROXIES.into()),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        })
    }

    /// ## Groups type (enhance)
<<<<<<< HEAD
    pub fn from_groups() -> Result<Self> {
        let uid = help::get_uid("g").into();
        let file = format!("{uid}.yaml").into(); // yaml ext

        Ok(Self {
            uid: Some(uid),
            itype: Some("groups".into()),
            file: Some(file),
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(tmpl::ITEM_GROUPS.into()),
            ..Default::default()
=======
    pub fn from_groups() -> Result<PrfItem> {
        let uid = help::get_uid("g");
        let file = format!("{uid}.yaml"); // yaml ext

        Ok(PrfItem {
            uid: Some(uid),
            itype: Some("groups".into()),
            name: None,
            desc: None,
            file: Some(file),
            url: None,
            home: None,
            selected: None,
            extra: None,
            option: None,
            updated: Some(chrono::Local::now().timestamp() as usize),
            file_data: Some(tmpl::ITEM_GROUPS.into()),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        })
    }

    /// get the file data
<<<<<<< HEAD
    pub async fn read_file(&self) -> Result<String> {
        let file = self
            .file
            .as_ref()
            .ok_or_else(|| anyhow::anyhow!("could not find the file"))?;
        let path = dirs::app_profiles_dir()?.join(file.as_str());
        let content = fs::read_to_string(path).await.context("failed to read the file")?;
        Ok(content.into())
    }

    /// save the file data
    pub async fn save_file(&self, data: String) -> Result<()> {
        let file = self
            .file
            .as_ref()
            .ok_or_else(|| anyhow::anyhow!("could not find the file"))?;
        let path = dirs::app_profiles_dir()?.join(file.as_str());
        fs::write(path, data.as_bytes())
            .await
            .context("failed to save the file")
    }
}

impl PrfItem {
    /// 获取current指向的订阅的merge
    pub fn current_merge(&self) -> Option<&String> {
        self.option.as_ref().and_then(|o| o.merge.as_ref())
    }

    /// 获取current指向的订阅的script
    pub fn current_script(&self) -> Option<&String> {
        self.option.as_ref().and_then(|o| o.script.as_ref())
    }

    /// 获取current指向的订阅的rules
    pub fn current_rules(&self) -> Option<&String> {
        self.option.as_ref().and_then(|o| o.rules.as_ref())
    }

    /// 获取current指向的订阅的proxies
    pub fn current_proxies(&self) -> Option<&String> {
        self.option.as_ref().and_then(|o| o.proxies.as_ref())
    }

    /// 获取current指向的订阅的groups
    pub fn current_groups(&self) -> Option<&String> {
        self.option.as_ref().and_then(|o| o.groups.as_ref())
    }
}

// 向前兼容，默认为订阅启用自动更新
#[allow(clippy::unnecessary_wraps)]
const fn default_allow_auto_update() -> Option<bool> {
    Some(true)
}

/// Fix URLs where query parameters are incorrectly appended to the path segment
///
/// Incorrect Example: https://example.com/path&param1=value1
fn fix_dirty_url(input: &str) -> Result<Url> {
    let mut url = match Url::parse(input) {
        Ok(u) => u,
        Err(e) => {
            return Err(anyhow::anyhow!(
                "failed to parse deep link url: {:?}, input: {:?}",
                e,
                input
            ));
        }
    };

    if url.query().is_none() && url.path().contains('&') {
        let path = url.path().to_string();

        if let Some((clean_path, dirty_params)) = path.split_once('&') {
            url.set_path(clean_path);

            url.query_pairs_mut()
                .extend_pairs(form_urlencoded::parse(dirty_params.as_bytes()));
        }
    }

    Ok(url)
=======
    pub fn read_file(&self) -> Result<String> {
        if self.file.is_none() {
            bail!("could not find the file");
        }

        let file = self.file.clone().unwrap();
        let path = dirs::app_profiles_dir()?.join(file);
        fs::read_to_string(path).context("failed to read the file")
    }

    /// save the file data
    pub fn save_file(&self, data: String) -> Result<()> {
        if self.file.is_none() {
            bail!("could not find the file");
        }

        let file = self.file.clone().unwrap();
        let path = dirs::app_profiles_dir()?.join(file);
        fs::write(path, data.as_bytes()).context("failed to save the file")
    }
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
