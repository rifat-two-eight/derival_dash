import { Sidebar } from "@/components/layout/Sidebar";
import { TopNavbar } from "@/components/layout/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F5F7] flex font-sans">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <TopNavbar />
        <main className="flex-1 px-8 py-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
