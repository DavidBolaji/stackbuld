"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { Category, Product as PrismaProduct } from "@prisma/client";
import { IProductContext } from "./product.interface";


const ProductContext = createContext<IProductContext>({
  isEditing: false,
  setIsEditing: () => null,
  product: {
    id: "",
    img: "",
    title: "",
    catId: "",
    category: { name: "" },
    price: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setProduct: () => null,
});

export const useProductContext = () => useContext(ProductContext);

export const Product: React.FC<
  PropsWithChildren & { prod: PrismaProduct & { category: Partial<Category> } }
> = ({ children, prod }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [product, setProduct] = useState<
    PrismaProduct & { category: Partial<Category> }
  >(prod);

  return (
    <ProductContext.Provider
      value={{
        isEditing,
        setIsEditing,
        product,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
};