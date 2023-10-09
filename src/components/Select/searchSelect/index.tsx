import React, { useCallback } from "react";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import TextField, { TextFieldVariants } from "@mui/material/TextField";
import { FieldError } from "react-hook-form/dist/types";
import { AutocompleteRenderInputParams } from "@mui/material/Autocomplete/Autocomplete";

type SelectOptions = {
  label: string;
  value: string | number;
  disabled?: boolean;
  firstLetter: string;
};

interface SelectProps
  extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {
  options: SelectOptions[];
  label: string;
  variant?: TextFieldVariants;
  error?: FieldError;
  helperText?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
}

const Select = React.forwardRef(
  (
    {
      options = [],
      label = "",
      error = undefined,
      variant = "filled",
      helperText = "",
      placeholder = "",
      renderInput = (params) => (
        <TextField
          {...params}
          label={label}
          variant={variant}
          error={!!error?.message}
          placeholder={placeholder}
          helperText={!!error?.message ? error?.message : helperText}
        />
      ),
      ...rest
    }: SelectProps,
    ref,
  ) => {
    return (
      <Autocomplete
        {...rest}
        ref={ref}
        options={options}
        isOptionEqualToValue={useCallback(
          (option: SelectOptions, value: SelectOptions) =>
            option.value === value.value,
          [],
        )}
        renderInput={renderInput}
      />
    );
  },
);

Select.displayName = "Select";
export default Select;
