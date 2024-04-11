import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const POST = async (request: NextRequest) => {
  const { email } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  const resetToken = Math.random().toString(36).slice(2);

  const session = await prisma.session.create({
    data: {
      sessionToken: resetToken,
      userId: user.id,
      expires: new Date(Date.now() + 3600000),
    },
  });

  const transporter = nodemailer.createTransport({});

  const mailOptions = {
    from: "your-email@example.com",
    to: email,
    subject: "Password Reset",
    text: `You have requested a password reset. Please click the following link to reset your password: ${process.env.NEXTAUTH_URL}/password/verifyPassword?token=${session.sessionToken}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new NextResponse("Password reset email sent", { status: 200 });
  } catch (err) {
    return new NextResponse("Failed to send password reset email", {
      status: 500,
    });
  }
};
