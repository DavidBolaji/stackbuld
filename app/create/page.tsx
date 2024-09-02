import { getCategories } from "@/actions/get-categories";
import {CreateProductForm }from "@/components/form/create-product-form/create-product-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create",
  description:
    "Create product page",
};

const CreateProductPage = async () => {
  const categories = await getCategories()
  return <CreateProductForm categories={categories} />
};

export default CreateProductPage;
