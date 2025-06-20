"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  getProductByCategoryId,
  getProducts,
} from "@/lib/api/apiService";

const ProductList = () => {
  const allCategoriesId = "ab@12";
  const [categoriesDetails, setCategoriesDetails] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<any>(allCategoriesId);
  const [productDetails, setProductDetails] = useState<any>([]);
  const [offset, setOffset] = useState(0);

  // Queries
  const { data } = useQuery({
    queryKey: ["categoriesDetails"],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getCategories(),
  });

  const { data: productDetailsArray } = useQuery({
    queryKey: ["productDetails", offset],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getProducts({ offset, limit: 20 }),
  });

  const { data: productDetailsByCategory } = useQuery({
    queryKey: ["productDetailsByCategory", activeCategory],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => {
      if (activeCategory === allCategoriesId) {
        return getProducts({ offset, limit: 20 });
      } else {
        return getProductByCategoryId(activeCategory);
      }
    },
  });

  useEffect(() => {
    setProductDetails(productDetailsByCategory?.data);
  }, [productDetailsByCategory]);

  useEffect(() => {
    const categories = [{ id: allCategoriesId, name: "All" }].concat(
      data?.data
    );
    if (data) {
      setCategoriesDetails(categories);
      if (productDetailsArray?.data) {
        if (offset === 0) {
          setProductDetails(productDetailsArray?.data);
        } else {
          setProductDetails((prev: any) => [
            ...(prev || []),
            ...(productDetailsArray?.data || []),
          ]);
        }
      }
    }
  }, [data, productDetailsArray]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="my-5 text-4xl font-josefin font-bold">
        Top Selling Products
      </h3>
      <div className="flex items-center gap-3">
        {categoriesDetails?.map((category: any) => (
          <button
            key={category.id}
            className={` ${
              category.id == activeCategory
                ? "bg-orange-400 text-white"
                : "bg-red-50"
            } p-2 px-3 rounded-sm text-base font-normal `}
            onClick={() => setActiveCategory(category?.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className=" mt-12 flex gap-x-4 xl:gap-x-8 gap-y-8  flex-wrap">
        {productDetails?.map((product: any) => (
          <ProductCard product={product} />
        ))}
      </div>
      {productDetailsArray?.meta?.totalCount > productDetails?.length &&
        activeCategory === allCategoriesId && (
          <button
            className="mt-16 text-lg font-josefin px-3 py-2 border-2 border-orange-400 text-orange-400 hover:text-white hover:bg-orange-400 w-max  self-center"
            onClick={() => setOffset(offset + 20)}
          >
            View More
          </button>
        )}
    </div>
  );
};

export default ProductList;
