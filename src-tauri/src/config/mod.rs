mod clash;
#[allow(clippy::module_inception)]
mod config;
<<<<<<< HEAD
mod encrypt;
mod prfitem;
pub mod profiles;
pub mod runtime;
mod verge;

pub use self::{clash::*, config::*, encrypt::*, prfitem::*, profiles::*, verge::*};
=======
mod draft;
mod encrypt;
mod prfitem;
mod profiles;
mod runtime;
mod verge;

pub use self::clash::*;
pub use self::config::*;
pub use self::draft::*;
pub use self::encrypt::*;
pub use self::prfitem::*;
pub use self::profiles::*;
pub use self::runtime::*;
pub use self::verge::*;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

pub const DEFAULT_PAC: &str = r#"function FindProxyForURL(url, host) {
  return "PROXY 127.0.0.1:%mixed-port%; SOCKS5 127.0.0.1:%mixed-port%; DIRECT;";
}
"#;
