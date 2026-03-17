import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIRWEAVE — Premium Linen Clothing",
  description:
    "Luxury linen clothing engineered for real Indian weather. Breathable. Sustainable. Luxurious.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
