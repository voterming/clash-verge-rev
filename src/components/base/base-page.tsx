<<<<<<< HEAD
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { ReactNode } from 'react'

import { BaseErrorBoundary } from './base-error-boundary'

interface Props {
  title?: React.ReactNode // the page title
  header?: React.ReactNode // something behind title
  contentStyle?: React.CSSProperties
  children?: ReactNode
  full?: boolean
}

export const BasePage: React.FC<Props> = (props) => {
  const { title, header, contentStyle, full, children } = props
  const theme = useTheme()

  const isDark = theme.palette.mode === 'dark'
=======
import React, { ReactNode } from "react";
import { Typography } from "@mui/material";
import { BaseErrorBoundary } from "./base-error-boundary";
import { useTheme } from "@mui/material/styles";

interface Props {
  title?: React.ReactNode; // the page title
  header?: React.ReactNode; // something behind title
  contentStyle?: React.CSSProperties;
  children?: ReactNode;
  full?: boolean;
}

export const BasePage: React.FC<Props> = (props) => {
  const { title, header, contentStyle, full, children } = props;
  const theme = useTheme();

  const isDark = theme.palette.mode === "dark";
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

  return (
    <BaseErrorBoundary>
      <div className="base-page">
<<<<<<< HEAD
        <header data-tauri-drag-region="true" style={{ userSelect: 'none' }}>
          <Typography
            sx={{ fontSize: '20px', fontWeight: '700 ' }}
=======
        <header data-tauri-drag-region="true" style={{ userSelect: "none" }}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "700 " }}
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            data-tauri-drag-region="true"
          >
            {title}
          </Typography>

          {header}
        </header>

        <div
<<<<<<< HEAD
          className={full ? 'base-container no-padding' : 'base-container'}
          style={{ backgroundColor: isDark ? '#1e1f27' : '#ffffff' }}
        >
          <section
            style={{
              backgroundColor: isDark ? '#1e1f27' : 'var(--background-color)',
=======
          className={full ? "base-container no-padding" : "base-container"}
          style={{ backgroundColor: isDark ? "#1e1f27" : "#ffffff" }}
        >
          <section
            style={{
              backgroundColor: isDark ? "#1e1f27" : "var(--background-color)",
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
            }}
          >
            <div className="base-content" style={contentStyle}>
              {children}
            </div>
          </section>
        </div>
      </div>
    </BaseErrorBoundary>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
