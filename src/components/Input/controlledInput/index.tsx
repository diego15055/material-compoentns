import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextFieldProps } from "@mui/material/TextField";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import { Input } from "../input";

interface ControlledInputProps
  extends Partial<
    Pick<
      TextFieldProps,
      "variant" | "label" | "placeholder" | "sx" | "helperText" | "type"
    >
  > {
  control: Control;
  name: Path<FieldValues>;
  rules?: Omit<
    RegisterOptions<FieldValues, Path<FieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

const ControlledInput = ({
  control,
  name,
  label,
  helperText,
  rules = {
    required: {
      value: true,
      message: `Por favor digite um valor para ${label}`,
    },
  },
  ...rest
}: ControlledInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={""}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value } = field;
        return (
          <Input
            {...rest}
            value={value}
            onChange={onChange}
            label={label}
            error={error}
            helperText={!!error?.message ? error?.message : helperText}
          />
        );
      }}
    />
  );
};

ControlledInput.displayName = "ControlledInput";
export default ControlledInput;
