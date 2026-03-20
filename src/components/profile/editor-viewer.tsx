<<<<<<< HEAD
import MonacoEditor from '@monaco-editor/react'
import {
  CloseFullscreenRounded,
  ContentPasteRounded,
  FormatPaintRounded,
  OpenInFullRounded,
} from '@mui/icons-material'
=======
import { ReactNode, useEffect, useRef, useState } from "react";
import { useLockFn } from "ahooks";
import { useTranslation } from "react-i18next";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
<<<<<<< HEAD
} from '@mui/material'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
import { useLockFn } from 'ahooks'
import type { editor } from 'monaco-editor'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BaseLoadingOverlay } from '@/components/base'
import { beforeEditorMount } from '@/services/monaco'
import { showNotice } from '@/services/notice-service'
import { useThemeMode } from '@/services/states'
import debounce from '@/utils/debounce'
import getSystem from '@/utils/get-system'

const appWindow = getCurrentWebviewWindow()

export type EditorLanguage = 'yaml' | 'javascript' | 'css'

export interface EditorViewerProps {
  open: boolean
  title?: string | ReactNode
  value: string
  language: EditorLanguage
  path: string
  readOnly?: boolean
  loading?: boolean
  dirty?: boolean
  saveDisabled?: boolean
  onChange?: (value: string) => void
  onSave?: () => void | Promise<void>
  onClose: () => void
  onValidate?: (markers: editor.IMarker[]) => void
}

export const EditorViewer = ({
  open,
  title,
  value,
  language,
  path,
  readOnly = false,
  loading = false,
  dirty,
  saveDisabled = false,
  onChange,
  onSave,
  onClose,
  onValidate,
}: EditorViewerProps) => {
  const { t } = useTranslation()
  const themeMode = useThemeMode()
  const [isMaximized, setIsMaximized] = useState(false)
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)

  const resolvedTitle = title ?? t('profiles.components.menu.editFile')
  const disableSave = loading || saveDisabled || dirty === false

  const syncMaximizedState = useCallback(async () => {
    try {
      setIsMaximized(await appWindow.isMaximized())
    } catch {
      setIsMaximized(false)
    }
  }, [])

  const handleSave = useLockFn(async () => {
    try {
      if (!readOnly) {
        await onSave?.()
      }
      onClose()
    } catch (error) {
      showNotice.error(error)
    }
  })

  const handleClose = () => {
    try {
      onClose()
    } catch (error) {
      showNotice.error(error)
    }
  }

  const handlePaste = useLockFn(async () => {
    try {
      if (readOnly || loading || !editorRef.current) return

      const text = await navigator.clipboard.readText()
      if (!text) return

      const editorInstance = editorRef.current
      const model = editorInstance.getModel()
      const selections = editorInstance.getSelections()
      if (!model || !selections || selections.length === 0) return

      editorInstance.pushUndoStop()
      editorInstance.executeEdits(
        'explicit-paste',
        selections.map((selection) => ({
          range: selection,
          text,
          forceMoveMarkers: true,
        })),
      )
      editorInstance.pushUndoStop()
      editorInstance.focus()
    } catch (error) {
      showNotice.error(error)
    }
  })

  const handleFormat = useLockFn(async () => {
    try {
      if (loading) return
      await editorRef.current?.getAction('editor.action.formatDocument')?.run()
    } catch (error) {
      showNotice.error(error)
    }
  })

  const handleToggleMaximize = useLockFn(async () => {
    try {
      await appWindow.toggleMaximize()
      await syncMaximizedState()
      editorRef.current?.layout()
    } catch (error) {
      showNotice.error(error)
    }
  })

  useEffect(() => {
    if (!open) return
    void syncMaximizedState()
  }, [open, syncMaximizedState])

  useEffect(() => {
    if (!open) return

    const onResized = debounce(() => {
      void syncMaximizedState()
      try {
        editorRef.current?.layout()
      } catch {
        // Ignore transient layout errors during window transitions.
      }
    }, 100)

    const unlistenResized = appWindow.onResized(onResized)

    return () => {
      unlistenResized.then((unlisten) => unlisten())
    }
  }, [open, syncMaximizedState])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      disableEnforceFocus
    >
      <DialogTitle>{resolvedTitle}</DialogTitle>

      <DialogContent
        sx={{
          width: 'auto',
          height: 'calc(100vh - 185px)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 auto', minHeight: 0 }}>
          <BaseLoadingOverlay isLoading={loading} />
          {!loading && (
            <MonacoEditor
              height="100%"
              path={path}
              value={value}
              language={language}
              theme={themeMode === 'light' ? 'light' : 'vs-dark'}
              loading={null}
              saveViewState
              keepCurrentModel={false}
              beforeMount={beforeEditorMount}
              onMount={(editorInstance) => {
                editorRef.current = editorInstance
              }}
              onChange={(nextValue) => onChange?.(nextValue ?? '')}
              onValidate={onValidate}
              options={{
                automaticLayout: true,
                tabSize: 2,
                minimap: {
                  enabled:
                    typeof document !== 'undefined' &&
                    document.documentElement.clientWidth >= 1500,
                },
                mouseWheelZoom: true,
                readOnly,
                readOnlyMessage: {
                  value: t('profiles.modals.editor.messages.readOnly'),
                },
                renderValidationDecorations: 'on',
                quickSuggestions: {
                  strings: true,
                  comments: true,
                  other: true,
                },
                padding: {
                  top: 33,
                },
                fontFamily: `Fira Code, JetBrains Mono, Roboto Mono, "Source Code Pro", Consolas, Menlo, Monaco, monospace, "Courier New", "Apple Color Emoji"${
                  getSystem() === 'windows' ? ', twemoji mozilla' : ''
                }`,
                fontLigatures: false,
                smoothScrolling: true,
              }}
            />
          )}
        </div>

        <ButtonGroup
          variant="contained"
          sx={{ position: 'absolute', left: '14px', bottom: '8px' }}
=======
} from "@mui/material";
import {
  FormatPaintRounded,
  OpenInFullRounded,
  CloseFullscreenRounded,
} from "@mui/icons-material";
import { useThemeMode } from "@/services/states";
import { Notice } from "@/components/base";
import { nanoid } from "nanoid";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import getSystem from "@/utils/get-system";
import debounce from "@/utils/debounce";

import * as monaco from "monaco-editor";
import MonacoEditor from "react-monaco-editor";
import { configureMonacoYaml } from "monaco-yaml";
import { type JSONSchema7 } from "json-schema";
import metaSchema from "meta-json-schema/schemas/meta-json-schema.json";
import mergeSchema from "meta-json-schema/schemas/clash-verge-merge-json-schema.json";
import pac from "types-pac/pac.d.ts?raw";
const appWindow = getCurrentWebviewWindow();

type Language = "yaml" | "javascript" | "css";
type Schema<T extends Language> = LanguageSchemaMap[T];
interface LanguageSchemaMap {
  yaml: "clash" | "merge";
  javascript: never;
  css: never;
}

interface Props<T extends Language> {
  open: boolean;
  title?: string | ReactNode;
  initialData: Promise<string>;
  readOnly?: boolean;
  language: T;
  schema?: Schema<T>;
  onChange?: (prev?: string, curr?: string) => void;
  onSave?: (prev?: string, curr?: string) => void;
  onClose: () => void;
}

let initialized = false;
const monacoInitialization = () => {
  if (initialized) return;

  // configure yaml worker
  configureMonacoYaml(monaco, {
    validate: true,
    enableSchemaRequest: true,
    schemas: [
      {
        uri: "http://example.com/meta-json-schema.json",
        fileMatch: ["**/*.clash.yaml"],
        // @ts-ignore
        schema: metaSchema as JSONSchema7,
      },
      {
        uri: "http://example.com/clash-verge-merge-json-schema.json",
        fileMatch: ["**/*.merge.yaml"],
        // @ts-ignore
        schema: mergeSchema as JSONSchema7,
      },
    ],
  });
  // configure PAC definition
  monaco.languages.typescript.javascriptDefaults.addExtraLib(pac, "pac.d.ts");

  initialized = true;
};

export const EditorViewer = <T extends Language>(props: Props<T>) => {
  const { t } = useTranslation();
  const themeMode = useThemeMode();
  const [isMaximized, setIsMaximized] = useState(false);

  const {
    open = false,
    title = t("Edit File"),
    initialData = Promise.resolve(""),
    readOnly = false,
    language = "yaml",
    schema,
    onChange,
    onSave,
    onClose,
  } = props;

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const prevData = useRef<string | undefined>("");
  const currData = useRef<string | undefined>("");

  const editorWillMount = () => {
    monacoInitialization(); // initialize monaco
  };

  const editorDidMount = async (
    editor: monaco.editor.IStandaloneCodeEditor,
  ) => {
    editorRef.current = editor;

    // retrieve initial data
    await initialData.then((data) => {
      prevData.current = data;
      currData.current = data;

      // create and set model
      const uri = monaco.Uri.parse(`${nanoid()}.${schema}.${language}`);
      const model = monaco.editor.createModel(data, language, uri);
      editorRef.current?.setModel(model);
    });
  };

  const handleChange = useLockFn(async (value: string | undefined) => {
    try {
      currData.current = value;
      onChange?.(prevData.current, currData.current);
    } catch (err: any) {
      Notice.error(err.message || err.toString());
    }
  });

  const handleSave = useLockFn(async () => {
    try {
      !readOnly && onSave?.(prevData.current, currData.current);
      onClose();
    } catch (err: any) {
      Notice.error(err.message || err.toString());
    }
  });

  const handleClose = useLockFn(async () => {
    try {
      onClose();
    } catch (err: any) {
      Notice.error(err.message || err.toString());
    }
  });

  const editorResize = debounce(() => {
    editorRef.current?.layout();
    setTimeout(() => editorRef.current?.layout(), 500);
  }, 100);

  useEffect(() => {
    const onResized = debounce(() => {
      editorResize();
      appWindow.isMaximized().then((maximized) => {
        setIsMaximized(() => maximized);
      });
    }, 100);
    const unlistenResized = appWindow.onResized(onResized);

    return () => {
      unlistenResized.then((fn) => fn());
      editorRef.current?.dispose();
      editorRef.current = undefined;
    };
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent
        sx={{
          width: "auto",
          height: "calc(100vh - 185px)",
          overflow: "hidden",
        }}
      >
        <MonacoEditor
          language={language}
          theme={themeMode === "light" ? "vs" : "vs-dark"}
          options={{
            tabSize: ["yaml", "javascript", "css"].includes(language) ? 2 : 4, // 根据语言类型设置缩进大小
            minimap: {
              enabled: document.documentElement.clientWidth >= 1500, // 超过一定宽度显示minimap滚动条
            },
            mouseWheelZoom: true, // 按住Ctrl滚轮调节缩放比例
            readOnly: readOnly, // 只读模式
            readOnlyMessage: { value: t("ReadOnlyMessage") }, // 只读模式尝试编辑时的提示信息
            renderValidationDecorations: "on", // 只读模式下显示校验信息
            quickSuggestions: {
              strings: true, // 字符串类型的建议
              comments: true, // 注释类型的建议
              other: true, // 其他类型的建议
            },
            padding: {
              top: 33, // 顶部padding防止遮挡snippets
            },
            fontFamily: `Fira Code, JetBrains Mono, Roboto Mono, "Source Code Pro", Consolas, Menlo, Monaco, monospace, "Courier New", "Apple Color Emoji"${
              getSystem() === "windows" ? ", twemoji mozilla" : ""
            }`,
            fontLigatures: false, // 连字符
            smoothScrolling: true, // 平滑滚动
          }}
          editorWillMount={editorWillMount}
          editorDidMount={editorDidMount}
          onChange={handleChange}
        />

        <ButtonGroup
          variant="contained"
          sx={{ position: "absolute", left: "14px", bottom: "8px" }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        >
          <IconButton
            size="medium"
            color="inherit"
<<<<<<< HEAD
            sx={{ display: readOnly ? 'none' : '' }}
            title={t('profiles.page.importForm.actions.paste')}
            disabled={loading}
            onClick={() => {
              void handlePaste()
            }}
          >
            <ContentPasteRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            size="medium"
            color="inherit"
            sx={{ display: readOnly ? 'none' : '' }}
            title={t('profiles.modals.editor.actions.format')}
            disabled={loading}
            onClick={() => {
              void handleFormat()
            }}
=======
            sx={{ display: readOnly ? "none" : "" }}
            title={t("Format document")}
            onClick={() =>
              editorRef.current
                ?.getAction("editor.action.formatDocument")
                ?.run()
            }
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          >
            <FormatPaintRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            size="medium"
            color="inherit"
<<<<<<< HEAD
            title={t(
              isMaximized ? 'shared.window.minimize' : 'shared.window.maximize',
            )}
            onClick={() => {
              void handleToggleMaximize()
            }}
=======
            title={t(isMaximized ? "Minimize" : "Maximize")}
            onClick={() => appWindow.toggleMaximize().then(editorResize)}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          >
            {isMaximized ? <CloseFullscreenRounded /> : <OpenInFullRounded />}
          </IconButton>
        </ButtonGroup>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
<<<<<<< HEAD
          {t(readOnly ? 'shared.actions.close' : 'shared.actions.cancel')}
        </Button>
        {!readOnly && (
          <Button
            onClick={() => {
              void handleSave()
            }}
            variant="contained"
            disabled={disableSave}
          >
            {t('shared.actions.save')}
=======
          {t(readOnly ? "Close" : "Cancel")}
        </Button>
        {!readOnly && (
          <Button onClick={handleSave} variant="contained">
            {t("Save")}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </Button>
        )}
      </DialogActions>
    </Dialog>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
