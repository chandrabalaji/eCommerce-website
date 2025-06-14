// app/admin/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./Header";
import SideBar from "./SideBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel - Lama Dev E-Commerce Application",
  description: "Admin dashboard for managing the e-commerce platform.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="bg-gray-900 text-white w-1/6 h-screen p-2">
        <SideBar />
      </div>
      <div className="w-5/6">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}
