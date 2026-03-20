<<<<<<< HEAD
import { Box, Chip } from '@mui/material'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DialogRef } from '@/components/base'
import { EditorViewer } from '@/components/profile/editor-viewer'
import { getRuntimeYaml } from '@/services/cmds'

export const ConfigViewer = forwardRef<DialogRef>((_, ref) => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [runtimeConfig, setRuntimeConfig] = useState('')

  useImperativeHandle(ref, () => ({
    open: () => {
      setRuntimeConfig('')
      setLoading(true)
      setOpen(true)
      getRuntimeYaml()
        .then((data) => {
          setRuntimeConfig(data ?? '# Error getting runtime yaml\n')
        })
        .catch(() => {
          setRuntimeConfig('# Error getting runtime yaml\n')
        })
        .finally(() => {
          setLoading(false)
        })
    },
    close: () => setOpen(false),
  }))

  if (!open) return null
=======
import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Chip } from "@mui/material";
import { getRuntimeYaml } from "@/services/cmds";
import { DialogRef } from "@/components/base";
import { EditorViewer } from "@/components/profile/editor-viewer";

export const ConfigViewer = forwardRef<DialogRef>((_, ref) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [runtimeConfig, setRuntimeConfig] = useState("");

  useImperativeHandle(ref, () => ({
    open: () => {
      getRuntimeYaml().then((data) => {
        setRuntimeConfig(data ?? "# Error getting runtime yaml\n");
        setOpen(true);
      });
    },
    close: () => setOpen(false),
  }));

  if (!open) return null;
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  return (
    <EditorViewer
      open={true}
      title={
        <Box display="flex" alignItems="center" gap={2}>
<<<<<<< HEAD
          {t('settings.components.verge.advanced.fields.runtimeConfig')}
          <Chip label={t('shared.labels.readOnly')} size="small" />
        </Box>
      }
      value={runtimeConfig}
      readOnly
      language="yaml"
      path="runtime-config.yaml"
      loading={loading}
      onClose={() => setOpen(false)}
    />
  )
})
=======
          {t("Runtime Config")}
          <Chip label={t("ReadOnly")} size="small" />
        </Box>
      }
      initialData={Promise.resolve(runtimeConfig)}
      readOnly
      language="yaml"
      schema="clash"
      onClose={() => setOpen(false)}
    />
  );
});
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
