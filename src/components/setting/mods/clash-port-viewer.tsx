<<<<<<< HEAD
import { Shuffle } from '@mui/icons-material'
import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material'
import { useLockFn, useRequest } from 'ahooks'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseDialog, Switch } from '@/components/base'
import { useClashInfo } from '@/hooks/use-clash'
import { useVerge } from '@/hooks/use-verge'
import { isPortInUse } from '@/services/cmds'
import { showNotice } from '@/services/notice-service'
import getSystem from '@/utils/get-system'

const OS = getSystem()

interface ClashPortViewerRef {
  open: () => void
  close: () => void
}

const generateRandomPort = () =>
  Math.floor(Math.random() * (65535 - 1025 + 1)) + 1025

export const ClashPortViewer = forwardRef<ClashPortViewerRef>((_, ref) => {
  const { t } = useTranslation()
  const { clashInfo, patchInfo } = useClashInfo()
  const { verge, patchVerge } = useVerge()
  const [open, setOpen] = useState(false)

  // Mixed Port
  const [mixedPort, setMixedPort] = useState(
    verge?.verge_mixed_port ?? clashInfo?.mixed_port ?? 7897,
  )

  // 其他端口状态
  const [socksPort, setSocksPort] = useState(verge?.verge_socks_port ?? 7898)
  const [socksEnabled, setSocksEnabled] = useState(
    verge?.verge_socks_enabled ?? false,
  )
  const [httpPort, setHttpPort] = useState(verge?.verge_port ?? 7899)
  const [httpEnabled, setHttpEnabled] = useState(
    verge?.verge_http_enabled ?? false,
  )
  const [redirPort, setRedirPort] = useState(verge?.verge_redir_port ?? 7895)
  const [redirEnabled, setRedirEnabled] = useState(
    verge?.verge_redir_enabled ?? false,
  )
  const [tproxyPort, setTproxyPort] = useState(verge?.verge_tproxy_port ?? 7896)
  const [tproxyEnabled, setTproxyEnabled] = useState(
    verge?.verge_tproxy_enabled ?? false,
  )

  // 保存打开对话框时的原始值，用于在检测到端口被占用时恢复
  const originalPortsRef = useRef<Record<string, any> | null>(null)

  // 添加保存请求，防止GUI卡死
  const { loading, run: saveSettings } = useRequest(
    async (params: { clashConfig: any; vergeConfig: any }) => {
      const { clashConfig, vergeConfig } = params
      await Promise.all([patchInfo(clashConfig), patchVerge(vergeConfig)])
    },
    {
      manual: true,
      onSuccess: () => {
        setOpen(false)
        showNotice.success('settings.modals.clashPort.messages.saved')
      },
      onError: (error) => {
        showNotice.error('settings.modals.clashPort.messages.saveFailed', error)
      },
    },
  )

  useImperativeHandle(ref, () => ({
    open: () => {
      originalPortsRef.current = {
        mixedPort: verge?.verge_mixed_port ?? clashInfo?.mixed_port ?? 7897,
        socksPort: verge?.verge_socks_port ?? 7898,
        socksEnabled: verge?.verge_socks_enabled ?? false,
        httpPort: verge?.verge_port ?? 7899,
        httpEnabled: verge?.verge_http_enabled ?? false,
        redirPort: verge?.verge_redir_port ?? 7895,
        redirEnabled: verge?.verge_redir_enabled ?? false,
        tproxyPort: verge?.verge_tproxy_port ?? 7896,
        tproxyEnabled: verge?.verge_tproxy_enabled ?? false,
      }

      setMixedPort(originalPortsRef.current.mixedPort)
      setSocksPort(originalPortsRef.current.socksPort)
      setSocksEnabled(originalPortsRef.current.socksEnabled)
      setHttpPort(originalPortsRef.current.httpPort)
      setHttpEnabled(originalPortsRef.current.httpEnabled)
      setRedirPort(originalPortsRef.current.redirPort)
      setRedirEnabled(originalPortsRef.current.redirEnabled)
      setTproxyPort(originalPortsRef.current.tproxyPort)
      setTproxyEnabled(originalPortsRef.current.tproxyEnabled)
      setOpen(true)
    },
    close: () => setOpen(false),
  }))

  // TODO 减少代码复杂度，性能开支
  const onSave = useLockFn(async () => {
    // 端口冲突检测
    const portList = [
      mixedPort,
      socksEnabled ? socksPort : -1,
      httpEnabled ? httpPort : -1,
      redirEnabled ? redirPort : -1,
      tproxyEnabled ? tproxyPort : -1,
    ].filter((p) => p !== -1)

    if (new Set(portList).size !== portList.length) {
      return
    }

    // 验证端口范围
    const isValidPort = (port: number) => port >= 1 && port <= 65535
    const allPortsValid = [
      mixedPort,
      socksEnabled ? socksPort : 0,
      httpEnabled ? httpPort : 0,
      redirEnabled ? redirPort : 0,
      tproxyEnabled ? tproxyPort : 0,
    ].every((port) => port === 0 || isValidPort(port))

    if (!allPortsValid) {
      return
    }

    const original = originalPortsRef.current
    const changedPorts: number[] = []

    if (mixedPort !== original?.mixedPort) changedPorts.push(mixedPort)
    if (socksEnabled && socksPort !== original?.socksPort)
      changedPorts.push(socksPort)
    if (httpEnabled && httpPort !== original?.httpPort)
      changedPorts.push(httpPort)
    if (redirEnabled && redirPort !== original?.redirPort)
      changedPorts.push(redirPort)
    if (tproxyEnabled && tproxyPort !== original?.tproxyPort)
      changedPorts.push(tproxyPort)

    for (const port of changedPorts) {
      try {
        const inUse = await isPortInUse(port)
        if (inUse) {
          showNotice.error('settings.modals.clashPort.messages.portInUse', {
            port,
          })
          if (original) {
            setMixedPort(original.mixedPort)
            setSocksPort(original.socksPort)
            setSocksEnabled(original.socksEnabled)
            setHttpPort(original.httpPort)
            setHttpEnabled(original.httpEnabled)
            setRedirPort(original.redirPort)
            setRedirEnabled(original.redirEnabled)
            setTproxyPort(original.tproxyPort)
            setTproxyEnabled(original.tproxyEnabled)
          } else {
            setMixedPort(
              verge?.verge_mixed_port ?? clashInfo?.mixed_port ?? 7897,
            )
            setSocksPort(verge?.verge_socks_port ?? 7898)
            setSocksEnabled(verge?.verge_socks_enabled ?? false)
            setHttpPort(verge?.verge_port ?? 7899)
            setHttpEnabled(verge?.verge_http_enabled ?? false)
            setRedirPort(verge?.verge_redir_port ?? 7895)
            setRedirEnabled(verge?.verge_redir_enabled ?? false)
            setTproxyPort(verge?.verge_tproxy_port ?? 7896)
            setTproxyEnabled(verge?.verge_tproxy_enabled ?? false)
          }
          return
        }
      } catch (error) {
        showNotice.error(error)
        return
      }
    }

    // 准备配置数据
    const clashConfig = {
      'mixed-port': mixedPort,
      'socks-port': socksPort,
      port: httpPort,
      'redir-port': redirPort,
      'tproxy-port': tproxyPort,
    }

    const vergeConfig = {
      verge_mixed_port: mixedPort,
      verge_socks_port: socksPort,
      verge_socks_enabled: socksEnabled,
      verge_port: httpPort,
      verge_http_enabled: httpEnabled,
      verge_redir_port: redirPort,
      verge_redir_enabled: redirEnabled,
      verge_tproxy_port: tproxyPort,
      verge_tproxy_enabled: tproxyEnabled,
    }

    // 提交保存请求
    saveSettings({ clashConfig, vergeConfig })
  })
=======
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLockFn } from "ahooks";
import { List, ListItem, ListItemText, TextField } from "@mui/material";
import { useClashInfo } from "@/hooks/use-clash";
import { BaseDialog, DialogRef, Notice, Switch } from "@/components/base";
import { useVerge } from "@/hooks/use-verge";
import getSystem from "@/utils/get-system";
const OS = getSystem();

export const ClashPortViewer = forwardRef<DialogRef>((props, ref) => {
  const { t } = useTranslation();

  const { clashInfo, patchInfo } = useClashInfo();
  const { verge, patchVerge } = useVerge();
  const [open, setOpen] = useState(false);
  const [redirPort, setRedirPort] = useState(
    verge?.verge_redir_port ?? clashInfo?.redir_port ?? 7895
  );
  const [redirEnabled, setRedirEnabled] = useState(
    verge?.verge_redir_enabled ?? false
  );
  const [tproxyPort, setTproxyPort] = useState(
    verge?.verge_tproxy_port ?? clashInfo?.tproxy_port ?? 7896
  );
  const [tproxyEnabled, setTproxyEnabled] = useState(
    verge?.verge_tproxy_enabled ?? false
  );
  const [mixedPort, setMixedPort] = useState(
    verge?.verge_mixed_port ?? clashInfo?.mixed_port ?? 7897
  );
  const [socksPort, setSocksPort] = useState(
    verge?.verge_socks_port ?? clashInfo?.socks_port ?? 7898
  );
  const [socksEnabled, setSocksEnabled] = useState(
    verge?.verge_socks_enabled ?? false
  );
  const [port, setPort] = useState(
    verge?.verge_port ?? clashInfo?.port ?? 7899
  );
  const [httpEnabled, setHttpEnabled] = useState(
    verge?.verge_http_enabled ?? false
  );

  useImperativeHandle(ref, () => ({
    open: () => {
      if (verge?.verge_redir_port) setRedirPort(verge?.verge_redir_port);
      setRedirEnabled(verge?.verge_redir_enabled ?? false);
      if (verge?.verge_tproxy_port) setTproxyPort(verge?.verge_tproxy_port);
      setTproxyEnabled(verge?.verge_tproxy_enabled ?? false);
      if (verge?.verge_mixed_port) setMixedPort(verge?.verge_mixed_port);
      if (verge?.verge_socks_port) setSocksPort(verge?.verge_socks_port);
      setSocksEnabled(verge?.verge_socks_enabled ?? false);
      if (verge?.verge_port) setPort(verge?.verge_port);
      setHttpEnabled(verge?.verge_http_enabled ?? false);
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  const onSave = useLockFn(async () => {
    if (
      redirPort === verge?.verge_redir_port &&
      tproxyPort === verge?.verge_tproxy_port &&
      mixedPort === verge?.verge_mixed_port &&
      socksPort === verge?.verge_socks_port &&
      port === verge?.verge_port &&
      redirEnabled === verge?.verge_redir_enabled &&
      tproxyEnabled === verge?.verge_tproxy_enabled &&
      socksEnabled === verge?.verge_socks_enabled &&
      httpEnabled === verge?.verge_http_enabled
    ) {
      setOpen(false);
      return;
    }

    if (
      OS === "linux" &&
      new Set([redirPort, tproxyPort, mixedPort, socksPort, port]).size !== 5
    ) {
      Notice.error(t("Port Conflict"), 4000);
      return;
    }
    if (
      OS === "macos" &&
      new Set([redirPort, mixedPort, socksPort, port]).size !== 4
    ) {
      Notice.error(t("Port Conflict"), 4000);
      return;
    }
    if (OS === "windows" && new Set([mixedPort, socksPort, port]).size !== 3) {
      Notice.error(t("Port Conflict"), 4000);
      return;
    }
    try {
      if (OS === "windows") {
        await patchInfo({
          "mixed-port": mixedPort,
          "socks-port": socksPort,
          port,
        });
        await patchVerge({
          verge_mixed_port: mixedPort,
          verge_socks_port: socksPort,
          verge_socks_enabled: socksEnabled,
          verge_port: port,
          verge_http_enabled: httpEnabled,
        });
      }
      if (OS === "macos") {
        await patchInfo({
          "redir-port": redirPort,
          "mixed-port": mixedPort,
          "socks-port": socksPort,
          port,
        });
        await patchVerge({
          verge_redir_port: redirPort,
          verge_redir_enabled: redirEnabled,
          verge_mixed_port: mixedPort,
          verge_socks_port: socksPort,
          verge_socks_enabled: socksEnabled,
          verge_port: port,
          verge_http_enabled: httpEnabled,
        });
      }
      if (OS === "linux") {
        await patchInfo({
          "redir-port": redirPort,
          "tproxy-port": tproxyPort,
          "mixed-port": mixedPort,
          "socks-port": socksPort,
          port,
        });
        await patchVerge({
          verge_redir_port: redirPort,
          verge_redir_enabled: redirEnabled,
          verge_tproxy_port: tproxyPort,
          verge_tproxy_enabled: tproxyEnabled,
          verge_mixed_port: mixedPort,
          verge_socks_port: socksPort,
          verge_socks_enabled: socksEnabled,
          verge_port: port,
          verge_http_enabled: httpEnabled,
        });
      }
      setOpen(false);
      Notice.success(t("Clash Port Modified"), 1000);
    } catch (err: any) {
      Notice.error(err.message || err.toString(), 4000);
    }
  });
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <BaseDialog
      open={open}
<<<<<<< HEAD
      title={t('settings.modals.clashPort.title')}
      contentSx={{
        width: 400,
      }}
      okBtn={
        loading ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <CircularProgress size={20} />
            {t('shared.statuses.saving')}
          </Stack>
        ) : (
          t('shared.actions.save')
        )
      }
      cancelBtn={t('shared.actions.cancel')}
=======
      title={t("Port Config")}
      contentSx={{ width: 300 }}
      okBtn={t("Save")}
      cancelBtn={t("Cancel")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      onOk={onSave}
    >
<<<<<<< HEAD
      <List sx={{ width: '100%' }}>
        <ListItem sx={{ padding: '4px 0', minHeight: 36 }}>
          <ListItemText
            primary={t('settings.modals.clashPort.fields.mixed')}
            slotProps={{ primary: { sx: { fontSize: 12 } } }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              sx={{ width: 80, mr: 0.5, fontSize: 12 }}
              value={mixedPort}
              onChange={(e) =>
                setMixedPort(+e.target.value?.replace(/\D+/, '').slice(0, 5))
              }
              slotProps={{ htmlInput: { style: { fontSize: 12 } } }}
            />
            <IconButton
              size="small"
              onClick={() => setMixedPort(generateRandomPort())}
              title={t('settings.modals.clashPort.actions.random')}
              sx={{ mr: 0.5 }}
            >
              <Shuffle fontSize="small" />
            </IconButton>
            <Switch
              size="small"
              checked={true}
              disabled={true}
              sx={{ ml: 0.5, opacity: 0.7 }}
            />
          </div>
        </ListItem>

        <ListItem sx={{ padding: '4px 0', minHeight: 36 }}>
          <ListItemText
            primary={t('settings.modals.clashPort.fields.socks')}
            slotProps={{ primary: { sx: { fontSize: 12 } } }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              sx={{ width: 80, mr: 0.5, fontSize: 12 }}
              value={socksPort}
              onChange={(e) =>
                setSocksPort(+e.target.value?.replace(/\D+/, '').slice(0, 5))
              }
              disabled={!socksEnabled}
              slotProps={{ htmlInput: { style: { fontSize: 12 } } }}
            />
            <IconButton
              size="small"
              onClick={() => setSocksPort(generateRandomPort())}
              title={t('settings.modals.clashPort.actions.random')}
              disabled={!socksEnabled}
              sx={{ mr: 0.5 }}
            >
              <Shuffle fontSize="small" />
            </IconButton>
            <Switch
              size="small"
              checked={socksEnabled}
              onChange={(_, c) => setSocksEnabled(c)}
              sx={{ ml: 0.5 }}
            />
          </div>
        </ListItem>

        <ListItem sx={{ padding: '4px 0', minHeight: 36 }}>
          <ListItemText
            primary={t('settings.modals.clashPort.fields.http')}
            slotProps={{ primary: { sx: { fontSize: 12 } } }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              sx={{ width: 80, mr: 0.5, fontSize: 12 }}
              value={httpPort}
              onChange={(e) =>
                setHttpPort(+e.target.value?.replace(/\D+/, '').slice(0, 5))
              }
              disabled={!httpEnabled}
              slotProps={{ htmlInput: { style: { fontSize: 12 } } }}
            />
            <IconButton
              size="small"
              onClick={() => setHttpPort(generateRandomPort())}
              title={t('settings.modals.clashPort.actions.random')}
              disabled={!httpEnabled}
              sx={{ mr: 0.5 }}
            >
              <Shuffle fontSize="small" />
            </IconButton>
            <Switch
              size="small"
              checked={httpEnabled}
              onChange={(_, c) => setHttpEnabled(c)}
              sx={{ ml: 0.5 }}
            />
          </div>
        </ListItem>

        {OS !== 'windows' && (
          <ListItem sx={{ padding: '4px 0', minHeight: 36 }}>
            <ListItemText
              primary={t('settings.modals.clashPort.fields.redir')}
              slotProps={{ primary: { sx: { fontSize: 12 } } }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                size="small"
                sx={{ width: 80, mr: 0.5, fontSize: 12 }}
                value={redirPort}
                onChange={(e) =>
                  setRedirPort(+e.target.value?.replace(/\D+/, '').slice(0, 5))
                }
                disabled={!redirEnabled}
                slotProps={{ htmlInput: { style: { fontSize: 12 } } }}
              />
              <IconButton
                size="small"
                onClick={() => setRedirPort(generateRandomPort())}
                title={t('settings.modals.clashPort.actions.random')}
                disabled={!redirEnabled}
                sx={{ mr: 0.5 }}
              >
                <Shuffle fontSize="small" />
              </IconButton>
              <Switch
                size="small"
                checked={redirEnabled}
                onChange={(_, c) => setRedirEnabled(c)}
                sx={{ ml: 0.5 }}
              />
            </div>
          </ListItem>
        )}

        {OS === 'linux' && (
          <ListItem sx={{ padding: '4px 0', minHeight: 36 }}>
            <ListItemText
              primary={t('settings.modals.clashPort.fields.tproxy')}
              slotProps={{ primary: { sx: { fontSize: 12 } } }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                size="small"
                sx={{ width: 80, mr: 0.5, fontSize: 12 }}
                value={tproxyPort}
                onChange={(e) =>
                  setTproxyPort(+e.target.value?.replace(/\D+/, '').slice(0, 5))
                }
                disabled={!tproxyEnabled}
                slotProps={{ htmlInput: { style: { fontSize: 12 } } }}
              />
              <IconButton
                size="small"
                onClick={() => setTproxyPort(generateRandomPort())}
                title={t('settings.modals.clashPort.actions.random')}
                disabled={!tproxyEnabled}
                sx={{ mr: 0.5 }}
              >
                <Shuffle fontSize="small" />
              </IconButton>
              <Switch
                size="small"
                checked={tproxyEnabled}
                onChange={(_, c) => setTproxyEnabled(c)}
                sx={{ ml: 0.5 }}
              />
            </div>
=======
      <List>
        <ListItem sx={{ padding: "5px 2px" }}>
          <ListItemText primary={t("Mixed Port")} />
          <TextField
            autoComplete="new-password"
            size="small"
            sx={{ width: 135 }}
            value={mixedPort}
            onChange={(e) =>
              setMixedPort(+e.target.value?.replace(/\D+/, "").slice(0, 5))
            }
          />
        </ListItem>
        <ListItem sx={{ padding: "5px 2px" }}>
          <ListItemText primary={t("Socks Port")} />
          <TextField
            autoComplete="new-password"
            size="small"
            sx={{ width: 135 }}
            value={socksPort}
            onChange={(e) =>
              setSocksPort(+e.target.value?.replace(/\D+/, "").slice(0, 5))
            }
            InputProps={{
              sx: { pr: 1 },
              endAdornment: (
                <Switch
                  checked={socksEnabled}
                  onChange={(_, c) => {
                    setSocksEnabled(c);
                  }}
                />
              ),
            }}
          />
        </ListItem>
        <ListItem sx={{ padding: "5px 2px" }}>
          <ListItemText primary={t("Http Port")} />
          <TextField
            autoComplete="new-password"
            size="small"
            sx={{ width: 135 }}
            value={port}
            onChange={(e) =>
              setPort(+e.target.value?.replace(/\D+/, "").slice(0, 5))
            }
            InputProps={{
              sx: { pr: 1 },
              endAdornment: (
                <Switch
                  checked={httpEnabled}
                  onChange={(_, c) => {
                    setHttpEnabled(c);
                  }}
                />
              ),
            }}
          />
        </ListItem>
        {OS !== "windows" && (
          <ListItem sx={{ padding: "5px 2px" }}>
            <ListItemText primary={t("Redir Port")} />
            <TextField
              autoComplete="new-password"
              size="small"
              sx={{ width: 135 }}
              value={redirPort}
              onChange={(e) =>
                setRedirPort(+e.target.value?.replace(/\D+/, "").slice(0, 5))
              }
              InputProps={{
                sx: { pr: 1 },
                endAdornment: (
                  <Switch
                    checked={redirEnabled}
                    onChange={(_, c) => {
                      setRedirEnabled(c);
                    }}
                  />
                ),
              }}
            />
          </ListItem>
        )}
        {OS === "linux" && (
          <ListItem sx={{ padding: "5px 2px" }}>
            <ListItemText primary={t("Tproxy Port")} />
            <TextField
              autoComplete="new-password"
              size="small"
              sx={{ width: 135 }}
              value={tproxyPort}
              onChange={(e) =>
                setTproxyPort(+e.target.value?.replace(/\D+/, "").slice(0, 5))
              }
              InputProps={{
                sx: { pr: 1 },
                endAdornment: (
                  <Switch
                    checked={tproxyEnabled}
                    onChange={(_, c) => {
                      setTproxyEnabled(c);
                    }}
                  />
                ),
              }}
            />
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </ListItem>
        )}
      </List>
    </BaseDialog>
<<<<<<< HEAD
  )
})
=======
  );
});
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
