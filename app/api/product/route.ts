import prisma from "@/db/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  try {
    const products = await prisma.product.findMany({});
   
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { title, price, img, category } = await req.json();
  const newPrice = String(Number(price).toFixed(2))

  try {
    const products = await prisma.product.create({
      data: {
        title,
        price: +newPrice,
        img,
        catId: category,
      },
    });
   
    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


