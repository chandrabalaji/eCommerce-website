import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import Link from "next/link";
import { SERVER_URL } from "@/constant";
import StarRateIcon from "@mui/icons-material/StarRate";

const ProductCard = ({ product }: any) => {
  return (
    <Link
      href="/test"
      className="flex flex-col gap-4 min-w-72 max-w-72   p-3 rounded-md"
      key={product.id}
    >
      <div className="relative w-full h-96">
        <Image
          src={
            product?.image_urls?.[0]
              ? `${SERVER_URL}/${product.image_urls[0]?.url}`
              : "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
          }
          sizes="25vw"
          fill
          alt=""
          className="absolute object-cover transition-opacity easy duration-500 max-h-96 w-full"
        />

        <div className="absolute object-cover rounded-md bottom-0 top-0 flex flex-col justify-between  w-full translate-y-16 hover:translate-y-0 opacity-0 hover:opacity-100   font-josefin  transition-all duration-300  ease-in-out">
          <div className="bg-[#F9F2ED] opacity-80 w-max p-1 rounded-full ms-auto mt-2 mr-2">
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
      <div>
        <div className="flex justify-between">
          <span className=" text-xs font-semibold">
            {product?.category_name}
          </span>
          <span className="flex items-center gap-1 font-semibold">
            <span className="text-sm">4.3</span>
            <StarRateIcon
              sx={{
                color: "#be7f4e",
                height: "18px",
              }}
            />
          </span>
        </div>
        <p className=" text-xl font-semibold font-josefin">{product?.name}</p>
        <p className="text-xl font-bold text-orange-400 font-josefin">
          <span className="line-through opacity-65">
            $ {Number(product?.price) + 300}
          </span>{" "}
          $ {product?.price}
        </p>
      </div>
      {/*  <button className=" font-josefin rounded-2xl ring-1 w-max ring-orange-400 text-orange-400 py-2 px-4 hover:bg-orange-400 hover:text-white">
        Add to Cart
      </button> */}
    </Link>
  );
};

export default ProductCard;
