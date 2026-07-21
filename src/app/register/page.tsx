"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Something went wrong.");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-8 h-8 rounded-md bg-[#2DD4BF] flex items-center justify-center text-[#0B0F14] font-bold text-sm">
            F
          </div>
          <span className="font-[family-name:var(--font-sora)] font-semibold text-[#F4F6F8] text-lg tracking-tight">
            Finance
          </span>
        </div>

        <div className="bg-[#131A22] border border-[#232E3A] rounded-2xl p-8">
          <h1 className="font-[family-name:var(--font-sora)] text-xl font-semibold text-[#F4F6F8] mb-1">
            Create account
          </h1>
          <p className="text-sm text-[#8A98A8] mb-6">Start tracking your finances</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#0B0F14] border border-[#232E3A] rounded-lg px-3 py-2.5 text-sm text-[#F4F6F8] placeholder-[#8A98A8] outline-none focus:border-[#2DD4BF]"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#0B0F14] border border-[#232E3A] rounded-lg px-3 py-2.5 text-sm text-[#F4F6F8] placeholder-[#8A98A8] outline-none focus:border-[#2DD4BF]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#0B0F14] border border-[#232E3A] rounded-lg px-3 py-2.5 text-sm text-[#F4F6F8] placeholder-[#8A98A8] outline-none focus:border-[#2DD4BF]"
            />

            <button
              type="submit"
              className="mt-2 bg-[#2DD4BF] text-[#0B0F14] font-semibold text-sm py-2.5 rounded-lg hover:brightness-110 transition"
            >
              Create account
            </button>

            {error && <p className="text-[#FB7185] text-sm text-center">{error}</p>}
          </form>

          <p className="text-sm text-[#8A98A8] text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#2DD4BF] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}