import { Input, type InputProps } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { Field } from "../ui/field";

type TextFieldProps = InputProps & {
  name: string;
  label: string;
};

export const TextField: React.FC<TextFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const isInvalid = !!(meta.touched && meta.error);

  return (
    <Field
      id={props.name}
      invalid={isInvalid}
      required={props.required}
      label={label}
      errorText={meta.error}
    >
      <Input {...field} {...props} />
    </Field>
  );
};
