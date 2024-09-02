import { cn } from "@/libs/helpers";
import { useField } from "formik";
import React, { SelectHTMLAttributes } from "react";

export interface ISelect extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { id: string; name: string }[];
}

const StyledSelectInput: React.FC<ISelect> = ({ name, className, options, ...rest }) => {
  const [field, meta] = useField(name!);
  return (
    <>
      <select
        className={cn(
          `rounded-lg bg-[#fafafa] placeholder:font-medium border px-2 text-md outline-none focus:border-orange-500 font-bold h-10 w-full`,
          className
        )}
        {...field}
        {...rest}
      >
        <option key={"1"} className="capitalize font-medium" value="">
          Select {field.name}
        </option>
        {options.map((option) => (
          <option key={option.id} className="capitalize" value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {meta.error && meta.touched && (
        <div className="text-red-600 text-sm ml-1">{meta.error}</div>
      )}
    </>
  );
};

export default StyledSelectInput;
