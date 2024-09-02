import { getProducts } from "@/actions/get-products";
import {Empty} from "@/components/Empty/empty";
import ProductCard from "@/components/ui/card/product-card/product-card";
import { extractMinMax } from "@/libs/helpers";
import Link from "next/link";

interface HomeSearchParams {
  [key: string]: string,
}

export const revalidate = 0;

export default async function Home({searchParams}: {searchParams: HomeSearchParams}) {
  const categories = searchParams.prod_category?.split(",") || [];
  const { min: minPrice, max: maxPrice } = extractMinMax(searchParams?.prod_price);
  const page = parseInt(searchParams.page) || 1;
  const limit = parseInt(searchParams.limit) || 10;

  const products = await getProducts({
    categories: categories.map(el => el.toLowerCase()),
    minPrice,
    maxPrice,
    page,
    limit,
  });

  if (!products.length)
    return (
      <Empty
        link={
          <Link
            href={"/create"}
            className="mt-5 hover:text-black hover:border hover:border-orange-500 hover:bg-white transition-all duration-300 bg-orange-500 text-white px-6 shadow py-2 rounded-lg"
          >
            Create
          </Link>
        }
      />
    );
  return (
    <main className="min-h-screen overflow-auto">
      <div className="mt-20" />
      <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-8">
        <ProductCard products={products} />
      </div>
    </main>
  );
}
