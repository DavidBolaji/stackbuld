import { cn } from "@/libs/helpers";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

const StyledInput: React.FC<IInput> = ({ name, className, ...rest }) => {
  const [field, meta] = useField(name!);
  return (
    <>
      <input
        className={cn(
          `rounded-lg bg-[#fafafa] placeholder:font-medium border px-2 text-md outline-none focus:border-orange-500 font-bold h-10 w-full`,
          className
        )}
        {...field}
        {...rest}
      />
      {meta.error && meta.touched && (
        <div className="text-red-600 text-sm ml-1">{meta.error}</div>
      )}
    </>
  );
};

export default StyledInput;
