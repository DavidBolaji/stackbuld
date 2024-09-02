"use client";
import { Category } from "@prisma/client";
import { Field, Form, Formik } from "formik";
import React from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "../../button/button";
import  StyledInput  from "../../input/styled-input";
import { initialValues, validationSchema } from "./validation-product-form";
import Uploadcomponent from "../upload-component/upload-component";
import StyledSelectInput from "@/components/input/styled-select-input";
import { ICreateProduct } from "./create-product.interface";
import { useNotificationContext } from "@/components/notification/notification-context";
import { sleep } from "@/libs/helpers";
import { LuAsterisk } from "react-icons/lu";

const CreateProductForm: React.FC<{ categories: Category[] }> = ({
  categories,
}) => {
  const router = useRouter();
  const { handleShowNotification, setMessage } = useNotificationContext();

  const onSubmit = async (value: ICreateProduct) => {
    try {
      await axios.post("/api/product", value);
      setMessage("Creation Succesful");
      await sleep(3000);
      handleShowNotification();
      await sleep(4000);
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto pt-10 space-y-8 pb-40"
        >
          <div className="flex gap-2 items-center italic">
            <LuAsterisk color="red" size={14}  />
            <p className="-mt-0.5">Image is required</p>
          </div>
          <Field name="img" as={Uploadcomponent} />
          <div>
            <Field
              type="text"
              name="title"
              as={StyledInput}
              placeholder="Enter Title"
            />
          </div>
          <div>
            <Field
              type="number"
              step="0.01"
              name="price"
              as={StyledInput}
              placeholder="Enter Price"
            />
          </div>
          <div>
            <Field
              name="category"
              as={StyledSelectInput}
              options={categories}
            />
          </div>

          <Button disabled={isSubmitting} type="submit" loading={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { CreateProductForm };
