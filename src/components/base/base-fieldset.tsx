<<<<<<< HEAD
import { Box, styled } from '@mui/material'
import React from 'react'

type Props = {
  label: string
  fontSize?: string
  width?: string
  padding?: string
  children?: React.ReactNode
}

export const BaseFieldset: React.FC<Props> = ({
  label,
  fontSize,
  width,
  padding,
  children,
}: Props) => {
  const Fieldset = styled(Box)<{ component?: string }>(() => ({
    position: 'relative',
    border: '1px solid #bbb',
    borderRadius: '5px',
    width: width ?? 'auto',
    padding: padding ?? '15px',
  }))

  const Label = styled('legend')(({ theme }) => ({
    position: 'absolute',
    top: '-10px',
    left: padding ?? '15px',
    backgroundColor: theme.palette.background.paper,
    backgroundImage:
      'linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))',
    color: theme.palette.text.primary,
    fontSize: fontSize ?? '1em',
  }))

  return (
    <Fieldset component="fieldset">
      <Label>{label}</Label>
      {children}
    </Fieldset>
  )
}
=======
import React from "react";
import { Box, styled } from "@mui/material";

type Props = {
  label: string;
  fontSize?: string;
  width?: string;
  padding?: string;
  children?: React.ReactNode;
};

export const BaseFieldset: React.FC<Props> = (props: Props) => {
  const Fieldset = styled(Box)<{ component?: string }>(() => ({
    position: "relative",
    border: "1px solid #bbb",
    borderRadius: "5px",
    width: props.width ?? "auto",
    padding: props.padding ?? "15px",
  }));

  const Label = styled("legend")(({ theme }) => ({
    position: "absolute",
    top: "-10px",
    left: props.padding ?? "15px",
    backgroundColor: theme.palette.background.paper,
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
    color: theme.palette.text.primary,
    fontSize: props.fontSize ?? "1em",
  }));

  return (
    <Fieldset component="fieldset">
      <Label>{props.label}</Label>
      {props.children}
    </Fieldset>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
