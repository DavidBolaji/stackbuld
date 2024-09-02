"use client";
import { ISelect } from "@/components/input/styled-select-input";
import { useProductContext } from "./product-context";
import { Form, Formik } from "formik";
import { productKeys } from "./product.interface";
import { Category } from "@prisma/client";

export const Select: React.FC<ISelect> = ({ options, ...rest }) => {
  const { product, setProduct, isEditing } = useProductContext();
  const { className, name, ...prop } = rest;

  const handleUpdate = (value: string) => {
    setProduct((prev) => {
      return {
        ...prev,
        [name!]: {
          name: value,
        },
      };
    });
  };

  return (
    <Formik
      initialValues={{
        [name!]: (product![name as unknown as productKeys] as Category).name,
      }}
      onSubmit={() => {}}
    >
      {({ setFieldValue, values }) => (
        <Form className="block">
          <label
            htmlFor={name!}
            className={`capitalize inline-block mb-2 text-xs font-bold ml-1`}
          >
            {name}
          </label>
          <select
            defaultValue={values[name!] as string}
            onChange={(e) => {
              setFieldValue(name!, e.target.value);
              handleUpdate(e.target.value);
            }}
            className={`rounded-lg px-2 capitalize text-md outline-none focus:border-orange-500 font-bold h-10 w-full ${
              isEditing ? "border-2 bg-white" : "bg-[#fafafa]"
            } ${className}`}
            disabled={!isEditing}
            {...prop}
          >
             {options.map((opt) => (
              <option key={opt.id} className="capitalize" value={opt.name}>
                {opt.name}
              </option>
            ))}
          </select>
        </Form>
      )}
    </Formik>
  );
};
