import { IButton } from "@/components/button/button";
import { Category, Product } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export interface IProductContext {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  product: Product & { category: Partial<Category> };
  setProduct: Dispatch<
    SetStateAction<Product & { category: Partial<Category> }>
  >;
}

export type productKeys = "img" | "title" | "category" | "price";

type T = Omit<IButton, "loading">;

export interface IPButton extends T {}
