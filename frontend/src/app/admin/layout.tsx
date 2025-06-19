"use client";
import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex">
      <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className=" w-full lg:w-5/6">
        <Header  toggleSidebar={toggleSidebar} />
        <div>{children}</div>
      </div>
    </div>
  );
}
