<<<<<<< HEAD
import { getName, getVersion } from '@tauri-apps/api/app'
import { fetch } from '@tauri-apps/plugin-http'
import { asyncRetry } from 'foxts/async-retry'
import { extractErrorMessage } from 'foxts/extract-error-message'
import { once } from 'foxts/once'

import { debugLog } from '@/utils/debug'
=======
import axios, { AxiosInstance } from "axios";
import { getClashInfo } from "./cmds";

let axiosIns: AxiosInstance = null!;

/// initialize some information
/// enable force update axiosIns
export const getAxios = async (force: boolean = false) => {
  if (axiosIns && !force) return axiosIns;

  let server = "";
  let secret = "";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

const getUserAgentPromise = once(async () => {
  try {
<<<<<<< HEAD
    const [name, version] = await Promise.all([getName(), getVersion()])
    return `${name}/${version}`
  } catch (error) {
    console.debug('Failed to build User-Agent, fallback to default', error)
    return 'clash-verge-rev'
  }
})
// Get current IP and geolocation information （refactored IP detection with service-specific mappings）
interface IpInfo {
  ip: string
  country_code: string
  country: string
  region: string
  city: string
  organization: string
  asn: number
  asn_organization: string
  longitude: number
  latitude: number
  timezone: string
}

// IP检测服务配置
interface ServiceConfig {
  url: string
  mapping: (data: any) => IpInfo
  timeout?: number // 保留timeout字段（如有需要）
}

// 可用的IP检测服务列表及字段映射
const IP_CHECK_SERVICES: ServiceConfig[] = [
  {
    url: 'https://api.ip.sb/geoip',
    mapping: (data) => ({
      ip: data.ip || '',
      country_code: data.country_code || '',
      country: data.country || '',
      region: data.region || '',
      city: data.city || '',
      organization: data.organization || data.isp || '',
      asn: data.asn || 0,
      asn_organization: data.asn_organization || '',
      longitude: data.longitude || 0,
      latitude: data.latitude || 0,
      timezone: data.timezone || '',
    }),
  },
  {
    url: 'https://ipapi.co/json',
    mapping: (data) => ({
      ip: data.ip || '',
      country_code: data.country_code || '',
      country: data.country_name || '',
      region: data.region || '',
      city: data.city || '',
      organization: data.org || '',
      asn: data.asn ? parseInt(data.asn.replace('AS', '')) : 0,
      asn_organization: data.org || '',
      longitude: data.longitude || 0,
      latitude: data.latitude || 0,
      timezone: data.timezone || '',
    }),
  },
  {
    url: 'https://api.ipapi.is/',
    mapping: (data) => ({
      ip: data.ip || '',
      country_code: data.location?.country_code || '',
      country: data.location?.country || '',
      region: data.location?.state || '',
      city: data.location?.city || '',
      organization: data.asn?.org || data.company?.name || '',
      asn: data.asn?.asn || 0,
      asn_organization: data.asn?.org || '',
      longitude: data.location?.longitude || 0,
      latitude: data.location?.latitude || 0,
      timezone: data.location?.timezone || '',
    }),
  },
  {
    url: 'https://ipwho.is/',
    mapping: (data) => ({
      ip: data.ip || '',
      country_code: data.country_code || '',
      country: data.country || '',
      region: data.region || '',
      city: data.city || '',
      organization: data.connection?.org || data.connection?.isp || '',
      asn: data.connection?.asn || 0,
      asn_organization: data.connection?.isp || '',
      longitude: data.longitude || 0,
      latitude: data.latitude || 0,
      timezone: data.timezone?.id || '',
    }),
  },
  {
    url: 'https://ip.api.skk.moe/cf-geoip',
    mapping: (data) => ({
      ip: data.ip || '',
      country_code: data.country || '',
      country: data.country || '',
      region: data.region || '',
      city: data.city || '',
      organization: data.asOrg || '',
      asn: data.asn || 0,
      asn_organization: data.asOrg || '',
      longitude: data.longitude || 0,
      latitude: data.latitude || 0,
      timezone: data.timezone || '',
    }),
  },
  {
    url: 'https://get.geojs.io/v1/ip/geo.json',
    mapping: (data) => ({
      ip: data.ip || '',
      country_code: data.country_code || '',
      country: data.country || '',
      region: data.region || '',
      city: data.city || '',
      organization: data.organization_name || '',
      asn: data.asn || 0,
      asn_organization: data.organization_name || '',
      longitude: Number(data.longitude) || 0,
      latitude: Number(data.latitude) || 0,
      timezone: data.timezone || '',
    }),
  },
]

// 获取当前IP和地理位置信息
export const getIpInfo = async (): Promise<
  IpInfo & { lastFetchTs: number }
> => {
  // 配置参数
  const maxRetries = 2
  const serviceTimeout = 5000

  const shuffledServices = IP_CHECK_SERVICES.toSorted(() => Math.random() - 0.5)
  let lastError: unknown | null = null
  const userAgent = await getUserAgentPromise()
  console.debug('User-Agent for IP detection:', userAgent)

  for (const service of shuffledServices) {
    debugLog(`尝试IP检测服务: ${service.url}`)

    const timeoutController = new AbortController()
    const timeoutId = setTimeout(() => {
      timeoutController.abort()
    }, service.timeout || serviceTimeout)

    try {
      return await asyncRetry(
        async (bail) => {
          console.debug('Fetching IP information:', service.url)

          const response = await fetch(service.url, {
            method: 'GET',
            signal: timeoutController.signal, // AbortSignal.timeout(service.timeout || serviceTimeout),
            connectTimeout: service.timeout || serviceTimeout,
            headers: {
              'User-Agent': userAgent,
            },
          })

          if (!response.ok) {
            return bail(
              new Error(
                `IP 检测服务出错，状态码: ${response.status} from ${service.url}`,
              ),
            )
          }

          let data: any
          try {
            data = await response.json()
          } catch {
            return bail(new Error(`无法解析 JSON 响应 from ${service.url}`))
          }

          if (data && data.ip) {
            debugLog(`IP检测成功，使用服务: ${service.url}`)
            return Object.assign(service.mapping(data), {
              // use last fetch success timestamp
              lastFetchTs: Date.now(),
            })
          } else {
            return bail(new Error(`无效的响应格式 from ${service.url}`))
          }
        },
        {
          retries: maxRetries,
          minTimeout: 1000,
          maxTimeout: 4000,
          randomize: true,
        },
      )
    } catch (error) {
      debugLog(`IP检测服务失败: ${service.url}`, error)
      lastError = error
    } finally {
      clearTimeout(timeoutId)
    }
  }

  if (lastError) {
    throw new Error(
      `所有IP检测服务都失败: ${extractErrorMessage(lastError) || '未知错误'}`,
    )
  } else {
    throw new Error('没有可用的IP检测服务')
  }
}
=======
    const info = await getClashInfo();

    if (info?.server) {
      server = info.server;

      // compatible width `external-controller`
      if (server.startsWith(":")) server = `127.0.0.1${server}`;
      else if (/^\d+$/.test(server)) server = `127.0.0.1:${server}`;
    }
    if (info?.secret) secret = info?.secret;
  } catch {}

  axiosIns = axios.create({
    baseURL: `http://${server}`,
    headers: secret ? { Authorization: `Bearer ${secret}` } : {},
    timeout: 15000,
  });
  axiosIns.interceptors.response.use((r) => r.data);
  return axiosIns;
};

/// Get Version
export const getVersion = async () => {
  const instance = await getAxios();
  return instance.get("/version") as Promise<{
    premium: boolean;
    meta?: boolean;
    version: string;
  }>;
};

/// Get current base configs
export const getClashConfig = async () => {
  const instance = await getAxios();
  return instance.get("/configs") as Promise<IConfigData>;
};

/// Update geo data
export const updateGeoData = async () => {
  const instance = await getAxios();
  return instance.post("/configs/geo");
};

/// Upgrade clash core
export const upgradeCore = async () => {
  const instance = await getAxios();
  return instance.post("/upgrade");
};

/// Get current rules
export const getRules = async () => {
  const instance = await getAxios();
  const response = await instance.get<any, any>("/rules");
  return response?.rules as IRuleItem[];
};

/// Get Proxy delay
export const getProxyDelay = async (
  name: string,
  url?: string,
  timeout?: number,
) => {
  const params = {
    timeout: timeout || 10000,
    url: url || "http://cp.cloudflare.com/generate_204",
  };
  const instance = await getAxios();
  const result = await instance.get(
    `/proxies/${encodeURIComponent(name)}/delay`,
    { params },
  );
  return result as any as { delay: number };
};

/// Update the Proxy Choose
export const updateProxy = async (group: string, proxy: string) => {
  const instance = await getAxios();
  return instance.put(`/proxies/${encodeURIComponent(group)}`, { name: proxy });
};

// get proxy
export const getProxiesInner = async () => {
  const instance = await getAxios();
  const response = await instance.get<any, any>("/proxies");
  return (response?.proxies || {}) as Record<string, IProxyItem>;
};

/// Get the Proxy information
export const getProxies = async () => {
  const [proxyRecord, providerRecord] = await Promise.all([
    getProxiesInner(),
    getProxyProviders(),
  ]);
  // provider name map
  const providerMap = Object.fromEntries(
    Object.entries(providerRecord).flatMap(([provider, item]) =>
      item.proxies.map((p) => [p.name, { ...p, provider }]),
    ),
  );

  // compatible with proxy-providers
  const generateItem = (name: string) => {
    if (proxyRecord[name]) return proxyRecord[name];
    if (providerMap[name]) return providerMap[name];
    return {
      name,
      type: "unknown",
      udp: false,
      xudp: false,
      tfo: false,
      mptcp: false,
      smux: false,
      history: [],
    };
  };

  const { GLOBAL: global, DIRECT: direct, REJECT: reject } = proxyRecord;

  let groups: IProxyGroupItem[] = Object.values(proxyRecord).reduce<
    IProxyGroupItem[]
  >((acc, each) => {
    if (each.name !== "GLOBAL" && each.all) {
      acc.push({
        ...each,
        all: each.all!.map((item) => generateItem(item)),
      });
    }

    return acc;
  }, []);

  if (global?.all) {
    let globalGroups: IProxyGroupItem[] = global.all.reduce<IProxyGroupItem[]>(
      (acc, name) => {
        if (proxyRecord[name]?.all) {
          acc.push({
            ...proxyRecord[name],
            all: proxyRecord[name].all!.map((item) => generateItem(item)),
          });
        }
        return acc;
      },
      [],
    );

    let globalNames = new Set(globalGroups.map((each) => each.name));
    groups = groups
      .filter((group) => {
        return !globalNames.has(group.name);
      })
      .concat(globalGroups);
  }

  const proxies = [direct, reject].concat(
    Object.values(proxyRecord).filter(
      (p) => !p.all?.length && p.name !== "DIRECT" && p.name !== "REJECT",
    ),
  );

  const _global: IProxyGroupItem = {
    ...global,
    all: global?.all?.map((item) => generateItem(item)) || [],
  };

  return { global: _global, direct, groups, records: proxyRecord, proxies };
};

// get proxy providers
export const getProxyProviders = async () => {
  const instance = await getAxios();
  const response = await instance.get<any, any>("/providers/proxies");

  const providers = (response.providers || {}) as Record<
    string,
    IProxyProviderItem
  >;

  return Object.fromEntries(
    Object.entries(providers).filter(([key, item]) => {
      const type = item.vehicleType.toLowerCase();
      return type === "http" || type === "file";
    }),
  );
};

export const getRuleProviders = async () => {
  const instance = await getAxios();
  const response = await instance.get<any, any>("/providers/rules");

  const providers = (response.providers || {}) as Record<
    string,
    IRuleProviderItem
  >;

  return Object.fromEntries(
    Object.entries(providers).filter(([key, item]) => {
      const type = item.vehicleType.toLowerCase();
      return type === "http" || type === "file";
    }),
  );
};

// proxy providers health check
export const providerHealthCheck = async (name: string) => {
  const instance = await getAxios();
  return instance.get(
    `/providers/proxies/${encodeURIComponent(name)}/healthcheck`,
  );
};

export const proxyProviderUpdate = async (name: string) => {
  const instance = await getAxios();
  return instance.put(`/providers/proxies/${encodeURIComponent(name)}`);
};

export const ruleProviderUpdate = async (name: string) => {
  const instance = await getAxios();
  return instance.put(`/providers/rules/${encodeURIComponent(name)}`);
};

export const getConnections = async () => {
  const instance = await getAxios();
  const result = await instance.get("/connections");
  return result as any as IConnections;
};

// Close specific connection
export const deleteConnection = async (id: string) => {
  const instance = await getAxios();
  await instance.delete<any, any>(`/connections/${encodeURIComponent(id)}`);
};

// Close all connections
export const closeAllConnections = async () => {
  const instance = await getAxios();
  await instance.delete<any, any>(`/connections`);
};

// Get Group Proxy Delays
export const getGroupProxyDelays = async (
  groupName: string,
  url?: string,
  timeout?: number,
) => {
  const params = {
    timeout: timeout || 10000,
    url: url || "http://cp.cloudflare.com/generate_204",
  };
  const instance = await getAxios();
  const result = await instance.get(
    `/group/${encodeURIComponent(groupName)}/delay`,
    { params },
  );
  return result as any as Record<string, number>;
};

// Is debug enabled
export const isDebugEnabled = async () => {
  try {
    const instance = await getAxios();
    await instance.get("/debug/pprof");
    return true;
  } catch {
    return false;
  }
};

// GC
export const gc = async () => {
  try {
    const instance = await getAxios();
    await instance.put("/debug/gc");
  } catch (error) {
    console.error(`Error gcing: ${error}`);
  }
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
