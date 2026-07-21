"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowDownToLine, ArrowUpFromLine, Wallet as WalletIcon } from "lucide-react";"lucide-react";

interface Account {
  id: string;
  name: string;
}

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  categoryBreakdown: { name: string; value: number }[];
}

const CHART_COLORS = ["#2DD4BF", "#818CF8", "#FB7185", "#FBBF24", "#60A5FA", "#A78BFA"];

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);

  async function loadAccounts() {
    const response = await fetch("/api/accounts");
    setAccounts(await response.json());
  }

  async function loadSummary() {
    const response = await fetch("/api/summary");
    setSummary(await response.json());
  }

  useEffect(() => {
    loadAccounts();
    loadSummary();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Something went wrong.");
      return;
    }

    setName("");
    loadAccounts();
  }

  return (
    <div className="p-10 max-w-5xl">
      <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#F4F6F8] mb-8">
        Overview
      </h1>

      {summary && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <SummaryCard
            label="Income"
            value={summary.totalIncome}
            icon={<ArrowDownToLine size={16} className="text-[#2DD4BF]" />}   // Income
            accent="#2DD4BF"
          />
          <SummaryCard
            label="Expense"
            value={summary.totalExpense}
            icon={<ArrowUpFromLine size={16} className="text-[#FB7185]" />}   // Expense
            accent="#FB7185"
          />
          <SummaryCard
            label="Balance"
            value={summary.balance}
            icon={<WalletIcon size={16} className="text-[#818CF8]" />}
            accent="#818CF8"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-10">
        {/* Chart panel */}
        <div className="bg-[#131A22] border border-[#232E3A] rounded-2xl p-6">
          <p className="text-sm text-[#8A98A8] mb-4">Spending by category</p>
          {summary && summary.categoryBreakdown.length > 0 ? (
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summary.categoryBreakdown}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {summary.categoryBreakdown.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: "#0B0F14", border: "1px solid #232E3A", borderRadius: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-[#8A98A8] py-16 text-center">No expenses yet.</p>
          )}
        </div>

        {/* Accounts panel */}
        <div className="bg-[#131A22] border border-[#232E3A] rounded-2xl p-6">
          <p className="text-sm text-[#8A98A8] mb-4">Accounts</p>

          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="New account"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-[#0B0F14] border border-[#232E3A] rounded-lg px-3 py-2 text-sm text-[#F4F6F8] placeholder-[#8A98A8] outline-none focus:border-[#2DD4BF]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#2DD4BF] text-[#0B0F14] text-sm font-semibold"
            >
              Add
            </button>
          </form>

          {error && <p className="text-[#FB7185] text-sm mb-2">{error}</p>}

          <ul className="flex flex-col gap-2">
            {accounts.map((account) => (
              <li
                key={account.id}
                className="flex items-center gap-2 text-sm text-[#F4F6F8] px-3 py-2 bg-[#0B0F14] rounded-lg"
              >
                <WalletIcon size={14} className="text-[#8A98A8]" />
                {account.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="bg-[#131A22] border border-[#232E3A] rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}1A` }}
        >
          {icon}
        </div>
        <span className="text-sm text-[#8A98A8]">{label}</span>
      </div>
      <p className="font-[family-name:var(--font-mono)] text-2xl text-[#F4F6F8] tabular-nums">
        {value.toFixed(2)}
      </p>
    </div>
  );
}