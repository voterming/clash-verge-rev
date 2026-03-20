<<<<<<< HEAD
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'
import { mutate } from 'swr'
import { MihomoWebSocket, type LogLevel } from 'tauri-plugin-mihomo-api'

import { getClashLogs } from '@/services/cmds'

import { useClashLog } from './use-clash-log'
import { useMihomoWsSubscription } from './use-mihomo-ws-subscription'

const MAX_LOG_NUM = 1000
const FLUSH_DELAY_MS = 50
type LogType = ILogItem['type']

const DEFAULT_LOG_TYPES: LogType[] = ['debug', 'info', 'warning', 'error']
const LOG_LEVEL_FILTERS: Record<LogLevel, LogType[]> = {
  debug: DEFAULT_LOG_TYPES,
  info: ['info', 'warning', 'error'],
  warning: ['warning', 'error'],
  error: ['error'],
  silent: [],
}

const clampLogs = (logs: ILogItem[]): ILogItem[] =>
  logs.length > MAX_LOG_NUM ? logs.slice(-MAX_LOG_NUM) : logs

const filterLogsByLevel = (
  logs: ILogItem[],
  allowedTypes: LogType[],
): ILogItem[] => {
  if (allowedTypes.length === 0) return []
  if (allowedTypes.length === DEFAULT_LOG_TYPES.length) return logs
  return logs.filter((log) => allowedTypes.includes(log.type))
}

const appendLogs = (
  current: ILogItem[] | undefined,
  incoming: ILogItem[],
): ILogItem[] => clampLogs([...(current ?? []), ...incoming])

export const useLogData = () => {
  const [clashLog] = useClashLog()
  const enableLog = clashLog.enable
  const logLevel = clashLog.logLevel
  const allowedTypes = LOG_LEVEL_FILTERS[logLevel] ?? DEFAULT_LOG_TYPES

  const { response, refresh, subscriptionCacheKey } = useMihomoWsSubscription<
    ILogItem[]
  >({
    storageKey: 'mihomo_logs_date',
    buildSubscriptKey: (date) => (enableLog ? `getClashLog-${date}` : null),
    fallbackData: [],
    keepPreviousData: true,
    connect: () => MihomoWebSocket.connect_logs(logLevel),
    setupHandlers: ({ next, scheduleReconnect, isMounted }) => {
      let flushTimer: ReturnType<typeof setTimeout> | null = null
      const buffer: ILogItem[] = []

      const clearFlushTimer = () => {
        if (flushTimer) {
          clearTimeout(flushTimer)
          flushTimer = null
        }
      }

      const flush = () => {
        if (!buffer.length || !isMounted()) {
          flushTimer = null
          return
        }
        const pendingLogs = buffer.splice(0, buffer.length)
        next(null, (current) => appendLogs(current, pendingLogs))
        flushTimer = null
      }

      return {
        handleMessage: (data) => {
          if (data.startsWith('Websocket error')) {
            next(data)
            void scheduleReconnect()
            return
          }

          try {
            const parsed = JSON.parse(data) as ILogItem
            if (
              allowedTypes.length > 0 &&
              !allowedTypes.includes(parsed.type)
            ) {
              return
            }
            parsed.time = dayjs().format('MM-DD HH:mm:ss')
            buffer.push(parsed)
            if (!flushTimer) {
              flushTimer = setTimeout(flush, FLUSH_DELAY_MS)
            }
          } catch (error) {
            next(error)
          }
        },
        async onConnected() {
          const logs = await getClashLogs()
          if (isMounted()) {
            next(null, clampLogs(filterLogsByLevel(logs, allowedTypes)))
          }
        },
        cleanup: clearFlushTimer,
      }
    },
  })

  const previousLogLevelRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!logLevel) {
      previousLogLevelRef.current = logLevel ?? undefined
      return
    }

    if (previousLogLevelRef.current === logLevel) {
      return
    }

    previousLogLevelRef.current = logLevel
    refresh()
  }, [logLevel, refresh])

  const refreshGetClashLog = (clear = false) => {
    if (clear) {
      if (subscriptionCacheKey) {
        mutate(subscriptionCacheKey, [])
      }
    } else {
      refresh()
    }
  }

  return { response, refreshGetClashLog }
}
=======
import { useEffect } from "react";
import { useEnableLog } from "../services/states";
import { createSockette } from "../utils/websocket";
import { useClashInfo } from "./use-clash";
import dayjs from "dayjs";
import { create } from "zustand";
import { useVisibility } from "./use-visibility";

const MAX_LOG_NUM = 1000;

export type LogLevel = "warning" | "info" | "debug" | "error" | "all";

interface ILogItem {
  time?: string;
  type: string;
  payload: string;
  [key: string]: any;
}

const buildWSUrl = (server: string, secret: string, logLevel: LogLevel) => {
  const baseUrl = `ws://${server}/logs`;
  const params = new URLSearchParams();

  if (secret) {
    params.append("token", secret);
  }
  if (logLevel === "all") {
    params.append("level", "debug");
  } else {
    params.append("level", logLevel);
  }
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

interface LogStore {
  logs: Record<LogLevel, ILogItem[]>;
  clearLogs: (level?: LogLevel) => void;
  appendLog: (level: LogLevel, log: ILogItem) => void;
}

const useLogStore = create<LogStore>(
  (set: (fn: (state: LogStore) => Partial<LogStore>) => void) => ({
    logs: {
      warning: [],
      info: [],
      debug: [],
      error: [],
      all: [],
    },
    clearLogs: (level?: LogLevel) =>
      set((state: LogStore) => ({
        logs: level
          ? { ...state.logs, [level]: [] }
          : { warning: [], info: [], debug: [], error: [], all: [] },
      })),
    appendLog: (level: LogLevel, log: ILogItem) =>
      set((state: LogStore) => {
        const currentLogs = state.logs[level];
        const newLogs =
          currentLogs.length >= MAX_LOG_NUM
            ? [...currentLogs.slice(1), log]
            : [...currentLogs, log];
        return { logs: { ...state.logs, [level]: newLogs } };
      }),
  }),
);

export const useLogData = (logLevel: LogLevel) => {
  const { clashInfo } = useClashInfo();
  const [enableLog] = useEnableLog();
  const { logs, appendLog } = useLogStore();
  const pageVisible = useVisibility();

  useEffect(() => {
    if (!enableLog || !clashInfo || !pageVisible) return;

    const { server = "", secret = "" } = clashInfo;
    const wsUrl = buildWSUrl(server, secret, logLevel);

    let isActive = true;
    const socket = createSockette(wsUrl, {
      onmessage(event) {
        if (!isActive) return;
        const data = JSON.parse(event.data) as ILogItem;
        const time = dayjs().format("MM-DD HH:mm:ss");
        appendLog(logLevel, { ...data, time });
      },
      onerror() {
        if (!isActive) return;
        socket.close();
      },
    });

    return () => {
      isActive = false;
      socket.close();
    };
  }, [clashInfo, enableLog, logLevel]);

  return logs[logLevel];
};

// 导出清空日志的方法
export const clearLogs = (level?: LogLevel) => {
  useLogStore.getState().clearLogs(level);
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
