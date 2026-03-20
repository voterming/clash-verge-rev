<<<<<<< HEAD
use clash_verge_logging::{Type, logging};

use super::use_lowercase;
use serde_yaml_ng::{self, Mapping, Value};

fn deep_merge(a: &mut Value, b: Value) {
=======
use super::use_lowercase;
use serde_yaml::{self, Mapping, Value};

fn deep_merge(a: &mut Value, b: &Value) {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    match (a, b) {
        (&mut Value::Mapping(ref mut a), Value::Mapping(b)) => {
            for (k, v) in b {
                deep_merge(a.entry(k.clone()).or_insert(Value::Null), v);
            }
        }
<<<<<<< HEAD
        (a, b) => *a = b,
    }
}

pub fn use_merge(merge: &Mapping, config: Mapping) -> Mapping {
    let mut config = Value::from(config);
    let merge = use_lowercase(merge);

    deep_merge(&mut config, Value::from(merge));

    config.as_mapping().cloned().unwrap_or_else(|| {
        logging!(
            error,
            Type::Core,
            "Failed to convert merged config to mapping, using empty mapping"
        );
        Mapping::new()
    })
=======
        (a, b) => *a = b.clone(),
    }
}

pub fn use_merge(merge: Mapping, config: Mapping) -> Mapping {
    let mut config = Value::from(config);
    let merge = use_lowercase(merge.clone());

    deep_merge(&mut config, &Value::from(merge));

    let config = config.as_mapping().unwrap().clone();

    config
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}

#[test]
fn test_merge() -> anyhow::Result<()> {
    let merge = r"
    prepend-rules:
      - prepend
      - 1123123
    append-rules:
      - append
    prepend-proxies:
      - 9999
    append-proxies:
      - 1111
    rules:
      - replace
    proxy-groups: 
      - 123781923810
    tun:
      enable: true
    dns:
      enable: true
  ";

    let config = r"
    rules:
      - aaaaa
    script1: test
  ";

<<<<<<< HEAD
    let merge = serde_yaml_ng::from_str::<Mapping>(merge)?;
    let config = serde_yaml_ng::from_str::<Mapping>(config)?;

    let _ = serde_yaml_ng::to_string(&use_merge(&merge, config))?;
=======
    let merge = serde_yaml::from_str::<Mapping>(merge)?;
    let config = serde_yaml::from_str::<Mapping>(config)?;

    let _ = serde_yaml::to_string(&use_merge(merge, config))?;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    Ok(())
}
