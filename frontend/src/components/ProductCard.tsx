import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: any) => {
  return (
    <Link
      href="/test"
      className="flex flex-col gap-4 min-w-72 max-w-72  "
      key={product.id}
    >
      <div className="relative w-full h-96">
        <Image
          src="https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
          sizes="25vw"
          fill
          alt=""
          className="absolute object-cover transition-opacity easy duration-500 max-h-96 w-full"
        />{" "}
        {/*  <Image
                src="https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300"
                sizes="25vw"
                width={310}
                height={50}
                alt=""
                className="absolute object-cover rounded-md max-h-80 w-full"
              /> */}
        <div className="absolute object-cover rounded-md bottom-0 top-0 flex flex-col justify-between  w-full opacity-0 hover:opacity-100  font-josefin">
          <div className="bg-[#F9F2ED] w-max p-1 rounded-full ms-auto mt-2 mr-2">
            <FavoriteBorderIcon sx={{ color: "bg-orange-400" }} />
          </div>
          <div className="text-[#724C2F]  custom-size-sellectin-color flex flex-col justify-center items-center py-3">
            <p className="text-lg font-bold ">Add Size</p>
            <ul className="flex items-center gap-3">
              <li className="bg-orange-400  text-white px-2  text-lg font-medium">
                s
              </li>
              <li>m</li>
              <li>l</li>
              <li>xl</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between font-josefin">
        <span className="font-semibold">Product Name</span>
        <span className="font-medium">$49</span>
      </div>
      <button className=" font-josefin rounded-2xl ring-1 w-max ring-orange-400 text-orange-400 py-2 px-4 hover:bg-orange-400 hover:text-white">
        Add to Cart
      </button>
    </Link>
  );
};

export default ProductCard;
