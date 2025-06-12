"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Menu = () => {
  const [menuItemsOpen, setMenuItemsOpen] = useState(false);
  return (
    <div>
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setMenuItemsOpen((prev) => !prev)}
      />
      {menuItemsOpen && (
        <div className="absolute top-20 left-0 w-full h-[calc(100vh-80px)] flex flex-col  justify-center items-center bg-black gap-8 text-white text-xl z-10">
          <Link href="/">Homepage</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Logout</Link>
          <Link href="/">Cart(1)</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
