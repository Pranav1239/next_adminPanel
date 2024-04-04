import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const category = await prisma.category.findMany({
    include: {
      subcategories: {
        select: {
          categoryId: true,
          category: true,
          description: true,
          name: true,
          id: true,
        },
      },
    },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: { name, description },
  });

  return NextResponse.json(category, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  await prisma.category.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Category deleted successfully" });
}
