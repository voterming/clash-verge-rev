<<<<<<< HEAD
import { EditRounded } from '@mui/icons-material'
=======
import { forwardRef, useImperativeHandle, useState } from "react";
import { useLockFn } from "ahooks";
import { useTranslation } from "react-i18next";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
import {
  Button,
  List,
  ListItem,
  ListItemText,
  styled,
  TextField,
  useTheme,
<<<<<<< HEAD
} from '@mui/material'
import { useLockFn } from 'ahooks'
import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'

import { BaseDialog, DialogRef } from '@/components/base'
import { EditorViewer } from '@/components/profile/editor-viewer'
import { useVerge } from '@/hooks/use-verge'
import { defaultDarkTheme, defaultTheme } from '@/pages/_theme'
import { showNotice } from '@/services/notice-service'

export function ThemeViewer(props: { ref?: React.Ref<DialogRef> }) {
  const { ref } = props
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [editorOpen, setEditorOpen] = useState(false)
  const [cssEditorValue, setCssEditorValue] = useState('')
  const [cssEditorSavedValue, setCssEditorSavedValue] = useState('')
  const { verge, patchVerge } = useVerge()
  const { theme_setting } = verge ?? {}
  const [theme, setTheme] = useState(theme_setting || {})
  // Latest theme ref to avoid stale closures when saving CSS
  const themeRef = useRef(theme)
  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true)
      setTheme({ ...theme_setting })
    },
    close: () => setOpen(false),
  }))

  const textProps = {
    size: 'small',
    autoComplete: 'off',
    sx: { width: 135 },
  } as const

  const handleChange = (field: keyof typeof theme) => (e: any) => {
    setTheme((t) => ({ ...t, [field]: e.target.value }))
  }

  const onSave = useLockFn(async () => {
    try {
      await patchVerge({ theme_setting: theme })
      setOpen(false)
    } catch (err) {
      showNotice.error(err)
    }
  })

  const { palette } = useTheme()

  const dt = palette.mode === 'light' ? defaultTheme : defaultDarkTheme

  type ThemeKey = keyof typeof theme & keyof typeof defaultTheme

  const fieldDefinitions: Array<{ labelKey: string; key: ThemeKey }> = useMemo(
    () => [
      {
        labelKey: 'settings.components.verge.theme.fields.primaryColor',
        key: 'primary_color',
      },
      {
        labelKey: 'settings.components.verge.theme.fields.secondaryColor',
        key: 'secondary_color',
      },
      {
        labelKey: 'settings.components.verge.theme.fields.primaryText',
        key: 'primary_text',
      },
      {
        labelKey: 'settings.components.verge.theme.fields.secondaryText',
        key: 'secondary_text',
      },
      {
        labelKey: 'settings.components.verge.theme.fields.infoColor',
        key: 'info_color',
      },
      {
        labelKey: 'settings.components.verge.theme.fields.warningColor',
        key: 'warning_color',
      },
      {
        labelKey: 'settings.components.verge.theme.fields.errorColor',
        key: 'error_color',
      },
      {
        labelKey: 'settings.components.verge.theme.fields.successColor',
        key: 'success_color',
      },
    ],
    [],
  )

  const openCssEditor = () => {
    const nextCss = themeRef.current?.css_injection ?? ''
    setCssEditorValue(nextCss)
    setCssEditorSavedValue(nextCss)
    setEditorOpen(true)
  }

  const handleSaveCss = useLockFn(async () => {
    const prevTheme = themeRef.current || {}
    setTheme({ ...prevTheme, css_injection: cssEditorValue })
    setCssEditorSavedValue(cssEditorValue)
  })

  const renderItem = (labelKey: string, key: ThemeKey) => {
    const label = t(labelKey)
    return (
      <Item key={key}>
=======
} from "@mui/material";
import { useVerge } from "@/hooks/use-verge";
import { defaultTheme, defaultDarkTheme } from "@/pages/_theme";
import { BaseDialog, DialogRef, Notice } from "@/components/base";
import { EditorViewer } from "@/components/profile/editor-viewer";
import { EditRounded } from "@mui/icons-material";

export const ThemeViewer = forwardRef<DialogRef>((props, ref) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const { verge, patchVerge } = useVerge();
  const { theme_setting } = verge ?? {};
  const [theme, setTheme] = useState(theme_setting || {});

  useImperativeHandle(ref, () => ({
    open: () => {
      setOpen(true);
      setTheme({ ...theme_setting });
    },
    close: () => setOpen(false),
  }));

  const textProps = {
    size: "small",
    autoComplete: "off",
    sx: { width: 135 },
  } as const;

  const handleChange = (field: keyof typeof theme) => (e: any) => {
    setTheme((t) => ({ ...t, [field]: e.target.value }));
  };

  const onSave = useLockFn(async () => {
    try {
      await patchVerge({ theme_setting: theme });
      setOpen(false);
    } catch (err: any) {
      Notice.error(err.message || err.toString());
    }
  });

  // default theme
  const { palette } = useTheme();

  const dt = palette.mode === "light" ? defaultTheme : defaultDarkTheme;

  type ThemeKey = keyof typeof theme & keyof typeof defaultTheme;

  const renderItem = (label: string, key: ThemeKey) => {
    return (
      <Item>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        <ListItemText primary={label} />
        <Round sx={{ background: theme[key] || dt[key] }} />
        <TextField
          {...textProps}
<<<<<<< HEAD
          value={theme[key] ?? ''}
          placeholder={dt[key]}
          onChange={handleChange(key)}
          onKeyDown={(e) => e.key === 'Enter' && onSave()}
        />
      </Item>
    )
  }
=======
          value={theme[key] ?? ""}
          placeholder={dt[key]}
          onChange={handleChange(key)}
          onKeyDown={(e) => e.key === "Enter" && onSave()}
        />
      </Item>
    );
  };
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <BaseDialog
      open={open}
<<<<<<< HEAD
      title={t('settings.components.verge.theme.title')}
      okBtn={t('shared.actions.save')}
      cancelBtn={t('shared.actions.cancel')}
      contentSx={{ width: 400, maxHeight: 505, overflow: 'auto', pb: 0 }}
=======
      title={t("Theme Setting")}
      okBtn={t("Save")}
      cancelBtn={t("Cancel")}
      contentSx={{ width: 400, maxHeight: 505, overflow: "auto", pb: 0 }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      onOk={onSave}
    >
      <List sx={{ pt: 0 }}>
<<<<<<< HEAD
        {fieldDefinitions.map((field) => renderItem(field.labelKey, field.key))}

        <Item>
          <ListItemText
            primary={t('settings.components.verge.theme.fields.fontFamily')}
          />
          <TextField
            {...textProps}
            value={theme.font_family ?? ''}
            onChange={handleChange('font_family')}
            onKeyDown={(e) => e.key === 'Enter' && onSave()}
          />
        </Item>
        <Item>
          <ListItemText
            primary={t('settings.components.verge.theme.fields.cssInjection')}
          />
          <Button
            startIcon={<EditRounded />}
            variant="outlined"
            onClick={openCssEditor}
          >
            {t('settings.components.verge.theme.actions.editCss')}
=======
        {renderItem(t("Primary Color"), "primary_color")}

        {renderItem(t("Secondary Color"), "secondary_color")}

        {renderItem(t("Primary Text"), "primary_text")}

        {renderItem(t("Secondary Text"), "secondary_text")}

        {renderItem(t("Info Color"), "info_color")}

        {renderItem(t("Warning Color"), "warning_color")}

        {renderItem(t("Error Color"), "error_color")}

        {renderItem(t("Success Color"), "success_color")}

        <Item>
          <ListItemText primary={t("Font Family")} />
          <TextField
            {...textProps}
            value={theme.font_family ?? ""}
            onChange={handleChange("font_family")}
            onKeyDown={(e) => e.key === "Enter" && onSave()}
          />
        </Item>
        <Item>
          <ListItemText primary={t("CSS Injection")} />
          <Button
            startIcon={<EditRounded />}
            variant="outlined"
            onClick={() => {
              setEditorOpen(true);
            }}
          >
            {t("Edit")} CSS
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          </Button>
          {editorOpen && (
            <EditorViewer
              open={true}
<<<<<<< HEAD
              title={t('settings.components.verge.theme.dialogs.editCssTitle')}
              value={cssEditorValue}
              language="css"
              path="theme-css.css"
              dirty={cssEditorValue !== cssEditorSavedValue}
              onChange={setCssEditorValue}
              onSave={handleSaveCss}
              onClose={() => {
                setEditorOpen(false)
=======
              title={`${t("Edit")} CSS`}
              initialData={Promise.resolve(theme.css_injection ?? "")}
              language="css"
              onSave={(_prev, curr) => {
                theme.css_injection = curr;
                handleChange("css_injection");
              }}
              onClose={() => {
                setEditorOpen(false);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
              }}
            />
          )}
        </Item>
      </List>
    </BaseDialog>
<<<<<<< HEAD
  )
}

const Item = styled(ListItem)(() => ({
  padding: '5px 2px',
}))

const Round = styled('div')(() => ({
  width: '24px',
  height: '24px',
  borderRadius: '18px',
  display: 'inline-block',
  marginRight: '8px',
}))
=======
  );
});

const Item = styled(ListItem)(() => ({
  padding: "5px 2px",
}));

const Round = styled("div")(() => ({
  width: "24px",
  height: "24px",
  borderRadius: "18px",
  display: "inline-block",
  marginRight: "8px",
}));
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
