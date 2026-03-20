<<<<<<< HEAD
import { LoadingButton } from '@mui/lab'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { open as openDialog } from '@tauri-apps/plugin-dialog'
import { useLockFn } from 'ahooks'
import type { ReactNode, Ref } from 'react'
import { useCallback, useImperativeHandle, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseDialog, DialogRef } from '@/components/base'
import { useVerge } from '@/hooks/use-verge'
import {
  createLocalBackup,
  createWebdavBackup,
  importLocalBackup,
} from '@/services/cmds'
import { showNotice } from '@/services/notice-service'
import { buildWebdavSignature, setWebdavStatus } from '@/services/webdav-status'

import { AutoBackupSettings } from './auto-backup-settings'
import { BackupHistoryViewer } from './backup-history-viewer'
import { BackupWebdavDialog } from './backup-webdav-dialog'

type BackupSource = 'local' | 'webdav'

export function BackupViewer({ ref }: { ref?: Ref<DialogRef> }) {
  const { t } = useTranslation()
  const { verge } = useVerge()
  const [open, setOpen] = useState(false)
  const [busyAction, setBusyAction] = useState<BackupSource | null>(null)
  const [localImporting, setLocalImporting] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [historySource, setHistorySource] = useState<BackupSource>('local')
  const [historyPage, setHistoryPage] = useState(0)
  const [webdavDialogOpen, setWebdavDialogOpen] = useState(false)
  const webdavSignature = buildWebdavSignature(verge)

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }))

  const openHistory = (target: BackupSource) => {
    setHistorySource(target)
    setHistoryPage(0)
    setHistoryOpen(true)
  }

  const handleBackup = useLockFn(async (target: BackupSource) => {
    try {
      setBusyAction(target)
      if (target === 'local') {
        await createLocalBackup()
        showNotice.success('settings.modals.backup.messages.localBackupCreated')
      } else {
        await createWebdavBackup()
        showNotice.success('settings.modals.backup.messages.backupCreated')
        setWebdavStatus(webdavSignature, 'ready')
      }
    } catch (error) {
      console.error(error)
      showNotice.error(
        target === 'local'
          ? 'settings.modals.backup.messages.localBackupFailed'
          : 'settings.modals.backup.messages.backupFailed',
        target === 'local' ? undefined : { error },
      )
      if (target === 'webdav') {
        setWebdavStatus(webdavSignature, 'failed')
      }
    } finally {
      setBusyAction(null)
    }
  })

  const handleImport = useLockFn(async () => {
    const selected = await openDialog({
      multiple: false,
      filters: [{ name: 'Backup File', extensions: ['zip'] }],
    })
    if (!selected || Array.isArray(selected)) return
    try {
      setLocalImporting(true)
      await importLocalBackup(selected)
      showNotice.success('settings.modals.backup.messages.localBackupImported')
      openHistory('local')
    } catch (error) {
      console.error(error)
      showNotice.error(
        'settings.modals.backup.messages.localBackupImportFailed',
        { error },
      )
    } finally {
      setLocalImporting(false)
    }
  })

  const setWebdavBusy = useCallback(
    (loading: boolean) => {
      setBusyAction(loading ? 'webdav' : null)
    },
    [setBusyAction],
  )

  const isLocalBusy = busyAction === 'local' || localImporting
=======
import {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import { BaseDialog, DialogRef } from "@/components/base";
import getSystem from "@/utils/get-system";
import { BaseLoadingOverlay } from "@/components/base";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  BackupTableViewer,
  BackupFile,
  DEFAULT_ROWS_PER_PAGE,
} from "./backup-table-viewer";
import { BackupConfigViewer } from "./backup-config-viewer";
import { Box, Paper, Divider } from "@mui/material";
import { listWebDavBackup } from "@/services/cmds";
dayjs.extend(customParseFormat);

const DATE_FORMAT = "YYYY-MM-DD_HH-mm-ss";
const FILENAME_PATTERN = /\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}/;

export const BackupViewer = forwardRef<DialogRef>((props, ref) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [backupFiles, setBackupFiles] = useState<BackupFile[]>([]);
  const [dataSource, setDataSource] = useState<BackupFile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const OS = getSystem();

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
    },
    close: () => setOpen(false),
  }));

  // Handle page change
  const handleChangePage = useCallback(
    (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
      setPage(page);
    },
    [],
  );

  const fetchAndSetBackupFiles = async () => {
    try {
      setIsLoading(true);
      const files = await getAllBackupFiles();
      setBackupFiles(files);
      setTotal(files.length);
    } catch (error) {
      setBackupFiles([]);
      setTotal(0);
      console.error(error);
      // Notice.error(t("Failed to fetch backup files"));
    } finally {
      setIsLoading(false);
    }
  };

  const getAllBackupFiles = async () => {
    const files = await listWebDavBackup();
    return files
      .map((file) => {
        const platform = file.filename.split("-")[0];
        const fileBackupTimeStr = file.filename.match(FILENAME_PATTERN)!;

        if (fileBackupTimeStr === null) {
          return null;
        }

        const backupTime = dayjs(fileBackupTimeStr[0], DATE_FORMAT);
        const allowApply = OS === platform;
        return {
          ...file,
          platform,
          backup_time: backupTime,
          allow_apply: allowApply,
        } as BackupFile;
      })
      .filter((item) => item !== null)
      .sort((a, b) => (a.backup_time.isAfter(b.backup_time) ? -1 : 1));
  };

  useEffect(() => {
    setDataSource(
      backupFiles.slice(
        page * DEFAULT_ROWS_PER_PAGE,
        page * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
      ),
    );
  }, [page, backupFiles]);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <BaseDialog
      open={open}
<<<<<<< HEAD
      title={t('settings.modals.backup.title')}
      contentSx={{ width: { xs: 360, sm: 520 } }}
      disableOk
      cancelBtn={t('shared.actions.close')}
      onCancel={() => setOpen(false)}
      onClose={() => setOpen(false)}
    >
      <Stack spacing={2}>
        <Stack
          spacing={1}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography variant="subtitle1">
            {t('settings.modals.backup.auto.title')}
          </Typography>
          <List disablePadding sx={{ '.MuiListItem-root': { px: 0 } }}>
            <AutoBackupSettings />
          </List>
        </Stack>

        <Stack
          spacing={1}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography variant="subtitle1">
            {t('settings.modals.backup.manual.title')}
          </Typography>
          <List disablePadding sx={{ '.MuiListItem-root': { px: 0 } }}>
            {(
              [
                {
                  key: 'local' as BackupSource,
                  title: t('settings.modals.backup.tabs.local'),
                  description: t('settings.modals.backup.manual.local'),
                  actions: [
                    <LoadingButton
                      key="backup"
                      variant="contained"
                      size="small"
                      loading={busyAction === 'local'}
                      disabled={localImporting}
                      onClick={() => handleBackup('local')}
                    >
                      {t('settings.modals.backup.actions.backup')}
                    </LoadingButton>,
                    <Button
                      key="history"
                      variant="outlined"
                      size="small"
                      disabled={isLocalBusy}
                      onClick={() => openHistory('local')}
                    >
                      {t('settings.modals.backup.actions.viewHistory')}
                    </Button>,
                    <LoadingButton
                      key="import"
                      variant="text"
                      size="small"
                      loading={localImporting}
                      disabled={busyAction === 'local'}
                      onClick={() => handleImport()}
                    >
                      {t('settings.modals.backup.actions.importBackup')}
                    </LoadingButton>,
                  ],
                },
                {
                  key: 'webdav' as BackupSource,
                  title: t('settings.modals.backup.tabs.webdav'),
                  description: t('settings.modals.backup.manual.webdav'),
                  actions: [
                    <LoadingButton
                      key="backup"
                      variant="contained"
                      size="small"
                      loading={busyAction === 'webdav'}
                      onClick={() => handleBackup('webdav')}
                    >
                      {t('settings.modals.backup.actions.backup')}
                    </LoadingButton>,
                    <Button
                      key="history"
                      variant="outlined"
                      size="small"
                      onClick={() => openHistory('webdav')}
                    >
                      {t('settings.modals.backup.actions.viewHistory')}
                    </Button>,
                    <Button
                      key="configure"
                      variant="text"
                      size="small"
                      onClick={() => setWebdavDialogOpen(true)}
                    >
                      {t('settings.modals.backup.manual.configureWebdav')}
                    </Button>,
                  ],
                },
              ] satisfies Array<{
                key: BackupSource
                title: string
                description: string
                actions: ReactNode[]
              }>
            ).map((item, idx) => (
              <ListItem key={item.key} disableGutters divider={idx === 0}>
                <Stack spacing={1} sx={{ width: '100%' }}>
                  <ListItemText
                    primary={item.title}
                    slotProps={{ secondary: { component: 'span' } }}
                    secondary={item.description}
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                    alignItems="center"
                  >
                    {item.actions}
                  </Stack>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>

      <BackupHistoryViewer
        open={historyOpen}
        source={historySource}
        page={historyPage}
        onSourceChange={setHistorySource}
        onPageChange={setHistoryPage}
        onClose={() => setHistoryOpen(false)}
      />
      <BackupWebdavDialog
        open={webdavDialogOpen}
        onClose={() => setWebdavDialogOpen(false)}
        onBackupSuccess={() => openHistory('webdav')}
        setBusy={setWebdavBusy}
      />
    </BaseDialog>
  )
}
=======
      title={t("Backup Setting")}
      // contentSx={{ width: 600, maxHeight: 800 }}
      okBtn={t("")}
      cancelBtn={t("Close")}
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      disableOk
    >
      <Box>
        <BaseLoadingOverlay isLoading={isLoading} />
        <Paper elevation={2} sx={{ padding: 2 }}>
          <BackupConfigViewer
            setLoading={setIsLoading}
            onBackupSuccess={async () => {
              fetchAndSetBackupFiles();
            }}
            onSaveSuccess={async () => {
              fetchAndSetBackupFiles();
            }}
            onRefresh={async () => {
              fetchAndSetBackupFiles();
            }}
            onInit={async () => {
              fetchAndSetBackupFiles();
            }}
          />
          <Divider sx={{ marginY: 2 }} />
          <BackupTableViewer
            datasource={dataSource}
            page={page}
            onPageChange={handleChangePage}
            total={total}
            onRefresh={fetchAndSetBackupFiles}
          />
        </Paper>
      </Box>
    </BaseDialog>
  );
});
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
