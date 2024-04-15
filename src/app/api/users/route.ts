import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({});

  if (!users) {
    return NextResponse.json({ error: "users not found" }, { status: 404 });
  }

  return NextResponse.json(users);
}
