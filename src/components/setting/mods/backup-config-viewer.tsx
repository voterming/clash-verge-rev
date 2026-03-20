<<<<<<< HEAD
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  TextField,
  Button,
  Grid,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { useLockFn } from 'ahooks'
import { useState, useRef, memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useVerge } from '@/hooks/use-verge'
import { saveWebdavConfig, createWebdavBackup } from '@/services/cmds'
import { showNotice } from '@/services/notice-service'
import {
  buildWebdavSignature,
  getWebdavStatus,
  setWebdavStatus,
} from '@/services/webdav-status'
import { isValidUrl } from '@/utils/network'

interface BackupConfigViewerProps {
  onBackupSuccess: () => Promise<void>
  onSaveSuccess: (signature?: string) => Promise<void>
  onRefresh: () => Promise<void>
  onInit: () => Promise<void>
  setLoading: (loading: boolean) => void
=======
import { useState, useRef, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useVerge } from "@/hooks/use-verge";
import { Notice } from "@/components/base";
import { isValidUrl } from "@/utils/helper";
import { useLockFn } from "ahooks";
import {
  TextField,
  Button,
  Grid2,
  Box,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { saveWebdavConfig, createWebdavBackup } from "@/services/cmds";

export interface BackupConfigViewerProps {
  onBackupSuccess: () => Promise<void>;
  onSaveSuccess: () => Promise<void>;
  onRefresh: () => Promise<void>;
  onInit: () => Promise<void>;
  setLoading: (loading: boolean) => void;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}

export const BackupConfigViewer = memo(
  ({
    onBackupSuccess,
    onSaveSuccess,
    onRefresh,
    onInit,
    setLoading,
  }: BackupConfigViewerProps) => {
<<<<<<< HEAD
    const { t } = useTranslation()
    const { verge, mutateVerge } = useVerge()
    const { webdav_url, webdav_username, webdav_password } = verge || {}
    const [showPassword, setShowPassword] = useState(false)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const urlRef = useRef<HTMLInputElement>(null)
=======
    const { t } = useTranslation();
    const { verge } = useVerge();
    const { webdav_url, webdav_username, webdav_password } = verge || {};
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    const { register, handleSubmit, watch } = useForm<IWebDavConfig>({
      defaultValues: {
        url: webdav_url,
        username: webdav_username,
        password: webdav_password,
      },
<<<<<<< HEAD
    })
    const url = watch('url')
    const username = watch('username')
    const password = watch('password')
=======
    });
    const url = watch("url");
    const username = watch("username");
    const password = watch("password");
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

    const webdavChanged =
      webdav_url !== url ||
      webdav_username !== username ||
<<<<<<< HEAD
      webdav_password !== password

    const webdavSignature = buildWebdavSignature(verge)
    const webdavStatus = getWebdavStatus(webdavSignature)
    const shouldAutoInit = webdavStatus !== 'failed'

    const handleClickShowPassword = () => {
      setShowPassword((prev) => !prev)
    }

    useEffect(() => {
      if (!webdav_url || !webdav_username || !webdav_password) {
        return
      }
      if (!shouldAutoInit) {
        return
      }
      void onInit()
    }, [webdav_url, webdav_username, webdav_password, onInit, shouldAutoInit])

    const checkForm = () => {
      const username = usernameRef.current?.value
      const password = passwordRef.current?.value
      const url = urlRef.current?.value

      if (!url) {
        urlRef.current?.focus()
        showNotice.error('settings.modals.backup.messages.webdavUrlRequired')
        throw new Error(t('settings.modals.backup.messages.webdavUrlRequired'))
      } else if (!isValidUrl(url)) {
        urlRef.current?.focus()
        showNotice.error('settings.modals.backup.messages.invalidWebdavUrl')
        throw new Error(t('settings.modals.backup.messages.invalidWebdavUrl'))
      }
      if (!username) {
        usernameRef.current?.focus()
        showNotice.error('settings.modals.backup.messages.usernameRequired')
        throw new Error(t('settings.modals.backup.messages.usernameRequired'))
      }
      if (!password) {
        passwordRef.current?.focus()
        showNotice.error('settings.modals.backup.messages.passwordRequired')
        throw new Error(t('settings.modals.backup.messages.passwordRequired'))
      }
    }

    const save = useLockFn(async (data: IWebDavConfig) => {
      checkForm()
      const signature = buildWebdavSignature({
        webdav_url: data.url,
        webdav_username: data.username,
        webdav_password: data.password,
      })
      const trimmedUrl = data.url.trim()
      const trimmedUsername = data.username.trim()

      try {
        setLoading(true)
        await saveWebdavConfig(trimmedUrl, trimmedUsername, data.password)
        await mutateVerge(
          (current) =>
            current
              ? {
                  ...current,
                  webdav_url: trimmedUrl,
                  webdav_username: trimmedUsername,
                  webdav_password: data.password,
                }
              : current,
          false,
        )
        setWebdavStatus(signature, 'unknown')
        showNotice.success('settings.modals.backup.messages.webdavConfigSaved')
        await onSaveSuccess(signature)
      } catch (error) {
        showNotice.error(
          'settings.modals.backup.messages.webdavConfigSaveFailed',
          { error },
          3000,
        )
      } finally {
        setLoading(false)
      }
    })

    const handleBackup = useLockFn(async () => {
      checkForm()
      const signature = buildWebdavSignature({
        webdav_url: url,
        webdav_username: username,
        webdav_password: password,
      })

      try {
        setLoading(true)
        await createWebdavBackup().then(async () => {
          showNotice.success('settings.modals.backup.messages.backupCreated')
          await onBackupSuccess()
        })
        setWebdavStatus(signature, 'ready')
      } catch (error) {
        showNotice.error('settings.modals.backup.messages.backupFailed', {
          error,
        })
        setWebdavStatus(signature, 'failed')
      } finally {
        setLoading(false)
      }
    })

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 9 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label={t('settings.modals.backup.fields.webdavUrl')}
                  variant="outlined"
                  size="small"
                  {...register('url')}
=======
      webdav_password !== password;

    console.log(
      "webdavChanged",
      webdavChanged,
      webdav_url,
      webdav_username,
      webdav_password,
    );

    const handleClickShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    useEffect(() => {
      if (webdav_url && webdav_username && webdav_password) {
        onInit();
      }
    }, []);

    const checkForm = () => {
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      const url = urlRef.current?.value;

      if (!url) {
        urlRef.current?.focus();
        Notice.error(t("WebDAV URL Required"));
        throw new Error(t("WebDAV URL Required"));
      } else if (!isValidUrl(url)) {
        urlRef.current?.focus();
        Notice.error(t("Invalid WebDAV URL"));
        throw new Error(t("Invalid WebDAV URL"));
      }
      if (!username) {
        usernameRef.current?.focus();
        Notice.error(t("WebDAV URL Required"));
        throw new Error(t("Username Required"));
      }
      if (!password) {
        passwordRef.current?.focus();
        Notice.error(t("WebDAV URL Required"));
        throw new Error(t("Password Required"));
      }
    };

    const save = useLockFn(async (data: IWebDavConfig) => {
      checkForm();
      try {
        setLoading(true);
        await saveWebdavConfig(
          data.url.trim(),
          data.username.trim(),
          data.password,
        ).then(() => {
          Notice.success(t("WebDAV Config Saved"));
          onSaveSuccess();
        });
      } catch (error) {
        Notice.error(t("WebDAV Config Save Failed", { error }), 3000);
      } finally {
        setLoading(false);
      }
    });

    const handleBackup = useLockFn(async () => {
      checkForm();
      try {
        setLoading(true);
        await createWebdavBackup().then(async () => {
          await onBackupSuccess();
          Notice.success(t("Backup Created"));
        });
      } catch (error) {
        Notice.error(t("Backup Failed", { error }));
      } finally {
        setLoading(false);
      }
    });

    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 9 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label={t("WebDAV Server URL")}
                  variant="outlined"
                  size="small"
                  {...register("url")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  inputRef={urlRef}
<<<<<<< HEAD
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label={t('settings.modals.backup.fields.username')}
                  variant="outlined"
                  size="small"
                  {...register('username')}
=======
                />
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  label={t("Username")}
                  variant="outlined"
                  size="small"
                  {...register("username")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  inputRef={usernameRef}
                />
<<<<<<< HEAD
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  label={t('shared.labels.password')}
                  type={showPassword ? 'text' : 'password'}
=======
              </Grid2>
              <Grid2 size={{ xs: 6 }}>
                <TextField
                  label={t("Password")}
                  type={showPassword ? "text" : "password"}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                  variant="outlined"
                  size="small"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  inputRef={passwordRef}
<<<<<<< HEAD
                  {...register('password')}
=======
                  {...register("password")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
<<<<<<< HEAD
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
=======
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
<<<<<<< HEAD
              sx={{ height: '100%' }}
=======
              sx={{ height: "100%" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            >
              {webdavChanged ||
              webdav_url === undefined ||
              webdav_username === undefined ||
              webdav_password === undefined ? (
                <Button
                  variant="contained"
<<<<<<< HEAD
                  color={'primary'}
                  sx={{ height: '100%' }}
                  type="button"
                  onClick={handleSubmit(save)}
                >
                  {t('shared.actions.save')}
=======
                  color={"primary"}
                  sx={{ height: "100%" }}
                  type="button"
                  onClick={handleSubmit(save)}
                >
                  {t("Save")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleBackup}
                    type="button"
                    size="large"
                  >
<<<<<<< HEAD
                    {t('settings.modals.backup.actions.backup')}
=======
                    {t("Backup")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={onRefresh}
                    type="button"
                    size="large"
                  >
<<<<<<< HEAD
                    {t('shared.actions.refresh')}
=======
                    {t("Refresh")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                  </Button>
                </>
              )}
            </Stack>
<<<<<<< HEAD
          </Grid>
        </Grid>
      </form>
    )
  },
)
=======
          </Grid2>
        </Grid2>
      </form>
    );
  },
);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
