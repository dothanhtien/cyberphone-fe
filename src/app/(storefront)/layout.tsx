import type { Metadata } from "next";

import { Navbar } from "@/components/layouts/storefront/Navbar";
import { Footer } from "@/components/layouts/storefront/Footer";

export const metadata: Metadata = {
  title: "Cyberphone",
  description: "Cyberphone storefront",
};

const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 52;

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main
        className="max-w-5xl container p-4 mx-auto"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
