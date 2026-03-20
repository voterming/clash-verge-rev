<<<<<<< HEAD
=======
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
<<<<<<< HEAD
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  onConfirm: (passwd: string) => Promise<void>
}

export const PasswordInput = (props: Props) => {
  const { onConfirm } = props

  const { t } = useTranslation()
  const [passwd, setPasswd] = useState('')

  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <DialogTitle>
        {t('settings.modals.password.prompts.enterRoot')}
      </DialogTitle>
=======
} from "@mui/material";

interface Props {
  onConfirm: (passwd: string) => Promise<void>;
}

export const PasswordInput = (props: Props) => {
  const { onConfirm } = props;

  const { t } = useTranslation();
  const [passwd, setPasswd] = useState("");

  useEffect(() => {
    if (!open) return;
  }, [open]);

  return (
    <Dialog open={true} maxWidth="xs" fullWidth>
      <DialogTitle>{t("Please enter your root password")}</DialogTitle>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

      <DialogContent>
        <TextField
          sx={{ mt: 1 }}
          autoFocus
<<<<<<< HEAD
          label={t('shared.labels.password')}
=======
          label={t("Password")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          fullWidth
          size="small"
          type="password"
          value={passwd}
<<<<<<< HEAD
          onKeyDown={(e) => e.key === 'Enter' && onConfirm(passwd)}
=======
          onKeyDown={(e) => e.key === "Enter" && onConfirm(passwd)}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          onChange={(e) => setPasswd(e.target.value)}
        ></TextField>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={async () => await onConfirm(passwd)}
          variant="contained"
        >
<<<<<<< HEAD
          {t('shared.actions.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
=======
          {t("Confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
