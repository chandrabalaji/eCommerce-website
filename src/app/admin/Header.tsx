import SearchBar from "@/components/SearchBar";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white  h-16 flex justify-between items-center px-4">
      <div className="w-1/4">
        <SearchBar />
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
          width={30}
          height={25}
          alt=""
          className="rounded-full"
        />
        <p>Henry Klein</p>
      </div>
    </header>
  );
};

export default Header;
