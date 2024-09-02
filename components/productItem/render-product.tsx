import React from "react";
import * as Product from "./product/index";
import { Category, Product as PrismaProduct } from "@prisma/client";
import VHS from "../vhs/vhs";
import DeleteProduct from "./delete-product";

const RenderProduct: React.FC<{
  product: PrismaProduct & { category: Partial<Category> };
  categories: Category[];
}> = ({ product, categories }) => {
  return (
    <div className="relative">
      <div className="md:h-[488px] md:absolute min-w-screen-2xl w-full h-1/4 md:w-1/2 mt-28 z-30">
        <VHS img={product.img} cate={product.category.name!} />
      </div>
      <Product.Product prod={product}>
        <div className=" grid md:grid-cols-4 grid-cols-2 bg-white shadow rounded-2xl p-2 md:p-8">
          <div className="col-span-2 pr-10 space-y-4 z-50 md:z-0">
            <div className="flex gap-2 justify-between z-30">
              <Product.Input type="text" className="w-full" name={"title"} />
              <Product.Input
                className="w-20 block"
                type="number"
                name={"price"}
              />
            </div>
            <div className="md:absolute relative md:bottom-12 md:w-1/4 md:pr-20 z-30 md:z-[1000]">
              <Product.Select options={categories} name={"category"} />
            </div>
            <div className="md:absolute md:bottom-12 md:right-1/2 md:pr-10 z-30 md:z-[3000] md:pb-0 md:pt-0 pb-10 pt-6">
              <Product.PButton>Update</Product.PButton>
            </div>
          </div>
          <div className="col-span-2 w-full h-full md:order-last order-first">
            <div className="flex justify-end space-x-3 items-center mb-3">
              <Product.Toggle />
              <DeleteProduct productId={product.id} />
            </div>
            <div className="relative bg-[#fcf8f5] rounded-2xl flex items-center justify-center px-4 md:px-8 py-8">
              <Product.PImage />
            </div>
          </div>
        </div>
      </Product.Product>
    </div>
  );
};

export default RenderProduct;
