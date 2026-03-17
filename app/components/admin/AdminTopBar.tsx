"use client";

import { usePathname } from "next/navigation";
import { useAdminStore } from "@/lib/admin-store";

export default function AdminTopBar() {
  const pathname = usePathname();
  const { adminUser, adminLogout } = useAdminStore();

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    isLast: i === segments.length - 1,
  }));

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-neutral-200 px-6 py-3 flex items-center justify-between">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span className="text-neutral-300">/</span>}
            <span className={crumb.isLast ? "text-neutral-900 font-medium" : ""}>
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {adminUser && (
          <span className="text-sm text-neutral-600">
            {adminUser.name}
          </span>
        )}
        <button
          onClick={adminLogout}
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
