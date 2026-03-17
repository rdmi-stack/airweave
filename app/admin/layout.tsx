"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAdminStore } from "@/lib/admin-store";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import AdminTopBar from "@/app/components/admin/AdminTopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const adminUser = useAdminStore((s) => s.adminUser);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !adminUser) {
      router.replace("/admin/login");
    }
  }, [isLoginPage, adminUser, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="lg:ml-[260px]">
        <AdminTopBar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
