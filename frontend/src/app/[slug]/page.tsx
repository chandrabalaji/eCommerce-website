"use client";
import Add from "@/components/Add";
import CustomizeProduct from "@/components/CustomizeProduct";
import ProductImage from "@/components/ProductImage";
import { queryKey } from "@/constant";
import { getProductById } from "@/lib/api/apiService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Rotate90DegreesCcwIcon from "@mui/icons-material/Rotate90DegreesCcw";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import DoneIcon from "@mui/icons-material/Done";
import DiscountIcon from "@mui/icons-material/Discount";
import SimilarProducts from "@/components/SimilarProducts";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import ServiceHighlights from "@/components/ServiceHighlights";

const SinglePage = ({ params }: { params: { slug: string } }) => {
  // const productId = useSearchParams()?.get("edit") ?? null;
  const productId = 28;

  const { data: productDetails } = useQuery({
    queryKey: [queryKey.productDetail],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getProductById(productId),
    select(data) {
      return data?.data[0];
    },
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col gap-20">
      <div className="relative flex flex-col lg:flex-row gap-16">
        {/* IMG  */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max mt-6">
          <ProductImage productDetails={productDetails} />
        </div>
        {/* TEXTS  */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p>{productDetails?.category_name}</p>
              <h1 className="text-4xl font-medium">{productDetails?.name}</h1>
              <span className="text-xs font-medium">246 Ratings</span>
            </div>
            <div className="flex items-center gap-2">
              <FavoriteBorderIcon />
              <ReplyIcon />
            </div>
          </div>
          <p className="text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
            eius quasi cumque quisquam? Blanditiis, voluptatum. Cupiditate rem
            nisi impedit illo?
          </p>
          <div className="h-[2px] bg-gray-100" />
          <div className="flex flex-col  gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl text-gray-500 line-through">
                $ {Number(productDetails?.price) + 300}
              </h3>
              <span className="font-medium text-2xl">
                $ {productDetails?.price}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p>
                <DiscountIcon /> Get extra 10% OFF
              </p>
              <span className="text-green-500 ">
                <DoneIcon sx={{ color: "#22c55e" }} /> Applied
              </span>
            </div>
          </div>
          <div className="h-[2px] bg-gray-100" />
          <CustomizeProduct />
          <Add />
          <div className="h-[2px] bg-gray-100" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 p-2 hover:bg-gray-200 cursor-pointer ">
              <div className="flex items-center gap-2">
                <LocalShippingIcon />
                <span>
                  Express Delivery in{" "}
                  <span className="text-orange-400 font-medium">2 days</span>
                </span>
              </div>
              <ChevronRightIcon />
            </div>
            <div className="flex items-center justify-between gap-2 p-2  hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center gap-2">
                <Rotate90DegreesCcwIcon />
                <span>10 days return policy</span>
              </div>
              <ChevronRightIcon />
            </div>
            <div className="flex items-center justify-between gap-2 p-2  hover:bg-gray-200 cursor-pointer">
              <div className="flex items-center gap-2">
                <LocalAtmIcon />
                <span> Cash on delivery available</span>
              </div>
              <ChevronRightIcon />
            </div>
          </div>
          <div className="h-[2px] bg-gray-100" />
          {/*address  */}
          <div>
            <div className="flex items-center justify-between">
              <p>
                Delivery to : john
                <span className="border border-gray-500 p-1 text-sm  rounded-md text-black ml-4">
                  Home
                </span>
                <p className="text-gray-500">
                  Plot no 98, EVP prabhu Ananue...
                </p>
              </p>
              <button className="text-sm rounded-md ring-1 ring-orange-400 text-orange-400 py-2 px-4 hover:bg-orange-400 hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 ">
                Change
              </button>
            </div>
          </div>
          <div className="h-[2px] bg-gray-100" />
          <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
              ducimus voluptas, quaerat enim omnis quis a. Aspernatur officia
              harum possimus quis vel facilis eligendi repellendus, ut est ad
              obcaecati molestiae?
            </p>
          </div>
          <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
              ducimus voluptas, quaerat enim omnis quis a. Aspernatur officia
              harum possimus quis vel facilis eligendi repellendus, ut est ad
              obcaecati molestiae?
            </p>
          </div>
          <div className="text-sm">
            <h4 className="font-medium mb-4">Title</h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
              ducimus voluptas, quaerat enim omnis quis a. Aspernatur officia
              harum possimus quis vel facilis eligendi repellendus, ut est ad
              obcaecati molestiae?
            </p>
          </div>
        </div>
      </div>
      {/* Similar products */}
      <SimilarProducts categoryId={1} />
      <ServiceHighlights />
    </div>
  );
};
 
export default SinglePage;
