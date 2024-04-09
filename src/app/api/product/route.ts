import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Product } from "@prisma/client";

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

interface ProductData {
  name: string;
  description?: string;
  price: string; // Use number type for price
  subcategoryId: number;
  images: string[]; // Correct type for images
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, subcategoryId, images }: ProductData =
      await req.json();

    const newPrice = parseInt(price);
    // Create a new product
    const newProduct: Product = await prisma.product.create({
      data: {
        name,
        description,
        price: newPrice,
        subcategoryId,
        images: {
          createMany: {
            data: images.map((img: any) => ({
              url: img.url,
              publicId: "abc",
            })),
            skipDuplicates: true,
          },
        },
      },
    });
    return NextResponse.json({ product: newProduct }, { status: 201 });
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
    const POSTS_PER_PAGE = 28;
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
        images: true,
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
