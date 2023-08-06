import Footer from "@/components/Footer";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
