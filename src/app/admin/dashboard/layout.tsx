import type { Metadata } from "next";
import "../../globals.css";
import ProtectedRoute from "@/components/protectedRoute";

export const metadata: Metadata = {
  title: "Cyberphone | Admin",
  description: "TBD",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-zinc-950 text-white p-4">
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
