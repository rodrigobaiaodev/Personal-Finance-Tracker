"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
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
            Welcome back
          </h1>
          <p className="text-sm text-[#8A98A8] mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
              Sign in
            </button>

            {error && <p className="text-[#FB7185] text-sm text-center">{error}</p>}
          </form>

          <p className="text-sm text-[#8A98A8] text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#2DD4BF] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}