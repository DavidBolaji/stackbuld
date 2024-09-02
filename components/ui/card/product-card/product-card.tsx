import Productitem from "@/components/productItem/product-item";
import { Category, Product } from "@prisma/client";
import React from "react";

const ProductCard: React.FC<{
  products: (Product & { category: Partial<Category> })[];
}> = ({ products }) => {
  const productItem = products.map(
    ({ id, img, title, category, price, createdAt, updatedAt, catId }) => (
      <Productitem
        id={id}
        key={id}
        img={img}
        title={title}
        category={category}
        price={price}
        createdAt={createdAt}
        updatedAt={updatedAt}
        catId={catId}
      />
    )
  );
  return productItem;
};

export default ProductCard;
