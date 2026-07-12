import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  // Basic validation
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  // Checks if the email is already in use
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "This email is already registered." },
      { status: 400 }
    );
  }

  // Hashes the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creates the user in the database
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    { id: user.id, name: user.name, email: user.email },
    { status: 201 }
  );
}