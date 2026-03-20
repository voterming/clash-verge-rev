<<<<<<< HEAD
import { LoadingButton } from '@mui/lab'
=======
import { ReactNode } from "react";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  type SxProps,
  type Theme,
<<<<<<< HEAD
} from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  title: ReactNode
  open: boolean
  okBtn?: ReactNode
  cancelBtn?: ReactNode
  disableEnforceFocus?: boolean
  disableOk?: boolean
  disableCancel?: boolean
  disableFooter?: boolean
  contentSx?: SxProps<Theme>
  children?: ReactNode
  loading?: boolean
  onOk?: () => void
  onCancel?: () => void
  onClose?: () => void
}

export interface DialogRef {
  open: () => void
  close: () => void
}

export const BaseDialog: React.FC<Props> = ({
  open,
  title,
  children,
  okBtn,
  cancelBtn,
  disableEnforceFocus,
  contentSx,
  disableCancel,
  disableOk,
  disableFooter,
  loading,
  onOk,
  onCancel,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEnforceFocus={disableEnforceFocus}
    >
=======
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface Props {
  title: ReactNode;
  open: boolean;
  okBtn?: ReactNode;
  cancelBtn?: ReactNode;
  disableOk?: boolean;
  disableCancel?: boolean;
  disableFooter?: boolean;
  contentSx?: SxProps<Theme>;
  children?: ReactNode;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface DialogRef {
  open: () => void;
  close: () => void;
}

export const BaseDialog: React.FC<Props> = (props) => {
  const {
    open,
    title,
    children,
    okBtn,
    cancelBtn,
    contentSx,
    disableCancel,
    disableOk,
    disableFooter,
    loading,
  } = props;

  return (
    <Dialog open={open} onClose={props.onClose}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      <DialogTitle>{title}</DialogTitle>

      <DialogContent sx={contentSx}>{children}</DialogContent>

      {!disableFooter && (
        <DialogActions>
          {!disableCancel && (
<<<<<<< HEAD
            <Button variant="outlined" onClick={onCancel}>
=======
            <Button variant="outlined" onClick={props.onCancel}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
              {cancelBtn}
            </Button>
          )}
          {!disableOk && (
<<<<<<< HEAD
            <LoadingButton loading={loading} variant="contained" onClick={onOk}>
=======
            <LoadingButton
              loading={loading}
              variant="contained"
              onClick={props.onOk}
            >
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
              {okBtn}
            </LoadingButton>
          )}
        </DialogActions>
      )}
    </Dialog>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
