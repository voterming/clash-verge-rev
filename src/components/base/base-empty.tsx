<<<<<<< HEAD
import { InboxRounded } from '@mui/icons-material'
import { alpha, Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import type { TranslationKey } from '@/types/generated/i18n-keys'

interface Props {
  text?: ReactNode
  textKey?: TranslationKey
  extra?: ReactNode
}

export const BaseEmpty = ({
  text,
  textKey = 'shared.statuses.empty',
  extra,
}: Props) => {
  const { t } = useTranslation()

  const resolvedText: ReactNode = text !== undefined ? text : t(textKey)
=======
import { alpha, Box, Typography } from "@mui/material";
import { InboxRounded } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface Props {
  text?: React.ReactNode;
  extra?: React.ReactNode;
}

export const BaseEmpty = (props: Props) => {
  const { text = "Empty", extra } = props;
  const { t } = useTranslation();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <Box
      sx={({ palette }) => ({
<<<<<<< HEAD
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: alpha(palette.text.secondary, 0.75),
      })}
    >
      <InboxRounded sx={{ fontSize: '4em' }} />
      <Typography sx={{ fontSize: '1.25em' }}>{resolvedText}</Typography>
      {extra}
    </Box>
  )
}
=======
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: alpha(palette.text.secondary, 0.75),
      })}
    >
      <InboxRounded sx={{ fontSize: "4em" }} />
      <Typography sx={{ fontSize: "1.25em" }}>{t(`${text}`)}</Typography>
      {extra}
    </Box>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
