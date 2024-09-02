"use client";
import { MouseEvent, PropsWithChildren, useState } from "react";
import { IPButton } from "./product.interface";
import { useProductContext } from "./product-context";
import { useRouter } from "next/navigation";
import axios from "axios";
import Button from "@/components/button/button";
import { useNotificationContext } from "@/components/notification/notification-context";
import { sleep } from "@/libs/helpers";

// Product button
export const PButton: React.FC<IPButton & PropsWithChildren> = ({
  children,
  ...rest
}) => {
  const { isEditing, setIsEditing, product } = useProductContext();
  const {setMessage, handleShowNotification} = useNotificationContext()
  const router = useRouter();
  const { className, ...prop } = rest;
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    try {
      await axios.patch(`/api/product/${product.id}`, {
        title: product.title,
        price: product.price,
        img: product.img,
        category: product.category.name,
      });
      setMessage("Product Update Succesfull")
      await sleep(3000)
      setIsEditing(false);
      handleShowNotification();
      router.refresh();
    } catch (error) {
      console.error("Request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return isEditing ? (
    <Button
      loading={loading}
      onClick={handleClick}
      className={className}
      {...prop}
    >
      {children}
    </Button>
  ) : null;
};
// w-full bg-black px-20 py-2 rounded-lg text-white hover:scale-[1.01] transition-all duration-500 ${className}
