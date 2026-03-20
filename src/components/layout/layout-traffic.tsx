<<<<<<< HEAD
=======
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  MemoryRounded,
<<<<<<< HEAD
} from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { LightweightTrafficErrorBoundary } from '@/components/shared/traffic-error-boundary'
import { useMemoryData } from '@/hooks/use-memory-data'
import { useTrafficData } from '@/hooks/use-traffic-data'
import { useVerge } from '@/hooks/use-verge'
import { useVisibility } from '@/hooks/use-visibility'
import parseTraffic from '@/utils/parse-traffic'

import { TrafficGraph, type TrafficRef } from './traffic-graph'

// setup the traffic
export const LayoutTraffic = () => {
  const { t } = useTranslation()
  const { verge } = useVerge()

  // whether hide traffic graph
  const trafficGraph = verge?.traffic_graph ?? true

  const trafficRef = useRef<TrafficRef>(null)
  const pageVisible = useVisibility()

  const {
    response: { data: traffic },
  } = useTrafficData({ enabled: trafficGraph && pageVisible })
  const {
    response: { data: memory },
  } = useMemoryData()

  // 监听数据变化，为图表添加数据点
  useEffect(() => {
    if (trafficRef.current) {
      trafficRef.current.appendData({
        up: traffic?.up || 0,
        down: traffic?.down || 0,
      })
    }
  }, [traffic])

  // 显示内存使用情况的设置
  const displayMemory = verge?.enable_memory_usage ?? true

  // 使用parseTraffic统一处理转换，保持与首页一致的显示格式
  const [up, upUnit] = parseTraffic(traffic?.up || 0)
  const [down, downUnit] = parseTraffic(traffic?.down || 0)
  const [inuse, inuseUnit] = parseTraffic(memory?.inuse || 0)

  const boxStyle: any = {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  }
  const iconStyle: any = {
    sx: { mr: '8px', fontSize: 16 },
  }
  const valStyle: any = {
    component: 'span',
    textAlign: 'center',
    sx: { flex: '1 1 56px', userSelect: 'none' },
  }
  const unitStyle: any = {
    component: 'span',
    color: 'grey.500',
    fontSize: '12px',
    textAlign: 'right',
    sx: { flex: '0 1 27px', userSelect: 'none' },
  }

  return (
    <LightweightTrafficErrorBoundary>
      <Box position="relative">
        {trafficGraph && pageVisible && (
          <div
            style={{ width: '100%', height: 60, marginBottom: 6 }}
            onClick={trafficRef.current?.toggleStyle}
          >
            <TrafficGraph ref={trafficRef} />
          </div>
        )}

        <Box display="flex" flexDirection="column" gap={0.75}>
          <Box
            title={`${t('home.components.traffic.metrics.uploadSpeed')}`}
            {...boxStyle}
            sx={{
              ...boxStyle.sx,
              // opacity: traffic?.is_fresh ? 1 : 0.6,
            }}
          >
            <ArrowUpwardRounded
              {...iconStyle}
              color={(traffic?.up || 0) > 0 ? 'secondary' : 'disabled'}
            />
            <Typography {...valStyle} color="secondary">
              {up}
            </Typography>
            <Typography {...unitStyle}>{upUnit}/s</Typography>
          </Box>

          <Box
            title={`${t('home.components.traffic.metrics.downloadSpeed')}`}
            {...boxStyle}
            sx={{
              ...boxStyle.sx,
              // opacity: traffic?.is_fresh ? 1 : 0.6,
            }}
          >
            <ArrowDownwardRounded
              {...iconStyle}
              color={(traffic?.down || 0) > 0 ? 'primary' : 'disabled'}
            />
            <Typography {...valStyle} color="primary">
              {down}
            </Typography>
            <Typography {...unitStyle}>{downUnit}/s</Typography>
          </Box>

          {displayMemory && (
            <Box
              title={`${t('home.components.traffic.metrics.memoryUsage')} `}
              {...boxStyle}
              sx={{
                cursor: 'auto',
                // opacity: memory?.is_fresh ? 1 : 0.6,
              }}
              color={'disabled'}
              onClick={async () => {
                // isDebug && (await gc());
              }}
            >
              <MemoryRounded {...iconStyle} />
              <Typography {...valStyle}>{inuse}</Typography>
              <Typography {...unitStyle}>{inuseUnit}</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </LightweightTrafficErrorBoundary>
  )
}
=======
} from "@mui/icons-material";
import { useClashInfo } from "@/hooks/use-clash";
import { useVerge } from "@/hooks/use-verge";
import { TrafficGraph, type TrafficRef } from "./traffic-graph";
import { useVisibility } from "@/hooks/use-visibility";
import parseTraffic from "@/utils/parse-traffic";
import useSWRSubscription from "swr/subscription";
import { createSockette } from "@/utils/websocket";
import { useTranslation } from "react-i18next";
import { isDebugEnabled, gc } from "@/services/api";

interface MemoryUsage {
  inuse: number;
  oslimit?: number;
}

// setup the traffic
export const LayoutTraffic = () => {
  const { t } = useTranslation();
  const { clashInfo } = useClashInfo();
  const { verge } = useVerge();

  // whether hide traffic graph
  const trafficGraph = verge?.traffic_graph ?? true;

  const trafficRef = useRef<TrafficRef>(null);
  const pageVisible = useVisibility();
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    isDebugEnabled().then((flag) => setIsDebug(flag));
    return () => {};
  }, [isDebug]);

  const { data: traffic = { up: 0, down: 0 } } = useSWRSubscription<
    ITrafficItem,
    any,
    "getRealtimeTraffic" | null
  >(
    clashInfo && pageVisible ? "getRealtimeTraffic" : null,
    (_key, { next }) => {
      const { server = "", secret = "" } = clashInfo!;

      const s = createSockette(
        `ws://${server}${secret ? `/traffic?token=${encodeURIComponent(secret)}` : "/traffic"}`,
        {
          onmessage(event) {
            const data = JSON.parse(event.data) as ITrafficItem;
            trafficRef.current?.appendData(data);
            next(null, data);
          },
          onerror(event) {
            this.close();
            next(event, { up: 0, down: 0 });
          },
        },
      );

      return () => {
        s.close();
      };
    },
    {
      fallbackData: { up: 0, down: 0 },
      keepPreviousData: true,
    },
  );

  /* --------- meta memory information --------- */

  const displayMemory = verge?.enable_memory_usage ?? true;

  const { data: memory = { inuse: 0 } } = useSWRSubscription<
    MemoryUsage,
    any,
    "getRealtimeMemory" | null
  >(
    clashInfo && pageVisible && displayMemory ? "getRealtimeMemory" : null,
    (_key, { next }) => {
      const { server = "", secret = "" } = clashInfo!;

      const s = createSockette(
        `ws://${server}${secret ? `/memory?token=${encodeURIComponent(secret)}` : "/memory"}`,
        {
          onmessage(event) {
            const data = JSON.parse(event.data) as MemoryUsage;
            next(null, data);
          },
          onerror(event) {
            this.close();
            next(event, { inuse: 0 });
          },
        },
      );

      return () => {
        s.close();
      };
    },
    {
      fallbackData: { inuse: 0 },
      keepPreviousData: true,
    },
  );

  const [up, upUnit] = parseTraffic(traffic.up);
  const [down, downUnit] = parseTraffic(traffic.down);
  const [inuse, inuseUnit] = parseTraffic(memory.inuse);

  const boxStyle: any = {
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  };
  const iconStyle: any = {
    sx: { mr: "8px", fontSize: 16 },
  };
  const valStyle: any = {
    component: "span",
    textAlign: "center",
    sx: { flex: "1 1 56px", userSelect: "none" },
  };
  const unitStyle: any = {
    component: "span",
    color: "grey.500",
    fontSize: "12px",
    textAlign: "right",
    sx: { flex: "0 1 27px", userSelect: "none" },
  };

  return (
    <Box position="relative">
      {trafficGraph && pageVisible && (
        <div
          style={{ width: "100%", height: 60, marginBottom: 6 }}
          onClick={trafficRef.current?.toggleStyle}
        >
          <TrafficGraph ref={trafficRef} />
        </div>
      )}

      <Box display="flex" flexDirection="column" gap={0.75}>
        <Box title={t("Upload Speed")} {...boxStyle}>
          <ArrowUpwardRounded
            {...iconStyle}
            color={+up > 0 ? "secondary" : "disabled"}
          />
          <Typography {...valStyle} color="secondary">
            {up}
          </Typography>
          <Typography {...unitStyle}>{upUnit}/s</Typography>
        </Box>

        <Box title={t("Download Speed")} {...boxStyle}>
          <ArrowDownwardRounded
            {...iconStyle}
            color={+down > 0 ? "primary" : "disabled"}
          />
          <Typography {...valStyle} color="primary">
            {down}
          </Typography>
          <Typography {...unitStyle}>{downUnit}/s</Typography>
        </Box>

        {displayMemory && (
          <Box
            title={t(isDebug ? "Memory Cleanup" : "Memory Usage")}
            {...boxStyle}
            sx={{ cursor: isDebug ? "pointer" : "auto" }}
            color={isDebug ? "success.main" : "disabled"}
            onClick={async () => {
              isDebug && (await gc());
            }}
          >
            <MemoryRounded {...iconStyle} />
            <Typography {...valStyle}>{inuse}</Typography>
            <Typography {...unitStyle}>{inuseUnit}</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
