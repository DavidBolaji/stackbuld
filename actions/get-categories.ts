import prisma from "@/db/db";
import { Category } from "@prisma/client";

export const getCategories = async (): Promise<Category[]> => {
  const category = await prisma.category.findMany({});
  return category;
};

export const seedCategories = async () => {
  await prisma.category.createMany({
    data: [
      {
        name: "shirt",
      },
      {
        name: "shorts",
      },
      {
        name: "polo",
      },
    ],
  });
};
