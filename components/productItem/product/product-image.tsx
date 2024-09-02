"use client"
import { ChangeEvent, useRef, useState } from "react";
import { useProductContext } from "./product-context";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import Cloudinary from "@/axios/cloudinary";

export const PImage = () => {
  const { product, isEditing, setProduct } = useProductContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    inputRef.current?.click();
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading((prev) => !prev);
    const inputElement = event.target;
    const files = inputElement.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append(
        "upload_preset",
        `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`
      );

      try {
        const response = await Cloudinary.post("/auto/upload", formData);
        const { secure_url } = response.data;
        setProduct((prev) => {
          return {
            ...prev,
            img: secure_url,
          };
        });
      } catch (error: any) {
      } finally {
        setLoading((prev) => !prev);
      }
    }
  };

  return (
    <div
      onClick={() => isEditing && handleEdit()}
      className="relative w-[90vw] h-[80vh] flex items-center justify-center  md:w-[500px] md:h-[500px] overflow-hidden"
    >
      {isEditing && (
        <div className="absolute w-full h-full bg-black flex items-center rounded-2xl justify-center z-20 opacity-45">
          {loading ? "" : <FaPlus size={24} color="white" />}
        </div>
      )}
      <Image
        src={product.img}
        alt={product.category.name!}
        width={400}
        height={400}
        priority
        className="rounded-2xl overflow-hidden object-contain"
      />
      <input
        ref={inputRef}
        type="file"
        accept=".png, .jpg, .jpeg"
        hidden
        onChange={handleUpload}
      />
    </div>
  );
};
