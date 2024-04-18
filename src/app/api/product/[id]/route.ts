import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { useParams } from "next/navigation";

interface MyRouteParams {
  productId: string;
  id: string;
}

export const GET = async (
  req: NextRequest,
  { params }: { params: MyRouteParams }
) => {
  console.log("Params >>>");

  const productId = params?.id;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(productId),
      },
    });

    if (!product) {
      return NextResponse.json({ message: "No Product in that ID" });
    }

    return NextResponse.json({ product: product }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to get product" },
      { status: 500 }
    );
  }
};
