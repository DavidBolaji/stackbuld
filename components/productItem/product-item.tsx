import { formatNumber } from "@/libs/helpers";
import { Category, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const Productitem: React.FC<(Product & {category: Partial<Category>})> = ({
  id,
  img,
  title,
  category,
  price,
}) => {
  return (
    <div className="col-span-2 w-full border rounded-2xl group hover:shadow-lg overflow-hidden">
      <div>
        <div className="w-full h-72 rounded-b-2xl overflow-hidden relative">
          <div className="bg-black w-full h-full absolute top-0 bottom-0 z-10 transition-transform duration-300 group-hover:opacity-10 opacity-30" />
          <Image
            src={img}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            alt={title}
          />
        </div>
        <div className="p-6">
          <p className="text-gray-500 text-sm capitalize">{category.name}</p>
          <Link
            className="font-extrabold text-md hover:underline transition-all duration-300"
            href={`/product/${id}?cat=${category.name}`}
          >
            {title}
          </Link>
          <p className="text-orange-500 font-bold">
            $ {formatNumber(price, "USD", {})}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Productitem;
