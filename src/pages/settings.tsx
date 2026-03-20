<<<<<<< HEAD
import { GitHub, HelpOutlineRounded, Telegram } from '@mui/icons-material'
import { Box, ButtonGroup, IconButton, Grid } from '@mui/material'
import { useLockFn } from 'ahooks'
import { useTranslation } from 'react-i18next'

import { BasePage } from '@/components/base'
import SettingClash from '@/components/setting/setting-clash'
import SettingSystem from '@/components/setting/setting-system'
import SettingVergeAdvanced from '@/components/setting/setting-verge-advanced'
import SettingVergeBasic from '@/components/setting/setting-verge-basic'
import { openWebUrl } from '@/services/cmds'
import { showNotice } from '@/services/notice-service'
import { useThemeMode } from '@/services/states'

const SettingPage = () => {
  const { t } = useTranslation()

  const onError = (err: any) => {
    showNotice.error(err)
  }

  const toGithubRepo = useLockFn(() => {
    return openWebUrl('https://github.com/clash-verge-rev/clash-verge-rev')
  })

  const toGithubDoc = useLockFn(() => {
    return openWebUrl('https://clash-verge-rev.github.io/index.html')
  })

  const toTelegramChannel = useLockFn(() => {
    return openWebUrl('https://t.me/clash_verge_re')
  })

  const mode = useThemeMode()
  const isDark = mode === 'light' ? false : true

  return (
    <BasePage
      title={t('settings.page.title')}
=======
import { Box, ButtonGroup, Grid, IconButton } from "@mui/material";
import { useLockFn } from "ahooks";
import { useTranslation } from "react-i18next";
import { BasePage, Notice } from "@/components/base";
import { GitHub, HelpOutlineRounded, Telegram } from "@mui/icons-material";
import { openWebUrl } from "@/services/cmds";
import SettingVerge from "@/components/setting/setting-verge";
import SettingClash from "@/components/setting/setting-clash";
import SettingSystem from "@/components/setting/setting-system";
import { useThemeMode } from "@/services/states";

const SettingPage = () => {
  const { t } = useTranslation();

  const onError = (err: any) => {
    Notice.error(err?.message || err.toString());
  };

  const toGithubRepo = useLockFn(() => {
    return openWebUrl("https://github.com/clash-verge-rev/clash-verge-rev");
  });

  const toGithubDoc = useLockFn(() => {
    return openWebUrl("https://clash-verge-rev.github.io/index.html");
  });

  const toTelegramChannel = useLockFn(() => {
    return openWebUrl("https://t.me/clash_verge_re");
  });

  const mode = useThemeMode();
  const isDark = mode === "light" ? false : true;

  return (
    <BasePage
      title={t("Settings")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      header={
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <IconButton
            size="medium"
            color="inherit"
<<<<<<< HEAD
            title={t('settings.page.actions.manual')}
=======
            title={t("Manual")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            onClick={toGithubDoc}
          >
            <HelpOutlineRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            size="medium"
            color="inherit"
<<<<<<< HEAD
            title={t('settings.page.actions.telegram')}
=======
            title={t("TG Channel")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            onClick={toTelegramChannel}
          >
            <Telegram fontSize="inherit" />
          </IconButton>

          <IconButton
            size="medium"
            color="inherit"
<<<<<<< HEAD
            title={t('settings.page.actions.github')}
=======
            title={t("Github Repo")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            onClick={toGithubRepo}
          >
            <GitHub fontSize="inherit" />
          </IconButton>
        </ButtonGroup>
      }
    >
<<<<<<< HEAD
      <Grid container spacing={1.5} columns={{ xs: 6, sm: 6, md: 12 }}>
        <Grid size={6}>
=======
      <Grid container spacing={{ xs: 1.5, lg: 1.5 }}>
        <Grid item xs={12} md={6}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          <Box
            sx={{
              borderRadius: 2,
              marginBottom: 1.5,
<<<<<<< HEAD
              backgroundColor: isDark ? '#282a36' : '#ffffff',
=======
              backgroundColor: isDark ? "#282a36" : "#ffffff",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }}
          >
            <SettingSystem onError={onError} />
          </Box>
          <Box
            sx={{
              borderRadius: 2,
<<<<<<< HEAD
              backgroundColor: isDark ? '#282a36' : '#ffffff',
=======
              backgroundColor: isDark ? "#282a36" : "#ffffff",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }}
          >
            <SettingClash onError={onError} />
          </Box>
        </Grid>
<<<<<<< HEAD
        <Grid size={6}>
          <Box
            sx={{
              borderRadius: 2,
              marginBottom: 1.5,
              backgroundColor: isDark ? '#282a36' : '#ffffff',
            }}
          >
            <SettingVergeBasic onError={onError} />
          </Box>
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: isDark ? '#282a36' : '#ffffff',
            }}
          >
            <SettingVergeAdvanced onError={onError} />
=======
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 2,
              backgroundColor: isDark ? "#282a36" : "#ffffff",
            }}
          >
            <SettingVerge onError={onError} />
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </Box>
        </Grid>
      </Grid>
    </BasePage>
<<<<<<< HEAD
  )
}

export default SettingPage
=======
  );
};

export default SettingPage;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
