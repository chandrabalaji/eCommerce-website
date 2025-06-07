"use client";
import ProductMaptoCategory from "@/components/ProductMaptoCategory";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName] = useState("Category 1");

  return (
    <div className=" ">
      <div
        className="bg-pink-100 h-48 px-10 py-4 w-full flex items-center justify-between"
        style={{
          background:
            " linear-gradient(90deg,rgba(237, 100, 207, 0.78) 0%, rgba(242, 121, 216, 1) 50%, rgba(240, 109, 242, 0.79) 100%)",
        }}
      >
        <div>
          <p>Category</p>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="bg-transparent border-b-2 border-gray-50 w-[690px] mt-3 outline-none text-3xl font-normal text-white p-1   "
          />
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/admin/categories-list"
            className=" border border-white text-black min-w-32 py-2 rounded-3xl w-full text-center hover:bg-gray-900 hover:border-gray-900 hover:text-white"
          >
            Cancel
          </Link>
          <button className="bg-white text-black min-w-32 py-2 rounded-3xl">
            Save
          </button>
        </div>
      </div>
      <section className="px-10 py-4 flex items-center justify-between">
        <div className="shadow-2xl bg-white h-96 border w-7/12 relative -top-10 rounded-md p-4">
          <p className="text-xl font-medium  border-b-2 py-2">
            Products in Category 0
          </p>
          <div className="flex flex-col items-center gap-1 mt-10">
            <p>Start Adding Product to your category</p>
            <p className="text-gray-600">
              Create new category to display on your site
            </p>
            <button
              className="bg-blue-400 px-6 py-2 rounded-3xl text-white mt-4"
              onClick={() => setOpen(true)}
            >
              {" "}
              + Add Product
            </button>
          </div>
        </div>
        <div className="shadow-2xl bg-white h-96 border w-4/12 relative -top-10 rounded-md p-4">
          <p className="text-xl font-medium  border-b-2 py-2">Category info</p>
          <div className="w-full mt-4 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-lg">Category Name</p>
              <span className="p-2  border border-gray-400 rounded-md min-w-20">
                {categoryName}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg">Category image</p>
              <input type="file" name="" />
            </div>
          </div>
        </div>
      </section>
      <ProductMaptoCategory open={open} setOpen={setOpen} />
    </div>
  );
};

export default page;
