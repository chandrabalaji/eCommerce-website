"use client";
import { queryKey } from "@/constant";
import { getProductByCategoryId } from "@/lib/api/apiService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ProductCard from "./ProductCard";

const SimilarProducts = ({ categoryId }: any) => {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [loadSimilar, setLoadSimilar] = useState(false);
  const similarRef = useRef();
  const producttemsRef = useRef<any | HTMLDivElement>(null);

  const { data: productDetailsByCategory } = useQuery({
    queryKey: [queryKey.productDetail, categoryId],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    // enabled: loadSimilar,
    queryFn: () => getProductByCategoryId(categoryId),
    select(data) {
      return data?.data;
    },
  });

  useEffect(() => {
    setProductDetails(productDetailsByCategory);
  }, [productDetailsByCategory]);

  // Trigger when similarRef comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadSimilar(true);
          observer.disconnect(); // run once
        }
      },
      { threshold: 0.1 }
    );

    if (similarRef.current) {
      observer.observe(similarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    producttemsRef.current?.scrollBy({ left: 560, behavior: "smooth" });
  };

  const handlePrev = () => {
    producttemsRef.current?.scrollBy({ left: -560, behavior: "smooth" });
  };

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h1 className="my-5 text-4xl font-josefin font-bold">
          Similar Products
        </h1>
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
        className="flex items-center overflow-auto gap-4 scroll-bar-hide mt-4"
        ref={producttemsRef}
      >
        {productDetails &&
          productDetails?.map((product: any) => (
            <ProductCard product={product} />
          ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
