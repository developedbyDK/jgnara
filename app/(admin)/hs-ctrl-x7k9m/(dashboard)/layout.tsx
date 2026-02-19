import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar";
import { AdminHeader } from "@/components/admin/layout/admin-header";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "admin") {
    redirect("/hs-ctrl-x7k9m/login");
  }

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <AdminSidebar user={{ email: user.email ?? "" }} />
        <SidebarInset>
          <AdminHeader />
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
