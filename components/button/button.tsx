import { cn } from "@/libs/helpers";
import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";
import Loader from "../loader/loader";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

const Button: React.FC<IButton & PropsWithChildren> = ({
  children,
  loading = false,
  ...rest
}) => {
  const { className, ...prop } = rest;
  return (
    <button
      {...prop}
      className={cn(
        "w-full bg-black md:px-20 sm:px-10 px-5 py-2 rounded-lg disabled:bg-transparent disabled:border disabled:border-gray-300 text-white hover:scale-[1.01] transition-all duration-500",
        className
      )}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
