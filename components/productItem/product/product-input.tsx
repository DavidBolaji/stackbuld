"use client";
import { Form, Formik } from "formik";
import { useProductContext } from "./product-context";
import { IInput } from "@/components/input/styled-input";
import { productKeys } from "./product.interface";

export const Input: React.FC<IInput> = ({ ...rest }) => {
  const { product, setProduct, isEditing } = useProductContext();
  const { className, name, ...prop } = rest;

  const handleUpdateProduct = (value: string) => {
    setProduct((prev) => {
      return {
        ...prev,
        [name!]: value,
      };
    });
  };

  return (
    <Formik
      initialValues={{
        [name!]: product![name as unknown as productKeys],
      }}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <Form className="block">
          <label
            htmlFor={name!}
            className={`capitalize inline-block mb-2 text-xs font-bold ml-1`}
          >
            {name}
          </label>
          <input
            defaultValue={values[name!] as string}
            onChange={(e) => {
              setFieldValue(name!, e.target.value);
              handleUpdateProduct(e.target.value);
            }}
            className={`rounded-lg px-2 text-md outline-none focus:border-orange-500 font-bold h-10 w-full ${
              isEditing ? "border-2" : "bg-[#fafafa]"
            } ${className}`}
            disabled={!isEditing}
            {...prop}
            type={isEditing ? prop.type : "text"}
          />
        </Form>
      )}
    </Formik>
  );
};
