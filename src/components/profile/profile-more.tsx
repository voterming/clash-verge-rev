<<<<<<< HEAD
import { FeaturedPlayListRounded } from '@mui/icons-material'
=======
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLockFn } from "ahooks";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Box,
  Badge,
  Chip,
<<<<<<< HEAD
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useLockFn } from 'ahooks'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { EditorViewer } from '@/components/profile/editor-viewer'
import { useEditorDocument } from '@/hooks/use-editor-document'
import { viewProfile, readProfileFile, saveProfileFile } from '@/services/cmds'
import { showNotice } from '@/services/notice-service'

import { LogViewer } from './log-viewer'
import { ProfileBox } from './profile-box'

interface Props {
  logInfo?: [string, string][]
  id: 'Merge' | 'Script'
  onSave?: (prev?: string, curr?: string) => void
}

const EMPTY_LOG_INFO: [string, string][] = []

// profile enhanced item
export const ProfileMore = (props: Props) => {
  const { id, logInfo, onSave } = props

  const entries = logInfo ?? EMPTY_LOG_INFO
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [position, setPosition] = useState({ left: 0, top: 0 })
  const [fileOpen, setFileOpen] = useState(false)
  const [logOpen, setLogOpen] = useState(false)

  const loadDocument = useCallback(() => readProfileFile(id), [id])
  const document = useEditorDocument({
    open: fileOpen,
    load: loadDocument,
  })

  const onEditFile = () => {
    setAnchorEl(null)
    setFileOpen(true)
  }

  const onOpenFile = useLockFn(async () => {
    setAnchorEl(null)
    try {
      await viewProfile(id)
    } catch (err) {
      showNotice.error(err)
    }
  })

  const hasError = entries.some(([level]) => level === 'exception')

  const globalTitles: Record<Props['id'], string> = {
    Merge: 'profiles.components.more.global.merge',
    Script: 'profiles.components.more.global.script',
  }

  const chipLabels: Record<Props['id'], string> = {
    Merge: 'profiles.components.more.chips.merge',
    Script: 'profiles.components.more.chips.script',
  }

  const itemMenu = [
    { label: 'profiles.components.menu.editFile', handler: onEditFile },
    { label: 'profiles.components.menu.openFile', handler: onOpenFile },
  ]

  const boxStyle = {
    height: 26,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: 1,
  }

  const handleSave = useLockFn(async () => {
    const currentValue = document.value
    await saveProfileFile(id, currentValue)
    onSave?.(document.savedValue, currentValue)
    document.markSaved(currentValue)
  })
=======
  Typography,
  MenuItem,
  Menu,
  IconButton,
} from "@mui/material";
import { FeaturedPlayListRounded } from "@mui/icons-material";
import { viewProfile, readProfileFile, saveProfileFile } from "@/services/cmds";
import { Notice } from "@/components/base";
import { EditorViewer } from "@/components/profile/editor-viewer";
import { ProfileBox } from "./profile-box";
import { LogViewer } from "./log-viewer";

interface Props {
  logInfo?: [string, string][];
  id: "Merge" | "Script";
  onSave?: (prev?: string, curr?: string) => void;
}

// profile enhanced item
export const ProfileMore = (props: Props) => {
  const { id, logInfo = [], onSave } = props;

  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [fileOpen, setFileOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  const onEditFile = () => {
    setAnchorEl(null);
    setFileOpen(true);
  };

  const onOpenFile = useLockFn(async () => {
    setAnchorEl(null);
    try {
      await viewProfile(id);
    } catch (err: any) {
      Notice.error(err?.message || err.toString());
    }
  });

  const fnWrapper = (fn: () => void) => () => {
    setAnchorEl(null);
    return fn();
  };

  const hasError = !!logInfo.find((e) => e[0] === "exception");

  const itemMenu = [
    { label: "Edit File", handler: onEditFile },
    { label: "Open File", handler: onOpenFile },
  ];

  const boxStyle = {
    height: 26,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    lineHeight: 1,
  };
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <>
      <ProfileBox
        onDoubleClick={onEditFile}
        onContextMenu={(event) => {
<<<<<<< HEAD
          const { clientX, clientY } = event
          setPosition({ top: clientY, left: clientX })
          setAnchorEl(event.currentTarget as HTMLElement)
          event.preventDefault()
=======
          const { clientX, clientY } = event;
          setPosition({ top: clientY, left: clientX });
          setAnchorEl(event.currentTarget);
          event.preventDefault();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={0.5}
        >
          <Typography
            width="calc(100% - 52px)"
            variant="h6"
            component="h2"
            noWrap
<<<<<<< HEAD
            title={t(globalTitles[id])}
          >
            {t(globalTitles[id])}
          </Typography>

          <Chip
            label={t(chipLabels[id])}
            color="primary"
            size="small"
            variant="outlined"
            sx={{ height: 20, textTransform: 'capitalize' }}
=======
            title={t(`Global ${id}`)}
          >
            {t(`Global ${id}`)}
          </Typography>

          <Chip
            label={id}
            color="primary"
            size="small"
            variant="outlined"
            sx={{ height: 20, textTransform: "capitalize" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          />
        </Box>

        <Box sx={boxStyle}>
<<<<<<< HEAD
          {id === 'Script' &&
=======
          {id === "Script" &&
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            (hasError ? (
              <Badge color="error" variant="dot" overlap="circular">
                <IconButton
                  size="small"
                  edge="start"
                  color="error"
<<<<<<< HEAD
                  title={t('profiles.modals.logViewer.title')}
=======
                  title={t("Script Console")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                  onClick={() => setLogOpen(true)}
                >
                  <FeaturedPlayListRounded fontSize="inherit" />
                </IconButton>
              </Badge>
            ) : (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
<<<<<<< HEAD
                title={t('profiles.modals.logViewer.title')}
=======
                title={t("Script Console")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                onClick={() => setLogOpen(true)}
              >
                <FeaturedPlayListRounded fontSize="inherit" />
              </IconButton>
            ))}
        </Box>
      </ProfileBox>

      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorPosition={position}
        anchorReference="anchorPosition"
        transitionDuration={225}
        MenuListProps={{ sx: { py: 0.5 } }}
        onContextMenu={(e) => {
<<<<<<< HEAD
          setAnchorEl(null)
          e.preventDefault()
=======
          setAnchorEl(null);
          e.preventDefault();
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }}
      >
        {itemMenu
          .filter((item: any) => item.show !== false)
          .map((item) => (
            <MenuItem
              key={item.label}
              onClick={item.handler}
              sx={[
                { minWidth: 120 },
                (theme) => {
                  return {
                    color:
<<<<<<< HEAD
                      item.label === 'Delete'
                        ? theme.palette.error.main
                        : undefined,
                  }
=======
                      item.label === "Delete"
                        ? theme.palette.error.main
                        : undefined,
                  };
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
                },
              ]}
              dense
            >
              {t(item.label)}
            </MenuItem>
          ))}
      </Menu>
      {fileOpen && (
        <EditorViewer
          open={true}
<<<<<<< HEAD
          title={t(globalTitles[id])}
          value={document.value}
          language={id === 'Merge' ? 'yaml' : 'javascript'}
          path={`profile-more:${id}.${id === 'Merge' ? 'yaml' : 'js'}`}
          loading={document.loading}
          dirty={document.dirty}
          onChange={document.setValue}
          onSave={handleSave}
=======
          title={`${t("Global " + id)}`}
          initialData={readProfileFile(id)}
          language={id === "Merge" ? "yaml" : "javascript"}
          schema={id === "Merge" ? "clash" : undefined}
          onSave={async (prev, curr) => {
            await saveProfileFile(id, curr ?? "");
            onSave && onSave(prev, curr);
          }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          onClose={() => setFileOpen(false)}
        />
      )}
      {logOpen && (
        <LogViewer
          open={logOpen}
<<<<<<< HEAD
          logInfo={entries}
=======
          logInfo={logInfo}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          onClose={() => setLogOpen(false)}
        />
      )}
    </>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
