<<<<<<< HEAD
=======
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
<<<<<<< HEAD
} from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  open: boolean
  title: string
  message: string
  onClose: () => void
  onConfirm: () => void
}

export const ConfirmViewer = (props: Props) => {
  const { open, title, message, onClose, onConfirm } = props

  const { t } = useTranslation()

  useEffect(() => {
    if (!open) return
  }, [open])
=======
} from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmViewer = (props: Props) => {
  const { open, title, message, onClose, onConfirm } = props;

  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
  }, [open]);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

<<<<<<< HEAD
      <DialogContent sx={{ pb: 1, userSelect: 'text' }}>
=======
      <DialogContent sx={{ pb: 1, userSelect: "text" }}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        {message}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
<<<<<<< HEAD
          {t('shared.actions.cancel')}
        </Button>
        <Button onClick={onConfirm} variant="contained">
          {t('shared.actions.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
=======
          {t("Cancel")}
        </Button>
        <Button onClick={onConfirm} variant="contained">
          {t("Confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
