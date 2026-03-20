use crate::utils::dirs::get_encryption_key;
use aes_gcm::{
<<<<<<< HEAD
    Aes256Gcm, Key,
    aead::{Aead as _, KeyInit as _},
};
use base64::{Engine as _, engine::general_purpose::STANDARD};
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::cell::Cell;
use std::future::Future;

const NONCE_LENGTH: usize = 12;

// Use task-local context so the flag follows the async task across threads
tokio::task_local! {
    static ENCRYPTION_ACTIVE: Cell<bool>;
}

/// Encrypt data
#[allow(deprecated)]
=======
    aead::{Aead, KeyInit},
    Aes256Gcm, Key,
};
use base64::{engine::general_purpose::STANDARD, Engine};
use serde::{Deserialize, Deserializer, Serialize, Serializer};

const NONCE_LENGTH: usize = 12;

/// Encrypt data
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
pub fn encrypt_data(data: &str) -> Result<String, Box<dyn std::error::Error>> {
    let encryption_key = get_encryption_key()?;
    let key = Key::<Aes256Gcm>::from_slice(&encryption_key);
    let cipher = Aes256Gcm::new(key);

    // Generate random nonce
    let mut nonce = vec![0u8; NONCE_LENGTH];
<<<<<<< HEAD
    getrandom::fill(&mut nonce)?;
=======
    getrandom::getrandom(&mut nonce)?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    // Encrypt data
    let ciphertext = cipher
        .encrypt(nonce.as_slice().into(), data.as_bytes())
<<<<<<< HEAD
        .map_err(|e| format!("Encryption failed: {e}"))?;
=======
        .map_err(|e| format!("Encryption failed: {}", e))?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    // Concatenate nonce and ciphertext and encode them in base64
    let mut combined = nonce;
    combined.extend(ciphertext);
    Ok(STANDARD.encode(combined))
}

/// Decrypt data
<<<<<<< HEAD
#[allow(deprecated)]
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
pub fn decrypt_data(encrypted: &str) -> Result<String, Box<dyn std::error::Error>> {
    let encryption_key = get_encryption_key()?;
    let key = Key::<Aes256Gcm>::from_slice(&encryption_key);
    let cipher = Aes256Gcm::new(key);
    // Decode from base64
    let data = STANDARD.decode(encrypted)?;
    if data.len() < NONCE_LENGTH {
        return Err("Invalid encrypted data".into());
    }

    // Separate nonce and ciphertext
    let (nonce, ciphertext) = data.split_at(NONCE_LENGTH);

    // Decrypt data
    let plaintext = cipher
        .decrypt(nonce.into(), ciphertext)
<<<<<<< HEAD
        .map_err(|e| format!("Decryption failed: {e}"))?;
=======
        .map_err(|e| format!("Decryption failed: {}", e))?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    String::from_utf8(plaintext).map_err(|e| e.into())
}

/// Serialize encrypted function
pub fn serialize_encrypted<T, S>(value: &T, serializer: S) -> Result<S::Ok, S::Error>
where
    T: Serialize,
    S: Serializer,
{
<<<<<<< HEAD
    if is_encryption_active() {
        let json = serde_json::to_string(value).map_err(serde::ser::Error::custom)?;
        let encrypted = encrypt_data(&json).map_err(serde::ser::Error::custom)?;
        serializer.serialize_str(&encrypted)
    } else {
        value.serialize(serializer)
=======
    // 如果序列化失败，返回 None
    let json = match serde_json::to_string(value) {
        Ok(j) => j,
        Err(_) => return serializer.serialize_none(),
    };

    // 如果加密失败，返回 None
    match encrypt_data(&json) {
        Ok(encrypted) => serializer.serialize_str(&encrypted),
        Err(_) => serializer.serialize_none(),
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    }
}

/// Deserialize decrypted function
<<<<<<< HEAD
pub fn deserialize_encrypted<'a, D, T>(deserializer: D) -> Result<T, D::Error>
=======
pub fn deserialize_encrypted<'a, T, D>(deserializer: D) -> Result<T, D::Error>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
where
    T: for<'de> Deserialize<'de> + Default,
    D: Deserializer<'a>,
{
<<<<<<< HEAD
    if is_encryption_active() {
        let encrypted_opt: Option<String> = Option::deserialize(deserializer)?;

        match encrypted_opt {
            Some(encrypted) if !encrypted.is_empty() => {
                let decrypted_string = decrypt_data(&encrypted).map_err(serde::de::Error::custom)?;
                serde_json::from_str(&decrypted_string).map_err(serde::de::Error::custom)
            }
            _ => Ok(T::default()),
        }
    } else {
        T::deserialize(deserializer)
    }
}

pub async fn with_encryption<F, Fut, R>(f: F) -> R
where
    F: FnOnce() -> Fut,
    Fut: Future<Output = R>,
{
    ENCRYPTION_ACTIVE.scope(Cell::new(true), f()).await
}

fn is_encryption_active() -> bool {
    ENCRYPTION_ACTIVE.try_with(|c| c.get()).unwrap_or(false)
}
=======
    // 如果反序列化字符串失败，返回默认值
    let encrypted = match String::deserialize(deserializer) {
        Ok(s) => s,
        Err(_) => return Ok(T::default()),
    };

    // 如果解密失败，返回默认值
    let decrypted_string = match decrypt_data(&encrypted) {
        Ok(data) => data,
        Err(_) => return Ok(T::default()),
    };
    // 如果 JSON 解析失败，返回默认值
    match serde_json::from_str(&decrypted_string) {
        Ok(value) => Ok(value),
        Err(_) => Ok(T::default()),
    }
}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
