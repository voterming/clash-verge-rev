<<<<<<< HEAD
import { Box, Button, LinearProgress } from '@mui/material'
import { relaunch } from '@tauri-apps/plugin-process'
import { open as openUrl } from '@tauri-apps/plugin-shell'
import type { DownloadEvent } from '@tauri-apps/plugin-updater'
import { useLockFn } from 'ahooks'
import type { Ref } from 'react'
import { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { BaseDialog, DialogRef } from '@/components/base'
import { useUpdate } from '@/hooks/use-update'
import { portableFlag } from '@/pages/_layout'
import { showNotice } from '@/services/notice-service'
import { useSetUpdateState, useUpdateState } from '@/services/states'

export function UpdateViewer({ ref }: { ref?: Ref<DialogRef> }) {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const updateState = useUpdateState()
  const setUpdateState = useSetUpdateState()

  const { updateInfo } = useUpdate()

  const [downloaded, setDownloaded] = useState(0)
  const [total, setTotal] = useState(0)
  const downloadedRef = useRef(0)
  const totalRef = useRef(0)

  const progress = useMemo(() => {
    if (total <= 0) return 0
    return Math.min((downloaded / total) * 100, 100)
  }, [downloaded, total])
=======
import useSWR from "swr";
import { forwardRef, useImperativeHandle, useState, useMemo } from "react";
import { useLockFn } from "ahooks";
import { Box, LinearProgress, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { relaunch } from "@tauri-apps/plugin-process";
import { check as checkUpdate } from "@tauri-apps/plugin-updater";
import { BaseDialog, DialogRef, Notice } from "@/components/base";
import { useUpdateState, useSetUpdateState } from "@/services/states";
import { Event, UnlistenFn } from "@tauri-apps/api/event";
import { portableFlag } from "@/pages/_layout";
import { open as openUrl } from "@tauri-apps/plugin-shell";
import ReactMarkdown from "react-markdown";
import { useListen } from "@/hooks/use-listen";

let eventListener: UnlistenFn | null = null;

export const UpdateViewer = forwardRef<DialogRef>((props, ref) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const updateState = useUpdateState();
  const setUpdateState = useSetUpdateState();
  const { addListener } = useListen();

  const { data: updateInfo } = useSWR("checkUpdate", checkUpdate, {
    errorRetryCount: 2,
    revalidateIfStale: false,
    focusThrottleInterval: 36e5, // 1 hour
  });

  const [downloaded, setDownloaded] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [total, setTotal] = useState(0);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
<<<<<<< HEAD
  }))

  const markdownContent = useMemo(() => {
    if (!updateInfo?.body) {
      return 'New Version is available'
    }
    return updateInfo?.body
  }, [updateInfo])

  const breakChangeFlag = useMemo(() => {
    if (!updateInfo?.body) {
      return false
    }
    return updateInfo?.body.toLowerCase().includes('break change')
  }, [updateInfo])

  const onUpdate = useLockFn(async () => {
    if (portableFlag) {
      showNotice.error('settings.modals.update.messages.portableError')
      return
    }
    if (!updateInfo?.body) return
    if (breakChangeFlag) {
      showNotice.error('settings.modals.update.messages.breakChangeError')
      return
    }
    if (updateState) return
    setUpdateState(true)
    setDownloaded(0)
    setTotal(0)
    downloadedRef.current = 0
    totalRef.current = 0

    const onDownloadEvent = (event: DownloadEvent) => {
      if (event.event === 'Started') {
        const contentLength = event.data.contentLength ?? 0
        totalRef.current = contentLength
        setTotal(contentLength)
        setDownloaded(0)
        downloadedRef.current = 0
        return
      }

      if (event.event === 'Progress') {
        setDownloaded((prev) => {
          const next = prev + event.data.chunkLength
          downloadedRef.current = next
          return next
        })
      }

      if (event.event === 'Finished' && totalRef.current === 0) {
        totalRef.current = downloadedRef.current
        setTotal(downloadedRef.current)
      }
    }

    try {
      await updateInfo.downloadAndInstall(onDownloadEvent)
      await relaunch()
    } catch (err: any) {
      showNotice.error(err)
    } finally {
      setUpdateState(false)
      setDownloaded(0)
      setTotal(0)
      downloadedRef.current = 0
      totalRef.current = 0
    }
  })
=======
  }));

  const markdownContent = useMemo(() => {
    if (!updateInfo?.body) {
      return "New Version is available";
    }
    return updateInfo?.body;
  }, [updateInfo]);

  const breakChangeFlag = useMemo(() => {
    if (!updateInfo?.body) {
      return false;
    }
    return updateInfo?.body.toLowerCase().includes("break change");
  }, [updateInfo]);

  const onUpdate = useLockFn(async () => {
    if (portableFlag) {
      Notice.error(t("Portable Updater Error"));
      return;
    }
    if (!updateInfo?.body) return;
    if (breakChangeFlag) {
      Notice.error(t("Break Change Update Error"));
      return;
    }
    if (updateState) return;
    setUpdateState(true);
    if (eventListener !== null) {
      eventListener();
    }
    eventListener = await addListener(
      "tauri://update-download-progress",
      (e: Event<any>) => {
        setTotal(e.payload.contentLength);
        setBuffer(e.payload.chunkLength);
        setDownloaded((a) => {
          return a + e.payload.chunkLength;
        });
      },
    );
    try {
      await updateInfo.downloadAndInstall();
      await relaunch();
    } catch (err: any) {
      Notice.error(err?.message || err.toString());
    } finally {
      setUpdateState(false);
    }
  });
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <BaseDialog
      open={open}
      title={
        <Box display="flex" justifyContent="space-between">
<<<<<<< HEAD
          {t('settings.modals.update.title', {
            version: updateInfo?.version ?? '',
          })}
=======
          {`New Version v${updateInfo?.version}`}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          <Box>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                openUrl(
                  `https://github.com/clash-verge-rev/clash-verge-rev/releases/tag/v${updateInfo?.version}`,
<<<<<<< HEAD
                )
              }}
            >
              {t('settings.modals.update.actions.goToRelease')}
=======
                );
              }}
            >
              {t("Go to Release Page")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            </Button>
          </Box>
        </Box>
      }
<<<<<<< HEAD
      contentSx={{ minWidth: 360, maxWidth: 400, height: '50vh' }}
      okBtn={t('settings.modals.update.actions.update')}
      cancelBtn={t('shared.actions.cancel')}
=======
      contentSx={{ minWidth: 360, maxWidth: 400, height: "50vh" }}
      okBtn={t("Update")}
      cancelBtn={t("Cancel")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      onOk={onUpdate}
    >
<<<<<<< HEAD
      <Box sx={{ height: 'calc(100% - 10px)', overflow: 'auto' }}>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ ...props }) => {
              const { children } = props
=======
      <Box sx={{ height: "calc(100% - 10px)", overflow: "auto" }}>
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => {
              const { children } = props;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
              return (
                <a {...props} target="_blank">
                  {children}
                </a>
<<<<<<< HEAD
              )
=======
              );
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            },
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </Box>
      {updateState && (
        <LinearProgress
<<<<<<< HEAD
          variant={total > 0 ? 'determinate' : 'indeterminate'}
          value={progress}
          sx={{ marginTop: '5px' }}
        />
      )}
    </BaseDialog>
  )
}
=======
          variant="buffer"
          value={(downloaded / total) * 100}
          valueBuffer={buffer}
          sx={{ marginTop: "5px" }}
        />
      )}
    </BaseDialog>
  );
});
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
