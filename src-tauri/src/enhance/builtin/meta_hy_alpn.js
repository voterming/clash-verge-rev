<<<<<<< HEAD
// This function is exported for use by the Clash core
// eslint-disable-next-line unused-imports/no-unused-vars
function main(config, _name) {
  if (Array.isArray(config.proxies)) {
    config.proxies.forEach((p, i) => {
      if (p.type === 'hysteria' && typeof p.alpn === 'string') {
        config.proxies[i].alpn = [p.alpn]
      }
    })
  }
  return config
=======
function main(config, _name) {
  if (Array.isArray(config.proxies)) {
    config.proxies.forEach((p, i) => {
      if (p.type === "hysteria" && typeof p.alpn === "string") {
        config.proxies[i].alpn = [p.alpn];
      }
    });
  }
  return config;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
