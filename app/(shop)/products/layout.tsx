import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Shop the full AIRWEAVE collection — premium linen shirts, trousers, and more. Filter by category, price, and style.",
  openGraph: {
    title: "All Products | AIRWEAVE",
    description:
      "Browse our complete range of premium linen clothing.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
