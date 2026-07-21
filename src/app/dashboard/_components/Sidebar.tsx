"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, Tags } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-60 border-r border-[#232E3A] p-5 flex flex-col gap-1">
      <div className="flex items-center gap-2.5 mb-10 px-1">
        <div className="w-7 h-7 rounded-md bg-[#2DD4BF] flex items-center justify-center text-[#0B0F14] font-bold text-sm">
          F
        </div>
        <span className="font-[family-name:var(--font-sora)] font-semibold text-[#F4F6F8] tracking-tight">
          Finance
        </span>
      </div>

      <NavLink href="/dashboard" icon={<LayoutDashboard size={17} />} label="Overview" />
      <NavLink href="/dashboard/transactions" icon={<ArrowLeftRight size={17} />} label="Transactions" />
      <NavLink href="/dashboard/categories" icon={<Tags size={17} />} label="Categories" />
    </aside>
  );
}

function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "bg-[#131A22] text-[#F4F6F8] border-l-2 border-[#2DD4BF]"
          : "text-[#8A98A8] hover:text-[#F4F6F8] hover:bg-[#131A22]"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}