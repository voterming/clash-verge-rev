<<<<<<< HEAD
import {
  CheckRounded,
  CloseRounded,
  DeleteRounded,
  EditRounded,
  OpenInNewRounded,
} from '@mui/icons-material'
=======
import { useState } from "react";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
<<<<<<< HEAD
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  value?: string
  onlyEdit?: boolean
  onChange: (value?: string) => void
  onOpenUrl?: (value?: string) => void
  onDelete?: () => void
  onCancel?: () => void
=======
} from "@mui/material";
import {
  CheckRounded,
  CloseRounded,
  DeleteRounded,
  EditRounded,
  OpenInNewRounded,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface Props {
  value?: string;
  onlyEdit?: boolean;
  onChange: (value?: string) => void;
  onOpenUrl?: (value?: string) => void;
  onDelete?: () => void;
  onCancel?: () => void;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
}

export const WebUIItem = (props: Props) => {
  const {
    value,
    onlyEdit = false,
    onChange,
    onDelete,
    onOpenUrl,
    onCancel,
<<<<<<< HEAD
  } = props

  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const { t } = useTranslation()

  const highlightedParts = useMemo(() => {
    const placeholderRegex = /(%host|%port|%secret)/g
    if (!value) {
      return ['NULL']
    }
    return value.split(placeholderRegex).filter((part) => part !== '')
  }, [value])
=======
  } = props;

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const { t } = useTranslation();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  if (editing || onlyEdit) {
    return (
      <>
        <Stack spacing={0.75} direction="row" mt={1} mb={1} alignItems="center">
          <TextField
            autoComplete="new-password"
            fullWidth
            size="small"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
<<<<<<< HEAD
            placeholder={t(
              'settings.modals.webUI.messages.supportedPlaceholders',
            )}
          />
          <IconButton
            size="small"
            title={t('shared.actions.save')}
            color="inherit"
            onClick={() => {
              onChange(editValue)
              setEditing(false)
=======
            placeholder={t("Support %host, %port, %secret")}
          />
          <IconButton
            size="small"
            title={t("Save")}
            color="inherit"
            onClick={() => {
              onChange(editValue);
              setEditing(false);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }}
          >
            <CheckRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            size="small"
<<<<<<< HEAD
            title={t('shared.actions.cancel')}
            color="inherit"
            onClick={() => {
              onCancel?.()
              setEditing(false)
=======
            title={t("Cancel")}
            color="inherit"
            onClick={() => {
              onCancel?.();
              setEditing(false);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }}
          >
            <CloseRounded fontSize="inherit" />
          </IconButton>
        </Stack>
        <Divider />
      </>
<<<<<<< HEAD
    )
  }

  const renderedParts = highlightedParts.map((part, index) => {
    const isPlaceholder =
      part === '%host' || part === '%port' || part === '%secret'
    const repeatIndex = highlightedParts
      .slice(0, index)
      .filter((prev) => prev === part).length
    const key = `${part || 'empty'}-${repeatIndex}`

    return (
      <span key={key} className={isPlaceholder ? 'placeholder' : undefined}>
        {part}
      </span>
    )
  })
=======
    );
  }

  const html = value
    ?.replace("%host", "<span>%host</span>")
    .replace("%port", "<span>%port</span>")
    .replace("%secret", "<span>%secret</span>");
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <>
      <Stack spacing={0.75} direction="row" alignItems="center" mt={1} mb={1}>
        <Typography
          component="div"
          width="100%"
          title={value}
<<<<<<< HEAD
          color={value ? 'text.primary' : 'text.secondary'}
          sx={({ palette }) => ({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '> .placeholder': {
              color: palette.primary.main,
            },
          })}
        >
          {renderedParts}
        </Typography>
        <IconButton
          size="small"
          title={t('settings.modals.webUI.actions.openUrl')}
=======
          color={value ? "text.primary" : "text.secondary"}
          sx={({ palette }) => ({
            overflow: "hidden",
            textOverflow: "ellipsis",
            "> span": {
              color: palette.primary.main,
            },
          })}
          dangerouslySetInnerHTML={{ __html: html || "NULL" }}
        />
        <IconButton
          size="small"
          title={t("Open URL")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          color="inherit"
          onClick={() => onOpenUrl?.(value)}
        >
          <OpenInNewRounded fontSize="inherit" />
        </IconButton>
        <IconButton
          size="small"
<<<<<<< HEAD
          title={t('shared.actions.edit')}
          color="inherit"
          onClick={() => {
            setEditing(true)
            setEditValue(value)
=======
          title={t("Edit")}
          color="inherit"
          onClick={() => {
            setEditing(true);
            setEditValue(value);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          }}
        >
          <EditRounded fontSize="inherit" />
        </IconButton>
        <IconButton
          size="small"
<<<<<<< HEAD
          title={t('shared.actions.delete')}
=======
          title={t("Delete")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          color="inherit"
          onClick={onDelete}
        >
          <DeleteRounded fontSize="inherit" />
        </IconButton>
      </Stack>
      <Divider />
    </>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
