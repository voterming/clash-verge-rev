<<<<<<< HEAD
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { IconButton, Fade, SxProps, Theme } from '@mui/material'

interface Props {
  onClick: () => void
  show: boolean
  sx?: SxProps<Theme>
=======
import { IconButton, Fade, SxProps, Theme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface Props {
  onClick: () => void;
  show: boolean;
  sx?: SxProps<Theme>;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}

export const ScrollTopButton = ({ onClick, show, sx }: Props) => {
  return (
    <Fade in={show}>
      <IconButton
        onClick={onClick}
        sx={{
<<<<<<< HEAD
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.1)',
          '&:hover': {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.2)'
                : 'rgba(0,0,0,0.2)',
          },
          visibility: show ? 'visible' : 'hidden',
=======
          position: "absolute",
          bottom: "20px",
          right: "20px",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.2)",
          },
          visibility: show ? "visible" : "hidden",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          ...sx,
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Fade>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
