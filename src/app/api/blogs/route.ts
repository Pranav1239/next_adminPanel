import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Blog } from ".prisma/client";

interface CreateBlogRequestBody {
  title: string;
  sum1: string;
  sum2: string;
  sum3: string;
  description: string;
  image: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      sum1,
      sum2,
      sum3,
      description,
      image,
    }: CreateBlogRequestBody = await req.json();

    const blog: Blog = await prisma.blog.create({
      data: {
        title,
        summary1: sum1,
        summary2: sum2,
        summary3: sum3,
        image,
        description,
      },
    });

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing blog ID in request" },
        { status: 400 }
      );
    }

    await prisma.blog.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany();

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
