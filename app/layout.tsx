import type { Metadata } from "next";
import "./globals.css";
import ToastContainer from "./components/ToastContainer";

export const metadata: Metadata = {
  title: {
    default: "AIRWEAVE — Premium Linen Clothing",
    template: "%s | AIRWEAVE",
  },
  description:
    "Luxury linen clothing engineered for real Indian weather. 100% European flax linen. Free shipping over ₹2,999.",
  keywords: [
    "linen clothing",
    "premium shirts",
    "Indian fashion",
    "linen shirts",
    "sustainable fashion",
    "Airweave",
  ],
  authors: [{ name: "Airweave" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://airweave.in",
    siteName: "AIRWEAVE",
    title: "AIRWEAVE — Premium Linen Clothing",
    description:
      "Luxury linen clothing engineered for real Indian weather. Breathable. Sustainable. Luxurious.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=80",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIRWEAVE — Premium Linen Clothing",
    description:
      "Luxury linen clothing engineered for real Indian weather.",
    images: [
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1200&q=80",
    ],
  },
  robots: { index: true, follow: true },
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
        <ToastContainer />
      </body>
    </html>
  );
}
