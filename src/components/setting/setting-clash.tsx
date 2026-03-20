<<<<<<< HEAD
import { LanRounded, SettingsRounded } from '@mui/icons-material'
import { MenuItem, Select, TextField, Typography } from '@mui/material'
import { invoke } from '@tauri-apps/api/core'
import { useLockFn } from 'ahooks'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { updateGeo } from 'tauri-plugin-mihomo-api'

import { DialogRef, Switch, TooltipIcon } from '@/components/base'
import { useClash } from '@/hooks/use-clash'
import { useClashLog } from '@/hooks/use-clash-log'
import { useVerge } from '@/hooks/use-verge'
import { invoke_uwp_tool } from '@/services/cmds'
import { showNotice } from '@/services/notice-service'
import getSystem from '@/utils/get-system'

import { ClashCoreViewer } from './mods/clash-core-viewer'
import { ClashPortViewer } from './mods/clash-port-viewer'
import { ControllerViewer } from './mods/controller-viewer'
import { DnsViewer } from './mods/dns-viewer'
import { HeaderConfiguration } from './mods/external-controller-cors'
import { GuardState } from './mods/guard-state'
import { NetworkInterfaceViewer } from './mods/network-interface-viewer'
import { SettingItem, SettingList } from './mods/setting-comp'
import { TunnelsViewer } from './mods/tunnels-viewer'
import { WebUIViewer } from './mods/web-ui-viewer'

const isWIN = getSystem() === 'windows'

interface Props {
  onError: (err: Error) => void
}

const SettingClash = ({ onError }: Props) => {
  const { t } = useTranslation()

  const { clash, version, mutateClash, patchClash } = useClash()
  const { verge, patchVerge } = useVerge()
  const [, setClashLog] = useClashLog()

  const {
    ipv6,
    'allow-lan': allowLan,
    'log-level': logLevel,
    'unified-delay': unifiedDelay,
  } = clash ?? {}

  const { verge_mixed_port } = verge ?? {}

  // 独立跟踪DNS设置开关状态
  const [dnsSettingsEnabled, setDnsSettingsEnabled] = useState(() => {
    return verge?.enable_dns_settings ?? false
  })

  const webRef = useRef<DialogRef>(null)
  const portRef = useRef<DialogRef>(null)
  const ctrlRef = useRef<DialogRef>(null)
  const coreRef = useRef<DialogRef>(null)
  const networkRef = useRef<DialogRef>(null)
  const dnsRef = useRef<DialogRef>(null)
  const corsRef = useRef<DialogRef>(null)
  const tunnelRef = useRef<DialogRef>(null)

  const onSwitchFormat = (_e: any, value: boolean) => value
  const onChangeData = (patch: Partial<IConfigData>) => {
    mutateClash((old) => ({ ...old!, ...patch }), false)
  }
  const onUpdateGeo = async () => {
    try {
      await updateGeo()
      showNotice.success('settings.feedback.notifications.clash.geoDataUpdated')
    } catch (err: any) {
      showNotice.error(err)
    }
  }

  // 实现DNS设置开关处理函数
  const handleDnsToggle = useLockFn(async (enable: boolean) => {
    try {
      setDnsSettingsEnabled(enable)
      localStorage.setItem('dns_settings_enabled', String(enable))
      await patchVerge({ enable_dns_settings: enable })
      await invoke('apply_dns_config', { apply: enable })
      setTimeout(() => {
        mutateClash()
      }, 500)
    } catch (err: any) {
      setDnsSettingsEnabled(!enable)
      localStorage.setItem('dns_settings_enabled', String(!enable))
      showNotice.error(err)
      await patchVerge({ enable_dns_settings: !enable }).catch(() => {})
      throw err
    }
  })

  return (
    <SettingList title={t('settings.sections.clash.title')}>
=======
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { TextField, Select, MenuItem, Typography } from "@mui/material";
import {
  SettingsRounded,
  ShuffleRounded,
  LanRounded,
} from "@mui/icons-material";
import { DialogRef, Notice, Switch } from "@/components/base";
import { useClash } from "@/hooks/use-clash";
import { GuardState } from "./mods/guard-state";
import { WebUIViewer } from "./mods/web-ui-viewer";
import { ClashPortViewer } from "./mods/clash-port-viewer";
import { ControllerViewer } from "./mods/controller-viewer";
import { SettingList, SettingItem } from "./mods/setting-comp";
import { ClashCoreViewer } from "./mods/clash-core-viewer";
import { invoke_uwp_tool } from "@/services/cmds";
import getSystem from "@/utils/get-system";
import { useVerge } from "@/hooks/use-verge";
import { updateGeoData } from "@/services/api";
import { TooltipIcon } from "@/components/base/base-tooltip-icon";
import { NetworkInterfaceViewer } from "./mods/network-interface-viewer";

const isWIN = getSystem() === "windows";

interface Props {
  onError: (err: Error) => void;
}

const SettingClash = ({ onError }: Props) => {
  const { t } = useTranslation();

  const { clash, version, mutateClash, patchClash } = useClash();
  const { verge, mutateVerge, patchVerge } = useVerge();

  const {
    ipv6,
    "allow-lan": allowLan,
    "log-level": logLevel,
    "unified-delay": unifiedDelay,
  } = clash ?? {};

  const { enable_random_port = false, verge_mixed_port } = verge ?? {};

  const webRef = useRef<DialogRef>(null);
  const portRef = useRef<DialogRef>(null);
  const ctrlRef = useRef<DialogRef>(null);
  const coreRef = useRef<DialogRef>(null);
  const networkRef = useRef<DialogRef>(null);

  const onSwitchFormat = (_e: any, value: boolean) => value;
  const onChangeData = (patch: Partial<IConfigData>) => {
    mutateClash((old) => ({ ...(old! || {}), ...patch }), false);
  };
  const onChangeVerge = (patch: Partial<IVergeConfig>) => {
    mutateVerge({ ...verge, ...patch }, false);
  };
  const onUpdateGeo = async () => {
    try {
      await updateGeoData();
      Notice.success(t("GeoData Updated"));
    } catch (err: any) {
      Notice.error(err?.response.data.message || err.toString());
    }
  };

  return (
    <SettingList title={t("Clash Setting")}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      <WebUIViewer ref={webRef} />
      <ClashPortViewer ref={portRef} />
      <ControllerViewer ref={ctrlRef} />
      <ClashCoreViewer ref={coreRef} />
      <NetworkInterfaceViewer ref={networkRef} />
<<<<<<< HEAD
      <DnsViewer ref={dnsRef} />
      <HeaderConfiguration ref={corsRef} />
      <TunnelsViewer ref={tunnelRef} />
      <SettingItem
        label={t('settings.sections.clash.form.fields.allowLan')}
        extra={
          <TooltipIcon
            title={t('settings.sections.clash.form.tooltips.networkInterface')}
            color={'inherit'}
            icon={LanRounded}
            onClick={() => {
              networkRef.current?.open()
=======

      <SettingItem
        label={t("Allow Lan")}
        extra={
          <TooltipIcon
            title={t("Network Interface")}
            color={"inherit"}
            icon={LanRounded}
            onClick={() => {
              networkRef.current?.open();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }}
          />
        }
      >
        <GuardState
          value={allowLan ?? false}
          valueProps="checked"
          onCatch={onError}
          onFormat={onSwitchFormat}
<<<<<<< HEAD
          onChange={(e) => onChangeData({ 'allow-lan': e })}
          onGuard={(e) => patchClash({ 'allow-lan': e })}
=======
          onChange={(e) => onChangeData({ "allow-lan": e })}
          onGuard={(e) => patchClash({ "allow-lan": e })}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        >
          <Switch edge="end" />
        </GuardState>
      </SettingItem>

<<<<<<< HEAD
      <SettingItem
        label={t('settings.sections.clash.form.fields.dnsOverwrite')}
        extra={
          <TooltipIcon
            icon={SettingsRounded}
            onClick={() => dnsRef.current?.open()}
          />
        }
      >
        <Switch
          edge="end"
          checked={dnsSettingsEnabled}
          onChange={(_, checked) => handleDnsToggle(checked)}
        />
      </SettingItem>

      <SettingItem label={t('settings.sections.clash.form.fields.ipv6')}>
=======
      <SettingItem label={t("IPv6")}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        <GuardState
          value={ipv6 ?? false}
          valueProps="checked"
          onCatch={onError}
          onFormat={onSwitchFormat}
          onChange={(e) => onChangeData({ ipv6: e })}
          onGuard={(e) => patchClash({ ipv6: e })}
        >
          <Switch edge="end" />
        </GuardState>
      </SettingItem>

      <SettingItem
<<<<<<< HEAD
        label={t('settings.sections.clash.form.fields.unifiedDelay')}
        extra={
          <TooltipIcon
            title={t('settings.sections.clash.form.tooltips.unifiedDelay')}
            sx={{ opacity: '0.7' }}
=======
        label={t("Unified Delay")}
        extra={
          <TooltipIcon
            title={t("Unified Delay Info")}
            sx={{ opacity: "0.7" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          />
        }
      >
        <GuardState
          value={unifiedDelay ?? false}
          valueProps="checked"
          onCatch={onError}
          onFormat={onSwitchFormat}
<<<<<<< HEAD
          onChange={(e) => onChangeData({ 'unified-delay': e })}
          onGuard={(e) => patchClash({ 'unified-delay': e })}
=======
          onChange={(e) => onChangeData({ "unified-delay": e })}
          onGuard={(e) => patchClash({ "unified-delay": e })}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        >
          <Switch edge="end" />
        </GuardState>
      </SettingItem>

      <SettingItem
<<<<<<< HEAD
        label={t('settings.sections.clash.form.fields.logLevel')}
        extra={
          <TooltipIcon
            title={t('settings.sections.clash.form.tooltips.logLevel')}
            sx={{ opacity: '0.7' }}
          />
        }
      >
        <GuardState
          value={logLevel === 'warn' ? 'warning' : (logLevel ?? 'info')}
          onCatch={onError}
          onFormat={(e: any) => e.target.value}
          onChange={(e) => onChangeData({ 'log-level': e })}
          onGuard={(e) => {
            setClashLog((pre: any) => ({ ...pre, logLevel: e }))
            return patchClash({ 'log-level': e })
          }}
        >
          <Select size="small" sx={{ width: 100, '> div': { py: '7.5px' } }}>
            <MenuItem value="debug">
              {t('settings.sections.clash.form.options.logLevel.debug')}
            </MenuItem>
            <MenuItem value="info">
              {t('settings.sections.clash.form.options.logLevel.info')}
            </MenuItem>
            <MenuItem value="warning">
              {t('settings.sections.clash.form.options.logLevel.warning')}
            </MenuItem>
            <MenuItem value="error">
              {t('settings.sections.clash.form.options.logLevel.error')}
            </MenuItem>
            <MenuItem value="silent">
              {t('settings.sections.clash.form.options.logLevel.silent')}
            </MenuItem>
=======
        label={t("Log Level")}
        extra={
          <TooltipIcon title={t("Log Level Info")} sx={{ opacity: "0.7" }} />
        }
      >
        <GuardState
          // clash premium 2022.08.26 值为warn
          value={logLevel === "warn" ? "warning" : (logLevel ?? "info")}
          onCatch={onError}
          onFormat={(e: any) => e.target.value}
          onChange={(e) => onChangeData({ "log-level": e })}
          onGuard={(e) => patchClash({ "log-level": e })}
        >
          <Select size="small" sx={{ width: 100, "> div": { py: "7.5px" } }}>
            <MenuItem value="debug">Debug</MenuItem>
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="warning">Warn</MenuItem>
            <MenuItem value="error">Error</MenuItem>
            <MenuItem value="silent">Silent</MenuItem>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </Select>
        </GuardState>
      </SettingItem>

<<<<<<< HEAD
      <SettingItem label={t('settings.sections.clash.form.fields.portConfig')}>
        <TextField
          autoComplete="new-password"
          disabled={false}
          size="small"
          value={verge_mixed_port ?? 7897}
          sx={{ width: 100, input: { py: '7.5px', cursor: 'pointer' } }}
          onClick={(e) => {
            portRef.current?.open()
            ;(e.target as any).blur()
=======
      <SettingItem
        label={t("Port Config")}
        extra={
          <TooltipIcon
            title={t("Random Port")}
            color={enable_random_port ? "primary" : "inherit"}
            icon={ShuffleRounded}
            onClick={() => {
              Notice.success(
                t("Restart Application to Apply Modifications"),
                1000,
              );
              onChangeVerge({ enable_random_port: !enable_random_port });
              patchVerge({ enable_random_port: !enable_random_port });
            }}
          />
        }
      >
        <TextField
          autoComplete="new-password"
          disabled={enable_random_port}
          size="small"
          value={verge_mixed_port ?? 7897}
          sx={{ width: 100, input: { py: "7.5px", cursor: "pointer" } }}
          onClick={(e) => {
            portRef.current?.open();
            (e.target as any).blur();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          }}
        />
      </SettingItem>

      <SettingItem
<<<<<<< HEAD
        label={t('settings.sections.clash.form.fields.external')}
        extra={
          <TooltipIcon
            title={t('settings.sections.externalCors.tooltips.open')}
            icon={SettingsRounded}
            onClick={(e) => {
              e.stopPropagation()
              corsRef.current?.open()
            }}
          />
        }
        onClick={() => {
          ctrlRef.current?.open()
        }}
      />

      <SettingItem
        onClick={() => webRef.current?.open()}
        label={t('settings.sections.clash.form.fields.webUI')}
      />

      <SettingItem
        label={t('settings.sections.clash.form.fields.clashCore')}
=======
        onClick={() => ctrlRef.current?.open()}
        label={t("External")}
      />

      <SettingItem onClick={() => webRef.current?.open()} label={t("Web UI")} />

      <SettingItem
        label={t("Clash Core")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        extra={
          <TooltipIcon
            icon={SettingsRounded}
            onClick={() => coreRef.current?.open()}
          />
        }
      >
<<<<<<< HEAD
        <Typography sx={{ py: '7px', pr: 1 }}>{version}</Typography>
=======
        <Typography sx={{ py: "7px", pr: 1 }}>{version}</Typography>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      </SettingItem>

      {isWIN && (
        <SettingItem
          onClick={invoke_uwp_tool}
<<<<<<< HEAD
          label={t('settings.sections.clash.form.fields.openUwpTool')}
          extra={
            <TooltipIcon
              title={t('settings.sections.clash.form.tooltips.openUwpTool')}
              sx={{ opacity: '0.7' }}
=======
          label={t("Open UWP tool")}
          extra={
            <TooltipIcon
              title={t("Open UWP tool Info")}
              sx={{ opacity: "0.7" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            />
          }
        />
      )}

<<<<<<< HEAD
      <SettingItem
        onClick={onUpdateGeo}
        label={t('settings.sections.clash.form.fields.updateGeoData')}
      />

      <SettingItem
        label={t('settings.sections.clash.form.fields.tunnels.title')}
        onClick={() => tunnelRef.current?.open()}
      />
    </SettingList>
  )
}

export default SettingClash
=======
      <SettingItem onClick={onUpdateGeo} label={t("Update GeoData")} />
    </SettingList>
  );
};

export default SettingClash;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
