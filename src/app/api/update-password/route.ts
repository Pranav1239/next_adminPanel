import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  const { token, newPassword } = await request.json();

  const session = await prisma.session.findUnique({
    where: {
      sessionToken: token,
    },
    include: {
      user: true,
    },
  });

  if (!session || session.expires < new Date()) {
    return new NextResponse("Invalid or expired token", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.session.delete({
    where: {
      id: session.id,
    },
  });

  return new NextResponse("Password updated successfully", { status: 200 });
};
