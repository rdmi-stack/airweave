import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AIRWEAVE — our mission to craft premium linen clothing engineered for Indian weather using 100% European flax linen.",
  openGraph: {
    title: "About AIRWEAVE",
    description:
      "Our mission: premium linen clothing engineered for Indian weather.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
