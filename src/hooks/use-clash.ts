<<<<<<< HEAD
import { useLockFn } from 'ahooks'
import useSWR, { mutate } from 'swr'
import { getVersion } from 'tauri-plugin-mihomo-api'

import {
  getClashInfo,
  getRuntimeConfig,
  patchClashConfig,
} from '@/services/cmds'

const PORT_KEYS = [
  'port',
  'socks-port',
  'mixed-port',
  'redir-port',
  'tproxy-port',
] as const

type ClashInfoPatch = Partial<
  Pick<
    IConfigData,
    | 'port'
    | 'socks-port'
    | 'mixed-port'
    | 'redir-port'
    | 'tproxy-port'
    | 'external-controller'
    | 'secret'
  >
>

const hasClashInfoPayload = (patch: ClashInfoPatch) =>
  PORT_KEYS.some((key) => patch[key] != null) ||
  patch['external-controller'] != null ||
  patch.secret != null

const validatePortRange = (port: number) => {
  if (port < 1000) {
    throw new Error('The port should not < 1000')
  }
  if (port > 65536) {
    throw new Error('The port should not > 65536')
  }
}

const validatePorts = (patch: ClashInfoPatch) => {
  PORT_KEYS.forEach((key) => {
    const port = patch[key]
    if (!port) return
    validatePortRange(port)
  })
}

export const useRuntimeConfig = (shouldFetch: boolean = true) => {
  return useSWR(shouldFetch ? 'getRuntimeConfig' : null, getRuntimeConfig)
}

export const useClash = () => {
  const { data: clash, mutate: mutateClash } = useRuntimeConfig()

  const { data: versionData, mutate: mutateVersion } = useSWR(
    'getVersion',
    getVersion,
  )

  const patchClash = useLockFn(async (patch: Partial<IConfigData>) => {
    await patchClashConfig(patch)
    mutateClash()
  })

  const version = versionData?.meta
    ? `${versionData.version} Mihomo`
    : versionData?.version || '-'
=======
import useSWR, { mutate } from "swr";
import { useLockFn } from "ahooks";
import { getAxios, getVersion } from "@/services/api";
import {
  getClashInfo,
  patchClashConfig,
  getRuntimeConfig,
} from "@/services/cmds";

export const useClash = () => {
  const { data: clash, mutate: mutateClash } = useSWR(
    "getRuntimeConfig",
    getRuntimeConfig,
  );

  const { data: versionData, mutate: mutateVersion } = useSWR(
    "getVersion",
    getVersion,
  );

  const patchClash = useLockFn(async (patch: Partial<IConfigData>) => {
    await patchClashConfig(patch);
    mutateClash();
  });

  const version = versionData?.premium
    ? `${versionData.version} Premium`
    : versionData?.meta
      ? `${versionData.version} Mihomo`
      : versionData?.version || "-";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return {
    clash,
    version,
    mutateClash,
    mutateVersion,
    patchClash,
<<<<<<< HEAD
  }
}

export const useClashInfo = () => {
  const { data: clashInfo, mutate: mutateInfo } = useSWR(
    'getClashInfo',
    getClashInfo,
  )

  const patchInfo = async (patch: ClashInfoPatch) => {
    if (!hasClashInfoPayload(patch)) return

    validatePorts(patch)

    await patchClashConfig(patch)
    mutateInfo()
    mutate('getClashConfig')
  }
=======
  };
};

export const useClashInfo = () => {
  const { data: clashInfo, mutate: mutateInfo } = useSWR(
    "getClashInfo",
    getClashInfo,
  );

  const patchInfo = async (
    patch: Partial<
      Pick<
        IConfigData,
        | "port"
        | "socks-port"
        | "mixed-port"
        | "redir-port"
        | "tproxy-port"
        | "external-controller"
        | "secret"
      >
    >,
  ) => {
    const hasInfo =
      patch["redir-port"] != null ||
      patch["tproxy-port"] != null ||
      patch["mixed-port"] != null ||
      patch["socks-port"] != null ||
      patch["port"] != null ||
      patch["external-controller"] != null ||
      patch.secret != null;

    if (!hasInfo) return;

    if (patch["redir-port"]) {
      const port = patch["redir-port"];
      if (port < 1000) {
        throw new Error("The port should not < 1000");
      }
      if (port > 65536) {
        throw new Error("The port should not > 65536");
      }
    }

    if (patch["tproxy-port"]) {
      const port = patch["tproxy-port"];
      if (port < 1000) {
        throw new Error("The port should not < 1000");
      }
      if (port > 65536) {
        throw new Error("The port should not > 65536");
      }
    }

    if (patch["mixed-port"]) {
      const port = patch["mixed-port"];
      if (port < 1000) {
        throw new Error("The port should not < 1000");
      }
      if (port > 65536) {
        throw new Error("The port should not > 65536");
      }
    }

    if (patch["socks-port"]) {
      const port = patch["socks-port"];
      if (port < 1000) {
        throw new Error("The port should not < 1000");
      }
      if (port > 65536) {
        throw new Error("The port should not > 65536");
      }
    }

    if (patch["port"]) {
      const port = patch["port"];
      if (port < 1000) {
        throw new Error("The port should not < 1000");
      }
      if (port > 65536) {
        throw new Error("The port should not > 65536");
      }
    }

    await patchClashConfig(patch);
    mutateInfo();
    mutate("getClashConfig");
    // 刷新接口
    getAxios(true);
  };
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return {
    clashInfo,
    mutateInfo,
    patchInfo,
<<<<<<< HEAD
  }
}
=======
  };
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
