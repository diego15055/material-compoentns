import { AutocompleteProps } from "@mui/material/Autocomplete";
import { TextFieldVariants } from "@mui/material/TextField";
import { FieldError } from "react-hook-form/dist/types";
import {
  AutocompleteRenderGroupParams,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete/Autocomplete";
import React from "react";

type SelectOptions = {
  firstLetter: string;
} & BaseSelectOptions;

type BaseSelectOptions = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export interface SelectProps
  extends Omit<AutocompleteProps<any, any, any, any>, "renderInput"> {
  options: SelectOptions[];
  label?: string;
  variant?: TextFieldVariants;
  error?: FieldError;
  helperText?: string;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  renderGroup?: (params: AutocompleteRenderGroupParams) => React.ReactNode;
}
