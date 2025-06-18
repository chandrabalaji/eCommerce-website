"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const SideBar = () => {
  const pathName = usePathname();

  const sideBarLinks = [
    { id: 1, name: "Category", href: "/admin/categories-list" },
    { id: 2, name: " Products", href: "/admin/product-list" },
    { id: 3, name: " Orders", href: "/admin/Orders" },
    { id: 4, name: " Customers", href: "/admin/Customers" },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-2 font-josefin">
        <p className="text-2xl tracking-wide">LAMA</p>
        <MenuIcon />
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
    </>
  );
};

export default SideBar;
