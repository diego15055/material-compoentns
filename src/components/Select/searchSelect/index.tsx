import React, { useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { SelectOptions, SelectProps } from "../../../types/select.common.types";

const GroupHeader = styled("div")(() => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  backgroundColor: "#F1F1F1",
}));

const GroupItems = styled("ul")({
  padding: 0,
});

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
      renderGroup = (params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
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
        groupBy={(option) => option.firstLetter}
        renderInput={renderInput}
        renderGroup={renderGroup}
      />
    );
  },
);

Select.displayName = "Select";
export default Select;
