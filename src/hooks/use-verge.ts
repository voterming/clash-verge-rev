<<<<<<< HEAD
import useSWR from 'swr'

import { getVergeConfig, patchVergeConfig } from '@/services/cmds'
import { getPreloadConfig, setPreloadConfig } from '@/services/preload'

export const useVerge = () => {
  const initialVergeConfig = getPreloadConfig()
  const { data: verge, mutate: mutateVerge } = useSWR(
    'getVergeConfig',
    async () => {
      const config = await getVergeConfig()
      setPreloadConfig(config)
      return config
    },
    {
      fallbackData: initialVergeConfig ?? undefined,
      revalidateOnMount: !initialVergeConfig,
    },
  )

  const patchVerge = async (value: Partial<IVergeConfig>) => {
    await patchVergeConfig(value)
    mutateVerge()
  }
=======
import useSWR from "swr";
import { getVergeConfig, patchVergeConfig } from "@/services/cmds";

export const useVerge = () => {
  const { data: verge, mutate: mutateVerge } = useSWR(
    "getVergeConfig",
    async () => {
      const config = await getVergeConfig();
      return config;
    },
  );

  const patchVerge = async (value: Partial<IVergeConfig>) => {
    await patchVergeConfig(value);
    mutateVerge();
  };
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return {
    verge,
    mutateVerge,
    patchVerge,
<<<<<<< HEAD
  }
}
=======
  };
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
