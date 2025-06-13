import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCard from "./ProductCard";
import { ProductDetails } from "@/utils/utils";

const ProductList = () => {
  const collections = [
    "All",
    "T-shirt",
    "Shirt",
    "Phant",
    "Hoodies",
    "Foot Wear",
    "Accessories",
  ];

  return (
    <div className="flex flex-col gap-2">
      <h3 className="my-5 text-4xl font-josefin font-bold">
        Top Selling Products
      </h3>
      <div className="flex items-center gap-3">
        {collections.map((collection, index) => (
          <button
            key={index}
            className={` ${
              index == 0 ? "bg-orange-400 text-white" : "bg-red-50"
            } p-2 px-3 rounded-sm text-base font-normal `}
          >
            {collection}
          </button>
        ))}
      </div>
      <div className=" mt-12 flex gap-x-4 xl:gap-x-8 gap-y-16  flex-wrap">
        {ProductDetails.map((product) => (
          <ProductCard product={product} />
        ))}

        {/*  <Link
          href="/test"
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80">
            <Image
              src="https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
              sizes="25vw"
              width={310}
              height={50}
              alt=""
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full"
            />{" "}
            <Image
              src="https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300"
              sizes="25vw"
              width={310}
              height={50}
              alt=""
              className="absolute object-cover rounded-md max-h-80 w-full"
            />{" "}
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Product Name</span>
            <span className="font-medium">$49</span>
          </div>
          <div className="text-sm text-gray-500">My description</div>
          <button className="rounded-2xl ring-1 w-max ring-pink-600 text-pink-600 py-2 px-4 hover:bg-pink-600 hover:text-white">
            Add to Cart
          </button>
        </Link>
        <Link
          href="/test"
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80">
            <Image
              src="https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
              sizes="25vw"
              width={500}
              height={50}
              alt=""
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full"
            />
            <Image
              src="https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300"
              sizes="25vw"
              width={500}
              height={50}
              alt=""
              className="absolute object-cover rounded-md max-h-80  w-full"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Product Name</span>
            <span className="font-medium">$49</span>
          </div>
          <div className="text-sm text-gray-500">My description</div>
          <button className="rounded-2xl ring-1 w-max ring-pink-600 text-pink-600 py-2 px-4 hover:bg-pink-600 hover:text-white">
            Add to Cart
          </button>
        </Link>
        <Link
          href="/test"
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80">
            <Image
              src="https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
              sizes="25vw"
              width={310}
              height={50}
              alt=""
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500 max-h-80 w-full"
            />{" "}
            <Image
              src="https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300"
              sizes="25vw"
              width={310}
              height={50}
              alt=""
              className="absolute object-cover rounded-md max-h-80 w-full"
            />{" "}
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Product Name</span>
            <span className="font-medium">$49</span>
          </div>
          <div className="text-sm text-gray-500">My description</div>
          <button className="rounded-2xl ring-1 w-max ring-pink-600 text-pink-600 py-2 px-4 hover:bg-pink-600 hover:text-white">
            Add to Cart
          </button>
        </Link> */}
      </div>
      <button className="mt-16 text-lg font-josefin px-3 py-2 border-2 border-orange-400 text-orange-400 hover:text-white hover:bg-orange-400 w-max  self-center">
        View More
      </button>
    </div>
  );
};

export default ProductList;
