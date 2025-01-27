import React from "react";
import { ErrorMessage, useField } from "formik";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  type: string;
};

const FormInput = ({ name, ...props }: Props) => {
  const [field] = useField(name);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold dark:text-white">
        {props.label}
      </label>
      <input
        id={name}
        {...props}
        {...field}
        className="w-full rounded-lg border p-2 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="text-sm font-semibold italic text-red-500">{msg}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default FormInput;
