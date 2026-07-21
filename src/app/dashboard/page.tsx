"use client";

import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

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

const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"];

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);

  async function loadAccounts() {
    const response = await fetch("/api/accounts");
    const data = await response.json();
    setAccounts(data);
  }

  async function loadSummary() {
    const response = await fetch("/api/summary");
    const data = await response.json();
    setSummary(data);
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
    <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
      <h1>Dashboard</h1>

      {summary && (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          <div style={{ flex: 1, padding: "1rem", background: "#1e293b", borderRadius: 8 }}>
            <p>Income</p>
            <strong style={{ color: "#22c55e" }}>{summary.totalIncome.toFixed(2)}</strong>
          </div>
          <div style={{ flex: 1, padding: "1rem", background: "#1e293b", borderRadius: 8 }}>
            <p>Expense</p>
            <strong style={{ color: "#ef4444" }}>{summary.totalExpense.toFixed(2)}</strong>
          </div>
          <div style={{ flex: 1, padding: "1rem", background: "#1e293b", borderRadius: 8 }}>
            <p>Balance</p>
            <strong>{summary.balance.toFixed(2)}</strong>
          </div>
        </div>
      )}

      {summary && summary.categoryBreakdown.length > 0 && (
        <div style={{ height: 300, marginBottom: "2rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summary.categoryBreakdown}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {summary.categoryBreakdown.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <h2>My Accounts</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Account name (e.g. Wallet, Bank)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {accounts.map((account) => (
          <li key={account.id}>{account.name}</li>
        ))}
      </ul>
    </div>
  );
}