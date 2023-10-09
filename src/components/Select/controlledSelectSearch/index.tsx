import * as React from "react";
import { Controller, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip } from "@mui/material";
import { styled } from "@mui/system";
import {
  SelectOptions,
  ControlledSearchSelectProps,
} from "../../types/controlled.component";

const GroupHeader = styled("div")(() => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  backgroundColor: "#F1F1F1",
}));

const GroupItems = styled("ul")({
  padding: 0,
});

/**
 * - Example Options Props
 *
 * ```jsx
 * type SelectOptions = {
 *   label: string;
 *   value: string | number;
 *   disabled?: boolean;
 *   firstLetter: string;
 * };
 *
 * const options<SelectOptions[]> = [
 *     {
 *       label: "Label",
 *       value: "Value",
 *       disabled: true,
 *       firstLetter: "V";
 *     }
 * ];
 * ```
 *
 * - Example Component Usage
 *
 * ```jsx
 *   <ControlledSearchSelect
 *     control={control}
 *     options={options}
 *     name={"name"}
 *     label={"Multi Values"}
 *   />
 * ```
 *
 *  - Optional Props
 *
 * ```
 *  - disableCloseOnSelect?: boolean;
 *      If `true`, the popup won't close when a value is selected.
 *      @default false
 *
 *   - disableClearable?: boolean
 *      If `true`, the input can't be cleared.
 *      @default false
 *
 *  -  rules?: Omit<
 *       RegisterOptions<TField, Path<TField>>,
 *       "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
 *     >
 *      Rules based on react-hook-form.
 *
 *  - getOptionDisabled={(option) => {
 *       if (onEditMode) {
 *         return !!fixedOptions.find(
 *           (item) => item .value === option .value
 *         );
 *       }
 *       return false;
 *    }}
 *      Used to determine the disabled state for a given option.
 * ```
 *  - More Props in AutocompleteProps ( Material UI ) and TextFieldProps ( Material UI )
 *
 */

const ControlledSearchSelect = <
  O extends SelectOptions,
  TField extends FieldValues,
>({
  options = [],
  label = "",
  variant = "filled",
  helperText = "",
  placeholder = "",
  multiple = false,
  control,
  name,
  rules = {
    required: {
      value: true,
      message: `Por favor, selecione um ${label}`,
    },
  },
  ...rest
}: ControlledSearchSelectProps<O, TField, boolean, boolean>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <Autocomplete
            {...rest}
            ref={ref}
            multiple={multiple}
            value={multiple ? value || [] : value || null}
            onChange={(_event, newValue) => {
              onChange(newValue);
            }}
            options={options}
            getOptionLabel={(option) => option.label || ""}
            isOptionEqualToValue={(
              option: SelectOptions,
              value: SelectOptions,
            ) => option.value === value.value}
            // ***
            // Props to show Letters on options
            // ***
            groupBy={(option) => option.firstLetter}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option?.label}
                  {...getTagProps({ index })}
                  disabled={option?.disabled}
                />
              ))
            }
            renderGroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </li>
            )}
            // ***
            // Props to show Letters on options
            // ***
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant={variant}
                error={!!error?.message}
                placeholder={placeholder}
                helperText={!!error?.message ? error?.message : helperText}
              />
            )}
          />
        );
      }}
    />
  );
};

ControlledSearchSelect.displayName = "Select";
export default ControlledSearchSelect;
