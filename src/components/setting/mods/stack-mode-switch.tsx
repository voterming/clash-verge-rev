<<<<<<< HEAD
import { Button, ButtonGroup } from '@mui/material'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export const StackModeSwitch = (props: Props) => {
  const { value, onChange } = props

  return (
    <ButtonGroup size="small" sx={{ my: '4px' }}>
      <Button
        variant={value?.toLowerCase() === 'system' ? 'contained' : 'outlined'}
        onClick={() => onChange?.('system')}
        sx={{ textTransform: 'capitalize' }}
=======
import { Button, ButtonGroup } from "@mui/material";

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

export const StackModeSwitch = (props: Props) => {
  const { value, onChange } = props;

  return (
    <ButtonGroup size="small" sx={{ my: "4px" }}>
      <Button
        variant={value?.toLowerCase() === "system" ? "contained" : "outlined"}
        onClick={() => onChange?.("system")}
        sx={{ textTransform: "capitalize" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      >
        System
      </Button>
      <Button
<<<<<<< HEAD
        variant={value?.toLowerCase() === 'gvisor' ? 'contained' : 'outlined'}
        onClick={() => onChange?.('gvisor')}
        sx={{ textTransform: 'capitalize' }}
=======
        variant={value?.toLowerCase() === "gvisor" ? "contained" : "outlined"}
        onClick={() => onChange?.("gvisor")}
        sx={{ textTransform: "capitalize" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      >
        gVisor
      </Button>
      <Button
<<<<<<< HEAD
        variant={value?.toLowerCase() === 'mixed' ? 'contained' : 'outlined'}
        onClick={() => onChange?.('mixed')}
        sx={{ textTransform: 'capitalize' }}
=======
        variant={value?.toLowerCase() === "mixed" ? "contained" : "outlined"}
        onClick={() => onChange?.("mixed")}
        sx={{ textTransform: "capitalize" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      >
        Mixed
      </Button>
    </ButtonGroup>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
