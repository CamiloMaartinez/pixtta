import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DealershipJsonLd } from "@/components/seo/DealershipJsonLd";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DealershipJsonLd />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
