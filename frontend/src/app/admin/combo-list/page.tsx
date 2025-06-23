"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-col gap-3 px-5 sm:px-10 py-4 w-full  font-josefin">
      <div className="flex items-center flex-col gap-2 sm:flex-row justify-between w-full ">
        <div className="sm:w-3/5 xl:w-auto">
          <p className="text-3xl font-josefin">Combo Products</p>
          <p className="font-josefin">
            Groups Related Productes into your site.
          </p>
        </div>
        <div className="sm:w-2/5 lg:w-auto">
          <Link
            href="/admin/combo-list/add"
            className="bg-pink-400 px-6 py-2 rounded-3xl text-white font-josefin"
          >
            + Add Combo
          </Link>
        </div>
      </div>
      <section className="flex items-center flex-wrap gap-4 sm:gap-8 h-[calc(100vh-180px)] overflow-y-auto scroll-bar-hide "></section>
    </div>
  );
};

export default page;
