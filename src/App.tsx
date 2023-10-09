import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Chip, Container } from "@mui/material";
import axios from "axios";

import Select from "./components/Select/searchSelect";
import ControlledSearchSelect from "./components/Select/controlledSelectSearch";
import { Input } from "./components/Input/basicInput";
import ControlledInput from "./components/Input/controlledInput";
import { GroupHeader, GroupItems } from "./utils/select-helper";
import { BaseSelectOptions, SelectOptions } from "./types/select.common.types";

const fixedOptions: BaseSelectOptions[] = [
  { label: "iPhone 9", value: "549", disabled: true },
  { label: "Samsung Universe 9", value: "1249", disabled: true },
  { label: "Huawei P30", value: "499", disabled: true },
  { label: "Samsung Galaxy Book", value: "1499", disabled: true },
  { label: "Infinix INBOOK", value: "1099", disabled: true },
  { label: "perfume Oil", value: "13", disabled: true },
  { label: "Fog Scent Xpressio Perfume", value: "13", disabled: true },
  { label: "Eau De Perfume Spray", value: "30", disabled: true },
  { label: "Tree Oil 30ml", value: "12", disabled: true },
  { label: "Skin Beauty Serum.", value: "46", disabled: true },
  { label: "- Daal Masoor 500 grams", value: "20", disabled: true },
  { label: "Orange Essence Food Flavou", value: "14", disabled: true },
  { label: "Gulab Powder 50 Gram", value: "70", disabled: true },
  { label: "Flying Wooden Bird", value: "51", disabled: true },
  { label: "Handcraft Chinese style", value: "60", disabled: true },
];

function App() {
  const [options, setOptions] = useState<SelectOptions[]>([]);

  const { handleSubmit, control, setValue } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data: any) => console.log(data);

  const onEditMode = false;

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      const formated: SelectOptions[] = res.data.products.map((item: any) => ({
        label: item.title,
        value: item.price.toString(),
        firstLetter: item.title.substring(0, 1).toUpperCase(),
      }));

      return setOptions(
        formated.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter)),
      );
    });
  }, []);

  useEffect(() => {
    if (fixedOptions && onEditMode) {
      setValue("multiSelect", fixedOptions);
      setValue("controlledSearchSelectDefaultValues", fixedOptions);
    }
  }, []);

  return (
    <div className="App">
      <Container sx={{ mt: 20 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*Exemplo Select Comum*/}
          <Controller
            name={"singleSelect"}
            control={control}
            rules={{
              required: {
                message: "Seleciona alguma coisa ai",
                value: true,
              },
            }}
            defaultValue={undefined}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => {
              return (
                <Select
                  value={value || null}
                  onChange={(_event, newValue: string | null) => {
                    onChange(newValue);
                  }}
                  onBlur={onBlur}
                  error={error}
                  options={options}
                  label={"Single Select"}
                  placeholder={"Selecione um valor"}
                />
              );
            }}
          />

          {/*Exemplo Multi Select*/}
          <Controller
            name={"multiSelect"}
            control={control}
            rules={{
              required: {
                message: "Seleciona alguma coisa ai",
                value: true,
              },
            }}
            defaultValue={undefined}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => {
              return (
                <Select
                  value={value || []}
                  onChange={(_event, newValue) => {
                    onChange([
                      ...newValue.filter(
                        (option: SelectOptions) =>
                          option.value !== newValue.value,
                      ),
                    ]);
                  }}
                  options={options}
                  onBlur={onBlur}
                  error={error}
                  label={"Multi Select"}
                  disableClearable={onEditMode}
                  defaultValue={fixedOptions}
                  multiple={true}
                  placeholder={"Selecione multiplos valores"}
                  sx={{ mt: 5 }}
                  disableCloseOnSelect={true}
                  groupBy={(option) => option.firstLetter}
                  getOptionDisabled={(option) => {
                    if (onEditMode) {
                      return !!fixedOptions.find(
                        (item) => item.value === option.value,
                      );
                    }
                    return false;
                  }}
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
                />
              );
            }}
          />

          <ControlledSearchSelect
            control={control}
            options={options}
            name={"controlledMultiSelect"}
            label={"Multi Values ControlledSearchSelect"}
            multiple={true}
            sx={{ mt: 5 }}
            disableCloseOnSelect={true}
            getOptionDisabled={(option) => {
              if (onEditMode) {
                return !!fixedOptions.find(
                  (item) => item.value === option.value,
                );
              }
              return false;
            }}
          />

          <ControlledSearchSelect
            control={control}
            options={options}
            name={"controlledSingleSelect"}
            label={"Single Values ControlledSearchSelect"}
            sx={{ mt: 5 }}
            getOptionDisabled={(option) => {
              if (onEditMode) {
                return !!fixedOptions.find(
                  (item) => item.value === option.value,
                );
              }
              return false;
            }}
          />

          <ControlledSearchSelect
            control={control}
            options={options}
            name={"controlledSearchSelectDefaultValues"}
            label={"Multi Values ControlledSearchSelectDefaultValues"}
            multiple={true}
            sx={{ mt: 5 }}
            disableCloseOnSelect={true}
            disableClearable={true}
            rules={{
              required: {
                value: true,
                message: "Por favor informe um valor",
              },
            }}
            getOptionDisabled={(option) => {
              if (onEditMode) {
                return !!fixedOptions.find(
                  (item) => item.value === option.value,
                );
              }
              return false;
            }}
          />

          <ControlledSearchSelect
            control={control}
            options={options}
            name={"controlledMultiSearchSelect"}
            label={"Multi Values ControlledMultiSearchSelect"}
            multiple={true}
            sx={{ mt: 5 }}
            disableCloseOnSelect={true}
            rules={{
              required: {
                value: true,
                message: "Por favor informe um valor",
              },
            }}
            fixedOptions={fixedOptions}
          />

          <Controller
            name={"inputField"}
            control={control}
            rules={{
              required: {
                message: "Seleciona alguma coisa ai",
                value: true,
              },
            }}
            defaultValue={""}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => {
              return (
                <Input
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  label={"Text Field"}
                  placeholder={"Digite um texto"}
                  sx={{ mt: 5 }}
                  error={error}
                />
              );
            }}
          />

          <ControlledInput
            control={control}
            name={"controlledInput"}
            label={"Controlled Input"}
            placeholder={"Digite um texto"}
            helperText={"Helpeeeer"}
            sx={{ mt: 5 }}
          />

          <Button variant={"contained"} sx={{ mt: 5 }} type={"submit"}>
            Enviar
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default App;
