import prisma from "@/db/db";
import { MetadataRoute } from "next";

const BASE_URL = "https://bolaji-stackbuld-test.netlify.app";

export async function generateSitemaps() {
  const product = await prisma.product.findMany({
    select: {
      id: true,
    },
  });
  return product;
}

export default async function sitemap({id}: {id: string}): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({});

  return products.map((product) => ({
    url: `${BASE_URL}/product/${product.id}`,
    lastModified: product.updatedAt,
  }))
}
