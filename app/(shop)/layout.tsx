import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ExitIntentModal from "@/app/components/ExitIntentModal";

export const metadata: Metadata = {
  title: "Shop Premium Linen Clothing",
  description:
    "Browse AIRWEAVE's collection of premium linen clothing. Shirts, trousers, and more — crafted from 100% European flax linen for Indian weather.",
  openGraph: {
    title: "Shop Premium Linen Clothing | AIRWEAVE",
    description:
      "Browse AIRWEAVE's collection of premium linen clothing crafted for Indian weather.",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ExitIntentModal />
    </>
  );
}
