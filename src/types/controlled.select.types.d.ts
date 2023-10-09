import { Control, FieldValues, Path } from "react-hook-form";
import { ElementType } from "react";
import { ChipTypeMap } from "@mui/material/Chip";
import { AutocompleteProps } from "@mui/material/Autocomplete";
import { TextFieldProps } from "@mui/material/TextField";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

export interface ControlledSearchSelectProps<
  O extends SelectOptions,
  TField extends FieldValues,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends ElementType = ChipTypeMap["defaultComponent"],
> extends Partial<
      AutocompleteProps<
        SelectOptions,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
      >
    >,
    Partial<
      Pick<
        TextFieldProps,
        "variant" | "label" | "placeholder" | "sx" | "helperText"
      >
    > {
  control: Control<TField>;
  name: Path<TField>;
  options: O[];
  label?: string;
  helperText?: string;
  rules?: Omit<
    RegisterOptions<TField, Path<TField>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  // Para teste FixedOptions
  fixedOptions?: BaseSelectOptions[];
}
