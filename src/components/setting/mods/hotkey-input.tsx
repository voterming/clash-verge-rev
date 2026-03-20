<<<<<<< HEAD
import { DeleteRounded } from '@mui/icons-material'
import { alpha, Box, IconButton, styled } from '@mui/material'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { parseHotkey } from '@/utils/parse-hotkey'

const KeyWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 230,
  minHeight: 36,

  '> input': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    opacity: 0,
  },
  '> input:focus + .list': {
    borderColor: alpha(theme.palette.primary.main, 0.75),
  },
  '.list': {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    minHeight: 36,
    boxSizing: 'border-box',
    padding: '3px 4px',
    border: '1px solid',
    borderRadius: 4,
    borderColor: alpha(theme.palette.text.secondary, 0.15),
    '&:last-child': {
      marginRight: 0,
    },
  },
  '.item': {
    fontSize: '14px',
    color: theme.palette.text.primary,
    border: '1px solid',
    borderColor: alpha(theme.palette.text.secondary, 0.2),
    borderRadius: '2px',
    padding: '1px 5px',
    margin: '2px 0',
  },
  '.delimiter': {
    lineHeight: '25px',
    padding: '0 2px',
  },
}))

interface Props {
  value: string[]
  onChange: (value: string[]) => void
}

export const HotkeyInput = (props: Props) => {
  const { value, onChange } = props
  const { t } = useTranslation()

  const changeRef = useRef<string[]>([])
  const [keys, setKeys] = useState(value)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <KeyWrapper>
        <input
          onKeyUp={() => {
            const ret = changeRef.current.slice()
            if (ret.length) {
              onChange(ret)
              changeRef.current = []
            }
          }}
          onKeyDown={(e) => {
            e.preventDefault()
            e.stopPropagation()

            const key = parseHotkey(e)
            if (key === 'UNIDENTIFIED') return

            changeRef.current = [...new Set([...changeRef.current, key])]
            setKeys(changeRef.current)
=======
import { useRef, useState } from "react";
import { alpha, Box, IconButton, styled } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { parseHotkey } from "@/utils/parse-hotkey";
import { useTranslation } from "react-i18next";

const KeyWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  width: 165,
  minHeight: 36,

  "> input": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0,
  },
  "> input:focus + .list": {
    borderColor: alpha(theme.palette.primary.main, 0.75),
  },
  ".list": {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    minHeight: 36,
    boxSizing: "border-box",
    padding: "3px 4px",
    border: "1px solid",
    borderRadius: 4,
    borderColor: alpha(theme.palette.text.secondary, 0.15),
    "&:last-child": {
      marginRight: 0,
    },
  },
  ".item": {
    color: theme.palette.text.primary,
    border: "1px solid",
    borderColor: alpha(theme.palette.text.secondary, 0.2),
    borderRadius: "2px",
    padding: "1px 5px",
    margin: "2px 0",
  },
  ".delimiter": {
    lineHeight: "25px",
    padding: "0 2px",
  },
}));

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const HotkeyInput = (props: Props) => {
  const { value, onChange } = props;
  const { t } = useTranslation();

  const changeRef = useRef<string[]>([]);
  const [keys, setKeys] = useState(value);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <KeyWrapper>
        <input
          onKeyUp={() => {
            const ret = changeRef.current.slice();
            if (ret.length) {
              onChange(ret);
              changeRef.current = [];
            }
          }}
          onKeyDown={(e) => {
            const evt = e.nativeEvent;
            e.preventDefault();
            e.stopPropagation();

            const key = parseHotkey(evt.key);
            if (key === "UNIDENTIFIED") return;

            changeRef.current = [...new Set([...changeRef.current, key])];
            setKeys(changeRef.current);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
          }}
        />

        <div className="list">
          {keys.map((key, index) => (
<<<<<<< HEAD
            <Box display="flex" key={key}>
              <span className="delimiter" hidden={index === 0}>
                +
              </span>
              <div className="item">{key}</div>
=======
            <Box display="flex">
              <span className="delimiter" hidden={index === 0}>
                +
              </span>
              <div key={key} className="item">
                {key}
              </div>
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            </Box>
          ))}
        </div>
      </KeyWrapper>

      <IconButton
        size="small"
<<<<<<< HEAD
        title={t('shared.actions.delete')}
        color="inherit"
        onClick={() => {
          onChange([])
          setKeys([])
=======
        title={t("Delete")}
        color="inherit"
        onClick={() => {
          onChange([]);
          setKeys([]);
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
        }}
      >
        <DeleteRounded fontSize="inherit" />
      </IconButton>
    </Box>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
