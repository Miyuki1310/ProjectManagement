import React from "react";
import { Props } from "./TextAreaInput";
import { ErrorMessage, useField } from "formik";

const SelectInput = ({ name, options, ...props }: Props) => {
  const [field] = useField(name);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold dark:text-white">
        {props.label}
      </label>
      <select
        {...props}
        {...field}
        className="w-full rounded-lg border p-2 outline-none hover:text-gray-200 dark:cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
      >
        {options?.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      <ErrorMessage name={name}>
        {(msg) => (
          <div className="text-sm font-semibold italic text-red-500">{msg}</div>
        )}
      </ErrorMessage>
    </div>
  );
};

export default SelectInput;
