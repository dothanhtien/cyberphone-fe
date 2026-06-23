import type { Metadata } from "next";

import { Navbar } from "@/components/layouts/storefront/Navbar";
import { Footer } from "@/components/layouts/storefront/Footer";
import { StorefrontGuard } from "@/components/layouts/storefront/StorefrontGuard";
import { STORE_NAME } from "@/config";

export const metadata: Metadata = {
  title: STORE_NAME,
  description: `${STORE_NAME} storefront`,
};

const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 52;

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StorefrontGuard>
      <Navbar />

      <main
        className="max-w-300 container p-4 mx-auto"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        }}
      >
        {children}
      </main>

      <Footer />
    </StorefrontGuard>
  );
}
