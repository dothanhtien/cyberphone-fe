import type { Metadata } from "next";
import Link from "next/link";
import { TabletSmartphone } from "lucide-react";

import { STORE_NAME } from "@/config";

export const metadata: Metadata = {
  title: `${STORE_NAME} | Authentication`,
  description: `${STORE_NAME} admin portal authentication`,
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link
        href="/"
        className="flex items-center gap-2 self-center font-bold text-2xl"
      >
        <TabletSmartphone className="size-8 text-orange-400" />
        {STORE_NAME}
      </Link>

      {children}
    </div>
  );
}
