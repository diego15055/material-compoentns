import { useForm, SubmitHandler } from "react-hook-form";

import { options } from "./options";

export const useHelpers = () => {
  const { register, handleSubmit, watch, control, setValue } = useForm<any>();
  const onSubmit: SubmitHandler<any> = (data: any) => console.log(data);

  return {
    options,
    control,
    handleSubmit,
    onSubmit,
    register,
    setValue,
  };
};
