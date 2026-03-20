import {
<<<<<<< HEAD
  ExpandLessRounded,
  ExpandMoreRounded,
  InboxRounded,
} from '@mui/icons-material'
import {
=======
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  alpha,
  Box,
  ListItemText,
  ListItemButton,
  Typography,
  styled,
<<<<<<< HEAD
  Chip,
  Tooltip,
} from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useIconCache } from '@/hooks/use-icon-cache'
import { useVerge } from '@/hooks/use-verge'
import { useThemeMode } from '@/services/states'

import { ProxyHead } from './proxy-head'
import { ProxyItem } from './proxy-item'
import { ProxyItemMini } from './proxy-item-mini'
import { HeadState } from './use-head-state'
import type { IRenderItem } from './use-render-list'

interface RenderProps {
  item: IRenderItem
  indent: boolean
  isChainMode?: boolean
  onLocation: (group: IRenderItem['group']) => void
  onCheckAll: (groupName: string) => void
  onHeadState: (groupName: string, patch: Partial<HeadState>) => void
  onChangeProxy: (
    group: IRenderItem['group'],
    proxy: IRenderItem['proxy'] & { name: string },
  ) => void
}

export const ProxyRender = (props: RenderProps) => {
  const { t } = useTranslation()
  const {
    indent,
    item,
    onLocation,
    onCheckAll,
    onHeadState,
    onChangeProxy,
    isChainMode: _ = false,
  } = props
  const { type, group, headState, proxy, proxyCol } = item
  const { verge } = useVerge()
  const enable_group_icon = verge?.enable_group_icon ?? true
  const mode = useThemeMode()
  const isDark = mode === 'light' ? false : true
  const itembackgroundcolor = isDark ? '#282A36' : '#ffffff'
  const iconCachePath = useIconCache({
    icon: group.icon,
    cacheKey: group.name.replaceAll(' ', ''),
    enabled: enable_group_icon,
  })

  const proxyColItemsMemo = useMemo(() => {
    if (type !== 4 || !proxyCol) {
      return null
    }

    return proxyCol.map((proxyItem) => (
      <ProxyItemMini
        key={`${item.key}-${proxyItem?.name ?? 'unknown'}`}
        group={group}
        proxy={proxyItem!}
        selected={group.now === proxyItem?.name}
        showType={headState?.showType}
        onClick={() => onChangeProxy(group, proxyItem!)}
      />
    ))
  }, [type, proxyCol, item.key, group, headState, onChangeProxy])
=======
} from "@mui/material";
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  InboxRounded,
} from "@mui/icons-material";
import { HeadState } from "./use-head-state";
import { ProxyHead } from "./proxy-head";
import { ProxyItem } from "./proxy-item";
import { ProxyItemMini } from "./proxy-item-mini";
import type { IRenderItem } from "./use-render-list";
import { useVerge } from "@/hooks/use-verge";
import { useThemeMode } from "@/services/states";
import { useEffect, useMemo, useState } from "react";
import { convertFileSrc } from "@tauri-apps/api/core";
import { downloadIconCache } from "@/services/cmds";

interface RenderProps {
  item: IRenderItem;
  indent: boolean;
  onLocation: (group: IProxyGroupItem) => void;
  onCheckAll: (groupName: string) => void;
  onHeadState: (groupName: string, patch: Partial<HeadState>) => void;
  onChangeProxy: (group: IProxyGroupItem, proxy: IProxyItem) => void;
}

export const ProxyRender = (props: RenderProps) => {
  const { indent, item, onLocation, onCheckAll, onHeadState, onChangeProxy } =
    props;
  const { type, group, headState, proxy, proxyCol } = item;
  const { verge } = useVerge();
  const enable_group_icon = verge?.enable_group_icon ?? true;
  const mode = useThemeMode();
  const isDark = mode === "light" ? false : true;
  const itembackgroundcolor = isDark ? "#282A36" : "#ffffff";
  const [iconCachePath, setIconCachePath] = useState("");

  useEffect(() => {
    initIconCachePath();
  }, [group]);

  async function initIconCachePath() {
    if (group.icon && group.icon.trim().startsWith("http")) {
      const fileName =
        group.name.replaceAll(" ", "") + "-" + getFileName(group.icon);
      const iconPath = await downloadIconCache(group.icon, fileName);
      setIconCachePath(convertFileSrc(iconPath));
    }
  }

  function getFileName(url: string) {
    return url.substring(url.lastIndexOf("/") + 1);
  }
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  if (type === 0) {
    return (
      <ListItemButton
        dense
        style={{
          background: itembackgroundcolor,
<<<<<<< HEAD
          height: '100%',
          margin: '8px 8px',
          borderRadius: '8px',
=======
          height: "100%",
          margin: "8px 8px",
          borderRadius: "8px",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }}
        onClick={() => onHeadState(group.name, { open: !headState?.open })}
      >
        {enable_group_icon &&
          group.icon &&
<<<<<<< HEAD
          group.icon.trim().startsWith('http') && (
            <img
              src={iconCachePath === '' ? group.icon : iconCachePath}
              width="32px"
              style={{ marginRight: '12px', borderRadius: '6px' }}
=======
          group.icon.trim().startsWith("http") && (
            <img
              src={iconCachePath === "" ? group.icon : iconCachePath}
              width="32px"
              style={{ marginRight: "12px", borderRadius: "6px" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            />
          )}
        {enable_group_icon &&
          group.icon &&
<<<<<<< HEAD
          group.icon.trim().startsWith('data') && (
            <img
              src={group.icon}
              width="32px"
              style={{ marginRight: '12px', borderRadius: '6px' }}
=======
          group.icon.trim().startsWith("data") && (
            <img
              src={group.icon}
              width="32px"
              style={{ marginRight: "12px", borderRadius: "6px" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            />
          )}
        {enable_group_icon &&
          group.icon &&
<<<<<<< HEAD
          group.icon.trim().startsWith('<svg') && (
=======
          group.icon.trim().startsWith("<svg") && (
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            <img
              src={`data:image/svg+xml;base64,${btoa(group.icon)}`}
              width="32px"
            />
          )}
        <ListItemText
          primary={<StyledPrimary>{group.name}</StyledPrimary>}
          secondary={
<<<<<<< HEAD
            <Box
              sx={{
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                pt: '2px',
              }}
            >
              <Box component="span" sx={{ marginTop: '2px' }}>
                <StyledTypeBox>{group.type}</StyledTypeBox>
                <StyledSubtitle sx={{ color: 'text.secondary' }}>
                  {group.now}
                </StyledSubtitle>
              </Box>
            </Box>
          }
          slotProps={{
            secondary: {
              component: 'div',
              sx: { display: 'flex', alignItems: 'center', color: '#ccc' },
            },
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('proxies.page.labels.proxyCount')} arrow>
            <Chip
              size="small"
              label={`${group.all.length}`}
              sx={{
                mr: 1,
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.1),
                color: (theme) => theme.palette.primary.main,
              }}
            />
          </Tooltip>
          {headState?.open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </Box>
      </ListItemButton>
    )
=======
            <ListItemTextChild
              sx={{
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                pt: "2px",
              }}
            >
              <Box sx={{ marginTop: "2px" }}>
                <StyledTypeBox>{group.type}</StyledTypeBox>
                <StyledSubtitle sx={{ color: "text.secondary" }}>
                  {group.now}
                </StyledSubtitle>
              </Box>
            </ListItemTextChild>
          }
          secondaryTypographyProps={{
            sx: { display: "flex", alignItems: "center", color: "#ccc" },
          }}
        />
        {headState?.open ? <ExpandLessRounded /> : <ExpandMoreRounded />}
      </ListItemButton>
    );
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  }

  if (type === 1) {
    return (
      <ProxyHead
        sx={{ pl: 2, pr: 3, mt: indent ? 1 : 0.5, mb: 1 }}
        url={group.testUrl}
        groupName={group.name}
        headState={headState!}
        onLocation={() => onLocation(group)}
        onCheckDelay={() => onCheckAll(group.name)}
        onHeadState={(p) => onHeadState(group.name, p)}
      />
<<<<<<< HEAD
    )
=======
    );
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  }

  if (type === 2) {
    return (
      <ProxyItem
        group={group}
        proxy={proxy!}
        selected={group.now === proxy?.name}
        showType={headState?.showType}
        sx={{ py: 0, pl: 2 }}
        onClick={() => onChangeProxy(group, proxy!)}
      />
<<<<<<< HEAD
    )
=======
    );
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  }

  if (type === 3) {
    return (
      <Box
        sx={{
          py: 2,
          pl: 0,
<<<<<<< HEAD
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <InboxRounded sx={{ fontSize: '2.5em', color: 'inherit' }} />
        <Typography sx={{ color: 'inherit' }}>No Proxies</Typography>
      </Box>
    )
  }

  if (type === 4) {
=======
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <InboxRounded sx={{ fontSize: "2.5em", color: "inherit" }} />
        <Typography sx={{ color: "inherit" }}>No Proxies</Typography>
      </Box>
    );
  }

  if (type === 4) {
    const proxyColItemsMemo = useMemo(() => {
      return proxyCol?.map((proxy) => (
        <ProxyItemMini
          key={item.key + proxy.name}
          group={group}
          proxy={proxy!}
          selected={group.now === proxy.name}
          showType={headState?.showType}
          onClick={() => onChangeProxy(group, proxy!)}
        />
      ));
    }, [proxyCol, group, headState]);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
    return (
      <Box
        sx={{
          height: 56,
<<<<<<< HEAD
          display: 'grid',
=======
          display: "grid",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          gap: 1,
          pl: 2,
          pr: 2,
          pb: 1,
          gridTemplateColumns: `repeat(${item.col! || 2}, 1fr)`,
        }}
      >
        {proxyColItemsMemo}
      </Box>
<<<<<<< HEAD
    )
  }

  return null
}

const StyledPrimary = styled('span')`
  font-size: 16px;
=======
    );
  }

  return null;
};

const StyledPrimary = styled("span")`
  font-size: 15px;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  font-weight: 700;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
<<<<<<< HEAD
`
const StyledSubtitle = styled('span')`
=======
`;
const StyledSubtitle = styled("span")`
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  font-size: 13px;
  overflow: hidden;
  color: text.secondary;
  text-overflow: ellipsis;
  white-space: nowrap;
<<<<<<< HEAD
`

const StyledTypeBox = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  border: '1px solid #ccc',
=======
`;

const ListItemTextChild = styled("span")`
  display: block;
`;

const StyledTypeBox = styled(ListItemTextChild)(({ theme }) => ({
  display: "inline-block",
  border: "1px solid #ccc",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  borderColor: alpha(theme.palette.primary.main, 0.5),
  color: alpha(theme.palette.primary.main, 0.8),
  borderRadius: 4,
  fontSize: 10,
<<<<<<< HEAD
  padding: '0 4px',
  lineHeight: 1.5,
  marginRight: '8px',
}))
=======
  padding: "0 4px",
  lineHeight: 1.5,
  marginRight: "8px",
}));
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
