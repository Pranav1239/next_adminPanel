import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
//test
