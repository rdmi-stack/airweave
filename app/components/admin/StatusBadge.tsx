"use client";

const statusColors: Record<string, string> = {
  processing: "bg-amber-50 text-amber-700 border-amber-200",
  shipped: "bg-blue-50 text-blue-700 border-blue-200",
  delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function StatusBadge({ status }: { status: string }) {
  const colors = statusColors[status] || "bg-neutral-50 text-neutral-700 border-neutral-200";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors} capitalize`}>
      {status}
    </span>
  );
}
