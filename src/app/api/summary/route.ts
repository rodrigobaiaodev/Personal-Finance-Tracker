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
      category: true,
    },
  });

  let totalIncome = 0;
  let totalExpense = 0;
  const byCategory: Record<string, number> = {};

  for (const t of transactions) {
    if (t.type === "income") {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;

      // Only expenses go into the category breakdown chart
      const categoryName = t.category.name;
      byCategory[categoryName] = (byCategory[categoryName] || 0) + t.amount;
    }
  }

  const categoryBreakdown = Object.entries(byCategory).map(([name, value]) => ({
    name,
    value,
  }));

  return NextResponse.json({
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    categoryBreakdown,
  });
}