// get the system os
// according to UA
export default function getSystem() {
<<<<<<< HEAD
  const ua = navigator.userAgent
  const platform = OS_PLATFORM

  if (ua.includes('Mac OS X') || platform === 'darwin') return 'macos'

  if (/win64|win32/i.test(ua) || platform === 'win32') return 'windows'

  if (/linux/i.test(ua)) return 'linux'

  return 'unknown'
=======
  const ua = navigator.userAgent;
  const platform = OS_PLATFORM;

  if (ua.includes("Mac OS X") || platform === "darwin") return "macos";

  if (/win64|win32/i.test(ua) || platform === "win32") return "windows";

  if (/linux/i.test(ua)) return "linux";

  return "unknown";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}
