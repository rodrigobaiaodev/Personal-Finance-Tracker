import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      account: { userId: session.user.id },
    },
    include: {
      account: true,
      category: true,
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { description, amount, type, accountId, categoryId } = await request.json();

  if (!description || !amount || !type || !accountId || !categoryId) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // Confirms the account belongs to the logged-in user
  const account = await prisma.account.findFirst({
    where: { id: accountId, userId: session.user.id },
  });

  if (!account) {
    return NextResponse.json({ error: "Invalid account." }, { status: 400 });
  }

  // Confirms the category belongs to the logged-in user
  const category = await prisma.category.findFirst({
    where: { id: categoryId, userId: session.user.id },
  });

  if (!category) {
    return NextResponse.json({ error: "Invalid category." }, { status: 400 });
  }

  const transaction = await prisma.transaction.create({
    data: {
      description,
      amount: parseFloat(amount),
      type,
      accountId,
      categoryId,
    },
  });

  return NextResponse.json(transaction, { status: 201 });
}