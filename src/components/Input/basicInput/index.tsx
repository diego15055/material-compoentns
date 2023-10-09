import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FieldError } from "react-hook-form/dist/types";

type InputProps = {
  error?: FieldError;
} & Omit<TextFieldProps, "error">;

export const Input = ({
  variant = "filled",
  fullWidth = true,
  color = "primary",
  error,
  ...props
}: InputProps) => {
  return (
    <TextField
      {...props}
      error={!!error?.message}
      variant={variant}
      fullWidth={fullWidth}
      color={color}
    />
  );
};
