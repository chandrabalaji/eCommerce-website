"use client";

import { ProductDetails } from "@/utils/utils";
import React, { useRef } from "react";
import ProductCard from "./ProductCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const TodayDeals = () => {
  const producttemsRef = useRef<any | HTMLDivElement>(null);

  const handleNext = () => {
    producttemsRef.current?.scrollBy({ left: 560, behavior: "smooth" });
  };

  const handlePrev = () => {
    producttemsRef.current?.scrollBy({ left: -560, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="my-5 text-4xl font-josefin font-bold">
          Deals of the Day
        </h3>
        <div className="flex items-center gap-4">
          <button
            className="p-1 border border-orange-400 hover:bg-orange-400 hover:text-white"
            onClick={handlePrev}
          >
            <ChevronLeftIcon sx={{ color: "bg-orange-400" }} />
          </button>
          <button
            className="p-1 border border-orange-400 hover:bg-orange-400 hover:text-white"
            onClick={handleNext}
          >
            <ChevronRightIcon sx={{ color: "bg-orange-400" }} />
          </button>
        </div>
      </div>
      <div
        className="flex items-center overflow-auto gap-4 scroll-bar-hide p-5"
        ref={producttemsRef}
      >
        {ProductDetails.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default TodayDeals;
