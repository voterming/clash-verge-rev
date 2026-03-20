<<<<<<< HEAD
=======
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
<<<<<<< HEAD
} from '@mui/material'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseEmpty } from '@/components/base'

interface Props {
  open: boolean
  logInfo: [string, string][]
  onClose: () => void
}

export const LogViewer = (props: Props) => {
  const { open, logInfo, onClose } = props

  const { t } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('profiles.modals.logViewer.title')}</DialogTitle>
=======
} from "@mui/material";
import { BaseEmpty } from "@/components/base";

interface Props {
  open: boolean;
  logInfo: [string, string][];
  onClose: () => void;
}

export const LogViewer = (props: Props) => {
  const { open, logInfo, onClose } = props;

  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Script Console")}</DialogTitle>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

      <DialogContent
        sx={{
          width: 400,
          height: 300,
<<<<<<< HEAD
          overflowX: 'hidden',
          userSelect: 'text',
          pb: 1,
        }}
      >
        {logInfo.map(([level, log]) => (
          <Fragment key={`${level}-${log}`}>
=======
          overflowX: "hidden",
          userSelect: "text",
          pb: 1,
        }}
      >
        {logInfo.map(([level, log], index) => (
          <Fragment key={index.toString()}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            <Typography color="text.secondary" component="div">
              <Chip
                label={level}
                size="small"
                variant="outlined"
                color={
<<<<<<< HEAD
                  level === 'error' || level === 'exception'
                    ? 'error'
                    : 'default'
=======
                  level === "error" || level === "exception"
                    ? "error"
                    : "default"
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                }
                sx={{ mr: 1 }}
              />
              {log}
            </Typography>
            <Divider sx={{ my: 0.5 }} />
          </Fragment>
        ))}

        {logInfo.length === 0 && <BaseEmpty />}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
<<<<<<< HEAD
          {t('shared.actions.close')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
=======
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
