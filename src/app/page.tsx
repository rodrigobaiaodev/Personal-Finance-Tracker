import Link from "next/link";
import { ArrowRight, ShieldCheck, PieChart, Wallet } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#F4F6F8]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-[#2DD4BF] flex items-center justify-center text-[#0B0F14] font-bold text-sm">
            F
          </div>
          <span className="font-[family-name:var(--font-sora)] font-semibold tracking-tight">
            Finance
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-[#8A98A8] hover:text-[#F4F6F8] transition">
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm bg-[#2DD4BF] text-[#0B0F14] font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="font-[family-name:var(--font-sora)] text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-5">
            Know exactly where your money goes.
          </h1>
          <p className="text-[#8A98A8] text-lg mb-8 leading-relaxed">
            Track accounts, categorize every transaction, and see your spending
            broken down at a glance — all in one clean dashboard.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="flex items-center gap-2 bg-[#2DD4BF] text-[#0B0F14] font-semibold px-5 py-3 rounded-lg hover:brightness-110 transition"
            >
              Start for free <ArrowRight size={16} />
            </Link>
            <Link href="/login" className="text-sm text-[#8A98A8] hover:text-[#F4F6F8] transition">
              I already have an account
            </Link>
          </div>
        </div>

        {/* Dashboard preview mock */}
        <div className="bg-[#131A22] border border-[#232E3A] rounded-2xl p-6 shadow-2xl">
          <p className="text-sm text-[#8A98A8] mb-4">This month</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-[#0B0F14] rounded-xl p-3">
              <p className="text-xs text-[#8A98A8] mb-1">Income</p>
              <p className="font-[family-name:var(--font-mono)] text-[#2DD4BF] text-lg">2,450.00</p>
            </div>
            <div className="bg-[#0B0F14] rounded-xl p-3">
              <p className="text-xs text-[#8A98A8] mb-1">Expense</p>
              <p className="font-[family-name:var(--font-mono)] text-[#FB7185] text-lg">1,180.00</p>
            </div>
            <div className="bg-[#0B0F14] rounded-xl p-3">
              <p className="text-xs text-[#8A98A8] mb-1">Balance</p>
              <p className="font-[family-name:var(--font-mono)] text-[#818CF8] text-lg">1,270.00</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-32">
            <div className="w-28 h-28 rounded-full border-[14px] border-[#2DD4BF]" style={{ borderRightColor: "#818CF8", borderBottomColor: "#FB7185" }} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-[#232E3A] grid md:grid-cols-3 gap-8">
        <Feature
          icon={<Wallet size={20} className="text-[#2DD4BF]" />}
          title="Multiple accounts"
          description="Keep wallet, bank and credit card balances organized separately, all in one place."
        />
        <Feature
          icon={<PieChart size={20} className="text-[#818CF8]" />}
          title="Category breakdown"
          description="See exactly where your money goes with a live chart of your spending by category."
        />
        <Feature
          icon={<ShieldCheck size={20} className="text-[#FB7185]" />}
          title="Your data, protected"
          description="Every account is private. Passwords are hashed, sessions are secure, and your data never mixes with anyone else's."
        />
      </section>

      <footer className="max-w-6xl mx-auto px-8 py-8 border-t border-[#232E3A] text-sm text-[#8A98A8]">
        Built with Next.js, Prisma and PostgreSQL.
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div className="w-10 h-10 rounded-lg bg-[#131A22] border border-[#232E3A] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-[family-name:var(--font-sora)] font-semibold mb-2">{title}</h3>
      <p className="text-sm text-[#8A98A8] leading-relaxed">{description}</p>
    </div>
  );
}