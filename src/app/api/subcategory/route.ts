import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET /api/subcategories?id=<id>
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Subcategory ID is required" },
      { status: 400 }
    );
  }

  const subcategory = await prisma.subcategory.findUnique({
    where: { id: Number(id) },
    include: { category: true, products: true },
  });

  if (!subcategory) {
    return NextResponse.json(
      { error: "Subcategory not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(subcategory);
}

// POST /api/subcategories
export async function POST(req: NextRequest) {
  const { name, description, categoryId } = await req.json();

  if (!name || !categoryId) {
    return NextResponse.json(
      { error: "Name and categoryId are required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const subcategory = await prisma.subcategory.create({
    data: { name, description, categoryId },
  });

  return NextResponse.json(subcategory, { status: 201 });
}
