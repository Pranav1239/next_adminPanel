import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// GET
export async function GET(req: NextRequest) {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: {
        category: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(req: NextRequest) {
  const { name, description, categoryId } = await req.json();

  if (!name || !categoryId) {
    return NextResponse.json(
      { error: "Name and categoryId are required" },
      { status: 400 }
    );
  }

  // Convert categoryId to a number
  const categoryIdNum = Number(categoryId);

  const category = await prisma.category.findUnique({
    where: { id: categoryIdNum },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const subcategory = await prisma.subcategory.create({
    data: {
      name,
      description,
      categoryId: categoryIdNum,
    },
  });

  return NextResponse.json(subcategory, { status: 201 });
}

// DELTE

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  const categoryId = parseInt(id); // Convert id to a number

  const category = await prisma.subcategory.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const deletedSubcategory = await prisma.subcategory.delete({
    where: {
      id: categoryId, // Use categoryId instead of id
    },
  });

  return NextResponse.json({ message: "Category deleted successfully" });
}
