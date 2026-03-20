<<<<<<< HEAD
import { Box, CircularProgress } from '@mui/material'
import React from 'react'

interface BaseLoadingOverlayProps {
  isLoading: boolean
=======
import React from "react";
import { Box, CircularProgress } from "@mui/material";

export interface BaseLoadingOverlayProps {
  isLoading: boolean;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}

export const BaseLoadingOverlay: React.FC<BaseLoadingOverlayProps> = ({
  isLoading,
}) => {
<<<<<<< HEAD
  if (!isLoading) return null
=======
  if (!isLoading) return null;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <Box
      sx={{
<<<<<<< HEAD
        position: 'absolute',
=======
        position: "absolute",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
<<<<<<< HEAD
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Respect current theme; avoid bright flash in dark mode
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(255, 255, 255, 0.7)',
=======
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        zIndex: 1000,
      }}
    >
      <CircularProgress />
    </Box>
<<<<<<< HEAD
  )
}
=======
  );
};

export default BaseLoadingOverlay;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
