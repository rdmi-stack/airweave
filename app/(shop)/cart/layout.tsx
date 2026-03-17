import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your AIRWEAVE shopping cart. Free shipping on orders over ₹2,999.",
  robots: { index: false, follow: true },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
