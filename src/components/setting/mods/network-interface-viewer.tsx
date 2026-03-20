<<<<<<< HEAD
import { ContentCopyRounded } from '@mui/icons-material'
import { alpha, Box, Button, IconButton } from '@mui/material'
import { writeText } from '@tauri-apps/plugin-clipboard-manager'
import type { Ref } from 'react'
import { useImperativeHandle, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseDialog, DialogRef } from '@/components/base'
import { useNetworkInterfaces } from '@/hooks/use-network'
import { showNotice } from '@/services/notice-service'

export function NetworkInterfaceViewer({ ref }: { ref?: Ref<DialogRef> }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [isV4, setIsV4] = useState(true)

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true)
    },
    close: () => setOpen(false),
  }))

  const { networkInterfaces } = useNetworkInterfaces()
=======
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { BaseDialog, DialogRef, Notice } from "@/components/base";
import { getNetworkInterfacesInfo } from "@/services/cmds";
import { alpha, Box, Button, Chip, IconButton } from "@mui/material";
import { ContentCopyRounded } from "@mui/icons-material";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";

export const NetworkInterfaceViewer = forwardRef<DialogRef>((props, ref) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [networkInterfaces, setNetworkInterfaces] = useState<
    INetworkInterface[]
  >([]);
  const [isV4, setIsV4] = useState(true);

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  useEffect(() => {
    if (!open) return;
    getNetworkInterfacesInfo().then((res) => {
      setNetworkInterfaces(res);
    });
  }, [open]);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <BaseDialog
      open={open}
      title={
        <Box display="flex" justifyContent="space-between">
<<<<<<< HEAD
          {t('settings.modals.networkInterface.title')}
=======
          {t("Network Interface")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          <Box>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
<<<<<<< HEAD
                setIsV4((prev) => !prev)
              }}
            >
              {isV4 ? 'Ipv6' : 'Ipv4'}
=======
                setIsV4((prev) => !prev);
              }}
            >
              {isV4 ? "Ipv6" : "Ipv4"}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            </Button>
          </Box>
        </Box>
      }
<<<<<<< HEAD
      contentSx={{ width: 450 }}
      disableOk
      cancelBtn={t('shared.actions.close')}
      onClose={() => setOpen(false)}
=======
      contentSx={{ width: 450, maxHeight: 330 }}
      disableOk
      cancelBtn={t("Close")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      onCancel={() => setOpen(false)}
    >
      {networkInterfaces.map((item) => (
        <Box key={item.name}>
          <h4>{item.name}</h4>
          <Box>
            {isV4 && (
              <>
                {item.addr.map(
                  (address) =>
                    address.V4 && (
                      <AddressDisplay
                        key={address.V4.ip}
<<<<<<< HEAD
                        label={t(
                          'settings.modals.networkInterface.fields.ipAddress',
                        )}
                        content={address.V4.ip}
                      />
                    ),
                )}
                <AddressDisplay
                  label={t(
                    'settings.modals.networkInterface.fields.macAddress',
                  )}
                  content={item.mac_addr ?? ''}
=======
                        label={t("Ip Address")}
                        content={address.V4.ip}
                      />
                    )
                )}
                <AddressDisplay
                  label={t("Mac Address")}
                  content={item.mac_addr ?? ""}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                />
              </>
            )}
            {!isV4 && (
              <>
                {item.addr.map(
                  (address) =>
                    address.V6 && (
                      <AddressDisplay
                        key={address.V6.ip}
<<<<<<< HEAD
                        label={t(
                          'settings.modals.networkInterface.fields.ipAddress',
                        )}
                        content={address.V6.ip}
                      />
                    ),
                )}
                <AddressDisplay
                  label={t(
                    'settings.modals.networkInterface.fields.macAddress',
                  )}
                  content={item.mac_addr ?? ''}
=======
                        label={t("Ip Address")}
                        content={address.V6.ip}
                      />
                    )
                )}
                <AddressDisplay
                  label={t("Mac Address")}
                  content={item.mac_addr ?? ""}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                />
              </>
            )}
          </Box>
        </Box>
      ))}
    </BaseDialog>
<<<<<<< HEAD
  )
}

const AddressDisplay = ({
  label,
  content,
}: {
  label: string
  content: string
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '8px 0',
      }}
    >
      <Box>{label}</Box>
      <Box
        sx={({ palette }) => ({
          borderRadius: '8px',
          padding: '2px 2px 2px 8px',
          background:
            palette.mode === 'dark'
=======
  );
});

const AddressDisplay = (props: { label: string; content: string }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "8px 0",
      }}
    >
      <Box>{props.label}</Box>
      <Box
        sx={({ palette }) => ({
          borderRadius: "8px",
          padding: "2px 2px 2px 8px",
          background:
            palette.mode === "dark"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
              ? alpha(palette.background.paper, 0.3)
              : alpha(palette.grey[400], 0.3),
        })}
      >
<<<<<<< HEAD
        <Box sx={{ display: 'inline', userSelect: 'text' }}>{content}</Box>
        <IconButton
          size="small"
          onClick={async () => {
            await writeText(content)
            showNotice.success(
              'shared.feedback.notifications.common.copySuccess',
            )
          }}
        >
          <ContentCopyRounded sx={{ fontSize: '18px' }} />
        </IconButton>
      </Box>
    </Box>
  )
}
=======
        <Box sx={{ display: "inline", userSelect: "text" }}>
          {props.content}
        </Box>
        <IconButton
          size="small"
          onClick={async () => {
            await writeText(props.content);
            Notice.success(t("Copy Success"));
          }}
        >
          <ContentCopyRounded sx={{ fontSize: "18px" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
