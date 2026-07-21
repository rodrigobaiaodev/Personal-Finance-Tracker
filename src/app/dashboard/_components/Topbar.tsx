"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function Topbar({ name, email }: { name: string; email: string }) {
  const initial = name?.charAt(0).toUpperCase() || "?";

  return (
    <header className="flex items-center justify-between px-10 py-4 border-b border-[#232E3A]">
      <div />

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm text-[#F4F6F8] leading-tight">{name}</p>
          <p className="text-xs text-[#8A98A8] leading-tight">{email}</p>
        </div>

        <div className="w-9 h-9 rounded-full bg-[#818CF8] flex items-center justify-center text-[#0B0F14] font-semibold text-sm">
          {initial}
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          title="Sign out"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8A98A8] hover:text-[#FB7185] hover:bg-[#131A22] transition-colors"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}