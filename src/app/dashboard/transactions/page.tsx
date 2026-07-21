"use client";

import { useState, useEffect } from "react";
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

interface Account {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: string;
  date: string;
  account: Account;
  category: Category;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [accountId, setAccountId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");

  async function loadTransactions() {
    const response = await fetch("/api/transactions");
    setTransactions(await response.json());
  }
  async function loadAccounts() {
    const response = await fetch("/api/accounts");
    setAccounts(await response.json());
  }
  async function loadCategories() {
    const response = await fetch("/api/categories");
    setCategories(await response.json());
  }

  useEffect(() => {
    loadTransactions();
    loadAccounts();
    loadCategories();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, amount, type, accountId, categoryId }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Something went wrong.");
      return;
    }

    setDescription("");
    setAmount("");
    loadTransactions();
  }

  const inputStyle =
    "bg-[#0B0F14] border border-[#232E3A] rounded-lg px-3 py-2 text-sm text-[#F4F6F8] placeholder-[#8A98A8] outline-none focus:border-[#2DD4BF]";

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#F4F6F8] mb-8">
        Transactions
      </h1>

      <div className="bg-[#131A22] border border-[#232E3A] rounded-2xl p-6 mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          <select value={accountId} onChange={(e) => setAccountId(e.target.value)} className={inputStyle}>
            <option value="">Select account</option>
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputStyle}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputStyle}
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputStyle}
          />

          <select value={type} onChange={(e) => setType(e.target.value)} className={inputStyle}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#2DD4BF] text-[#0B0F14] text-sm font-semibold"
          >
            Add Transaction
          </button>
        </form>

        {error && <p className="text-[#FB7185] text-sm mt-3">{error}</p>}
      </div>

      <div className="bg-[#131A22] border border-[#232E3A] rounded-2xl overflow-hidden">
        {transactions.length === 0 ? (
          <p className="text-sm text-[#8A98A8] text-center py-10">No transactions yet.</p>
        ) : (
          <ul>
            {transactions.map((t) => {
              const isIncome = t.type === "income";
              return (
                <li
                  key={t.id}
                  className="flex items-center justify-between px-5 py-4 border-l-2"
                  style={{ borderLeftColor: isIncome ? "#2DD4BF" : "#FB7185" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: isIncome ? "#2DD4BF1A" : "#FB71851A" }}
                    >
                      {isIncome ? (
                       <ArrowDownToLine size={15} className="text-[#2DD4BF]" />
                          ) : (
                        <ArrowUpFromLine size={15} className="text-[#FB7185]" />
                          )}
                    </div>
                    <div>
                      <p className="text-sm text-[#F4F6F8]">{t.description}</p>
                      <p className="text-xs text-[#8A98A8]">
                        {t.account.name} · {t.category.name}
                      </p>
                    </div>
                  </div>
                  <p
                    className="font-[family-name:var(--font-mono)] text-sm tabular-nums"
                    style={{ color: isIncome ? "#2DD4BF" : "#FB7185" }}
                  >
                    {isIncome ? "+" : "−"}{t.amount.toFixed(2)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}