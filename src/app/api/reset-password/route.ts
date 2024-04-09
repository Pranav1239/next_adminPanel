import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server"


export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.error("Error on Reset Password:", error);
    return NextResponse.json(
      { error: "Failed to Reset Password" },
      { status: 500 }
    );
  }
}
