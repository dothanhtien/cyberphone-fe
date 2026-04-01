import type { Metadata } from "next";
import Link from "next/link";
import { TabletSmartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "CyberPhone | Login",
  description: "Log in to the CyberPhone admin portal",
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href="/" className="flex items-center gap-2 self-center font-bold text-2xl">
        <TabletSmartphone className="size-8 text-orange-400" />
        CyberPhone
      </Link>

      {children}
    </div>
  );
}
