import { auth } from "@/auth";
import { Sidebar } from "./_components/Sidebar";
import { Topbar } from "./_components/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-[#0B0F14]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar
          name={session?.user?.name || "User"}
          email={session?.user?.email || ""}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}