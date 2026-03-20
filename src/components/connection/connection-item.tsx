<<<<<<< HEAD
import { CloseRounded } from '@mui/icons-material'
=======
import dayjs from "dayjs";
import { useLockFn } from "ahooks";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  styled,
  ListItem,
  IconButton,
  ListItemText,
  Box,
  alpha,
<<<<<<< HEAD
} from '@mui/material'
import { useLockFn } from 'ahooks'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { closeConnection } from 'tauri-plugin-mihomo-api'

import parseTraffic from '@/utils/parse-traffic'

const Tag = styled('span')(({ theme }) => ({
  fontSize: '10px',
  padding: '0 4px',
  lineHeight: 1.375,
  border: '1px solid',
  borderRadius: 4,
  borderColor: alpha(theme.palette.text.secondary, 0.35),
  marginTop: '4px',
  marginRight: '4px',
}))

interface Props {
  value: IConnectionsItem
  closed: boolean
  onShowDetail?: () => void
}

export const ConnectionItem = (props: Props) => {
  const { value, closed, onShowDetail } = props

  const { id, metadata, chains, start, curUpload, curDownload } = value
  const { t } = useTranslation()

  const onDelete = useLockFn(async () => closeConnection(id))
  const showTraffic = curUpload! >= 100 || curDownload! >= 100
=======
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { deleteConnection } from "@/services/api";
import parseTraffic from "@/utils/parse-traffic";

const Tag = styled("span")(({ theme }) => ({
  fontSize: "10px",
  padding: "0 4px",
  lineHeight: 1.375,
  border: "1px solid",
  borderRadius: 4,
  borderColor: alpha(theme.palette.text.secondary, 0.35),
  marginTop: "4px",
  marginRight: "4px",
}));

interface Props {
  value: IConnectionsItem;
  onShowDetail?: () => void;
}

export const ConnectionItem = (props: Props) => {
  const { value, onShowDetail } = props;

  const { id, metadata, chains, start, curUpload, curDownload } = value;

  const onDelete = useLockFn(async () => deleteConnection(id));
  const showTraffic = curUpload! >= 100 || curDownload! >= 100;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <ListItem
      dense
<<<<<<< HEAD
      sx={{ borderBottom: '1px solid var(--divider-color)' }}
      secondaryAction={
        !closed && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={onDelete}
            title={t('connections.components.actions.closeConnection')}
            aria-label={t('connections.components.actions.closeConnection')}
          >
            <CloseRounded />
          </IconButton>
        )
      }
    >
      <ListItemText
        sx={{ userSelect: 'text', cursor: 'pointer' }}
        primary={metadata.host || metadata.destinationIP}
        onClick={onShowDetail}
        secondary={
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Tag sx={{ textTransform: 'uppercase', color: 'success' }}>
=======
      sx={{ borderBottom: "1px solid var(--divider-color)" }}
      secondaryAction={
        <IconButton edge="end" color="inherit" onClick={onDelete}>
          <CloseRounded />
        </IconButton>
      }
    >
      <ListItemText
        sx={{ userSelect: "text", cursor: "pointer" }}
        primary={metadata.host || metadata.destinationIP}
        onClick={onShowDetail}
        secondary={
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Tag sx={{ textTransform: "uppercase", color: "success" }}>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
              {metadata.network}
            </Tag>

            <Tag>{metadata.type}</Tag>

            {!!metadata.process && <Tag>{metadata.process}</Tag>}

            {chains?.length > 0 && (
<<<<<<< HEAD
              <Tag>{[...chains].reverse().join(' / ')}</Tag>
=======
              <Tag>{[...chains].reverse().join(" / ")}</Tag>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            )}

            <Tag>{dayjs(start).fromNow()}</Tag>

            {showTraffic && (
              <Tag>
                {parseTraffic(curUpload!)} / {parseTraffic(curDownload!)}
              </Tag>
            )}
          </Box>
        }
      />
    </ListItem>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
