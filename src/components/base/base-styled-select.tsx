<<<<<<< HEAD
import { Select, SelectProps, styled } from '@mui/material'
=======
import { Select, SelectProps, styled } from "@mui/material";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

export const BaseStyledSelect = styled((props: SelectProps<string>) => {
  return (
    <Select
      size="small"
      autoComplete="new-password"
      sx={{
        width: 120,
        height: 33.375,
        mr: 1,
        '[role="button"]': { py: 0.65 },
      }}
      {...props}
    />
<<<<<<< HEAD
  )
})(({ theme }) => ({
  background: theme.palette.mode === 'light' ? '#fff' : undefined,
}))
=======
  );
})(({ theme }) => ({
  background: theme.palette.mode === "light" ? "#fff" : undefined,
}));
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
