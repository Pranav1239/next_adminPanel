import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Product } from "@prisma/client";

type ProductData = {
  name: string;
  description?: string;
  price: string;
  subcategoryId: number;
};

interface QueryParams {
  page?: string;
  cat?: string;
  search?: string;
}

interface ProductResponse {
  products: Product[];
  currentPage: number;
  totalPages: number;
  status: number;
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, subcategoryId }: ProductData =
      await req.json();

    const priceNumber = parseInt(price);

    // Create a new product
    const newProduct: Product = await prisma.product.create({
      data: {
        name,
        description,
        price: priceNumber,
        subcategoryId,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams: QueryParams = Object.fromEntries(searchParams.entries());
    const page = parseInt(queryParams.page || "1");
    const cat = queryParams.cat;
    const search = queryParams.search || "";
    const POSTS_PER_PAGE = 3;
    const skip = POSTS_PER_PAGE * (page - 1);

    const products = await prisma.product.findMany({
      take: POSTS_PER_PAGE,
      skip,
      orderBy: { createdDate: "desc" },
      where: {
        subcategoryId: cat ? parseInt(cat) : undefined,
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      },
      include: {
        subcategory: true,
        FeaturedProduct: true,
        SecondFeaturedProduct: true,
      },
    });
    const totalProducts = await prisma.product.count({
      where: {
        subcategoryId: cat ? parseInt(cat) : undefined,
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      },
    });
    const totalPages = Math.ceil(totalProducts / POSTS_PER_PAGE);
    const response: ProductResponse = {
      products,
      currentPage: page,
      totalPages,
      status: 200,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
