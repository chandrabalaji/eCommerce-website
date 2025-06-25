"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useQuery } from "@tanstack/react-query";
import { getTodayDeals } from "@/lib/api/apiService";
import { queryKey } from "@/constant";

const TodayDeals = () => {
  const [productDetails, setProductDetails] = useState<any>(null);

  const { data: productDetailsArray } = useQuery({
    queryKey: [queryKey.todayDeals],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getTodayDeals(),
  });

  const producttemsRef = useRef<any | HTMLDivElement>(null);

  const handleNext = () => {
    producttemsRef.current?.scrollBy({ left: 560, behavior: "smooth" });
  };

  const handlePrev = () => {
    producttemsRef.current?.scrollBy({ left: -560, behavior: "smooth" });
  };

  useEffect(() => {
    setProductDetails(productDetailsArray?.data);
  }, [productDetailsArray]);

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
        className="flex items-center overflow-auto gap-4 scroll-bar-hide"
        ref={producttemsRef}
      >
        {productDetails?.map((product: any) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};

export default TodayDeals;
