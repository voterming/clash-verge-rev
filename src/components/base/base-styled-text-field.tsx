<<<<<<< HEAD
import { TextField, type TextFieldProps, styled } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const BaseStyledTextField = styled((props: TextFieldProps) => {
  const { t } = useTranslation()
=======
import { TextField, type TextFieldProps, styled } from "@mui/material";
import { useTranslation } from "react-i18next";

export const BaseStyledTextField = styled((props: TextFieldProps) => {
  const { t } = useTranslation();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <TextField
      autoComplete="new-password"
      hiddenLabel
      fullWidth
      size="small"
      variant="outlined"
      spellCheck="false"
<<<<<<< HEAD
      placeholder={t('shared.placeholders.filter')}
      sx={{ input: { py: 0.65, px: 1.25 } }}
      {...props}
    />
  )
})(({ theme }) => ({
  '& .MuiInputBase-root': {
    background: theme.palette.mode === 'light' ? '#fff' : undefined,
  },
}))
=======
      placeholder={t("Filter conditions")}
      sx={{ input: { py: 0.65, px: 1.25 } }}
      {...props}
    />
  );
})(({ theme }) => ({
  "& .MuiInputBase-root": {
    background: theme.palette.mode === "light" ? "#fff" : undefined,
  },
}));
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
