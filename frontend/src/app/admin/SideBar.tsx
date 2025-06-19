"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const SideBar = ({ isSidebarOpen, toggleSidebar }: any) => {
  const pathName = usePathname();

  const sideBarLinks = [
    { id: 1, name: "Category", href: "/admin/categories-list" },
    { id: 2, name: " Products", href: "/admin/product-list" },
    { id: 3, name: " Orders", href: "/admin/Orders" },
    { id: 4, name: " Customers", href: "/admin/Customers" },
  ];

  return (
    <div
      className={`transition-transform duration-300 ease-in-out s bg-gray-900 text-white h-screen p-2 
      w-4/5 absolute z-50 lg:relative lg:w-1/6
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-80"} 
      lg:translate-x-0 lg:block`}
    >
      <div className="flex items-center justify-between gap-2 font-josefin">
        <button onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <p className="text-2xl tracking-wide">LAMA</p>
      </div>
      <aside className="flex flex-col gap-4 items-start  py-3 rounded-md w-full mt-3">
        {sideBarLinks.map((menu) => (
          <Link
            className={` ${
              pathName.includes(menu?.href) ? "bg-pink-400" : ""
            }  text-lg font-medium text-center p-2 px-3 w-full rounded-md font-josefin hover:border hover:border-pink-400`}
            href={menu?.href}
            key={menu?.id}
          >
            {menu?.name}
          </Link>
        ))}
      </aside>
    </div>
  );
};

export default SideBar;
