"use client";

import { useState, useEffect } from "react";

interface Account {
  id: string;
  name: string;
}

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Loads the accounts when the page opens
  async function loadAccounts() {
    const response = await fetch("/api/accounts");
    const data = await response.json();
    setAccounts(data);
  }

  useEffect(() => {
    loadAccounts();
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
    loadAccounts(); // reloads the list after creating
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 500, margin: "0 auto" }}>
      <h1>My Accounts</h1>

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