"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cartmodal from "./Cartmodal";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const router = useRouter();
  const isLoggedIn = false;
  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    setIsProfileOpen((prev) => !prev);
  };
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      
      <Image
        alt=""
        src="/notification.png"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div className="cursor-pointer relative">
        <Image
          alt=""
          src="/cart.png"
          width={22}
          height={22}
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className="absolute -top-4 -right-4 bg-pink-500 text-white rounded-full h-6 w-6 flex justify-center items-center text-sm">2</div>
      </div>
      {isCartOpen && <Cartmodal />}
      <Image
        alt=""
        src="/profile.png"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}
    </div>
  );
};


export default NavIcons;
