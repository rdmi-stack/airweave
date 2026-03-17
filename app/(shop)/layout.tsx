import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ExitIntentModal from "@/app/components/ExitIntentModal";

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
