import { NextResponse } from "next/server";
import prisma from "@/db/db";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { title, price, img, category } = await req.json();
    const newPrice = String(Number(price).toFixed(2))
   

    if (!params.productId)
      return new NextResponse("Product id is required", { status: 400 });

    const cat = await prisma.category.findMany({
      where: {
        name: category,
      },
    });

    const product = await prisma.product.update({
      where: {
        id: params.productId,
      },
      data: { title, price: +newPrice, img, catId: cat[0].id },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId)
      return new NextResponse("Product id is required", { status: 400 });

    const product = await prisma.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
