import React from "react";

import RenderProduct from "@/components/productItem/render-product";
import { notFound } from "next/navigation";
import { getSingleProduct } from "@/actions/get-products";
import { getCategories } from "@/actions/get-categories";
import { Product } from "@prisma/client";
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamicParams = true;

export async function generateStaticParams() {
  let products = await axios.get(`${process.env.NEXT_PUBLIC_DEV}/product`);
  return products.data.map((product: Product) => ({
    id: product.id,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const product = await getSingleProduct(id);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  if (!product) {
    return {
      title: "Not Found",
      description: `Product does not exist`,
    };
  }

  return {
    title: product?.title,
    description: `The cost of ${product.title} product is ${String(
      product?.price
    )}`,
    openGraph: {
      images: [product?.img, ...previousImages],
    },
  };
}

const ProductSinglePage: React.FC<Props> = async ({ params }) => {
  const productId = params.id;
  const prod = getSingleProduct(productId);
  const cat = getCategories();

  const [product, categories] = await Promise.all([prod, cat]);

  if (!product) return notFound();
  return (
    <>
      <div className="mt-20" />
      <RenderProduct product={product} categories={categories} />
    </>
  );
};

export default ProductSinglePage;
