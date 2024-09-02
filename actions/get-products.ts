import prisma from "@/db/db";
import { Category, Product } from "@prisma/client";

interface GetProductsParams {
  categories?: string[]; // Array of category names to filter by
  minPrice?: number; // Minimum price for filtering
  maxPrice?: number; // Maximum price for filtering
  page?: number; // Page number for pagination
  limit?: number; // Number of items per page
}

export const getProducts = async ({
  categories,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
}: GetProductsParams): Promise<(Product & { category: Partial<Category> })[]> => {
  const skip = (page - 1) * limit;

  // Build the `where` clause conditionally
  const whereClause: any = {};

  if (categories && categories.length > 0 && categories[0].trim().length !== 0) {
    whereClause.category = {
      name: {
        in: categories,
      },
    };
  }

  if (minPrice !== undefined && maxPrice !== undefined) {
    whereClause.price = minPrice !== maxPrice 
      ? { gte: minPrice, lte: maxPrice } 
      : { gte: minPrice };
  }

  // Query the products with the constructed `where` clause
  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
    skip,
    take: limit,
  });

  return products ?? [];
};


export const getSingleProduct = async (
  prodId: string
): Promise<(Product & { category: Partial<Category> }) | null> => {
  const products = await prisma.product.findUnique({
    where: {
      id: prodId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return products ?? null;
};
