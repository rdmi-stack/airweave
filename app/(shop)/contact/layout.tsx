import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AIRWEAVE. Questions about orders, sizing, or our linen clothing? We're here to help.",
  openGraph: {
    title: "Contact AIRWEAVE",
    description:
      "Have questions? Reach out to the AIRWEAVE team.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
