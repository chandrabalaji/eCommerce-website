"use client";
import ProductCard from "@/components/ProductCard";
import { allCategoriesId, limit, queryKey } from "@/constant";
import { getCategories, getProducts } from "@/lib/api/apiService";
import ClearIcon from "@mui/icons-material/Clear";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const page = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [productDetails, setProductDetails] = useState<any>([]);
  const [crtPage, setCrtPage] = useState(1);
  const [categoriesDetails, setCategoriesDetails] = useState<any>(null);
  const productColors = [
    { id: 1, color_name: "green" },
    { id: 2, color_name: "red" },
    { id: 3, color_name: "green" },
    { id: 4, color_name: "green" },
    { id: 5, color_name: "green" },
  ];

  const priceFilters = [
    { id: 1, label: "Rs. 200 and below", value: 5 },
    { id: 2, label: "Rs. 200 - Rs. 500", value: 5 },
    { id: 3, label: "Rs. 500 - Rs. 750", value: 5 },
    { id: 4, label: "Rs. 750 - Rs. 1000", value: 5 },
    { id: 5, label: "Rs. 1000 and above", value: 5 },
  ];

  const { data } = useQuery({
    queryKey: [queryKey.categoriesDetails],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getCategories(),
  });

  const { data: productDetailsArray } = useQuery({
    queryKey: [queryKey.productDetails, crtPage],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => {
      const offset = (crtPage - 1) * limit;
      return getProducts({ offset, limit });
    },
  });

  useEffect(() => {
    if (data) {
      setCategoriesDetails(data?.data);
      if (productDetailsArray?.data) {
        setProductDetails(productDetailsArray?.data);
      }
    }
  }, [data, productDetailsArray]);

  const [age, setAge] = React.useState("22");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const getMaxPage = () => {
    const totalItems = productDetailsArray?.meta?.totalCount;
    const itemsPerPage = 20;
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    return maxPage;
  };

  return (
    <div className="flex xl:px-32 mt-10 font-josefin">
      <div className=" px-2 hidden sm:block sm:w-2/5 lg:w-1/5">
        <h3 className="text-2xl font-bold py-2">Filter options</h3>
        <div className="h-[2px] bg-gray-100" />
        <div className="w-full px-2 mt-4">
          <h3 className="text-lg font-bold">Categories</h3>
          <ul className="flex flex-col gap-2 my-2">
            {categoriesDetails?.map((category: any) => (
              <li className="flex items-center justify-between ">
                <span>
                  <Checkbox {...label} size="small" />
                  <span className="ml-2 text-base font-normal">
                    {category.name}
                  </span>
                </span>
                <span className="text-base font-normal">
                  ({String(category?.product_count).padStart(2, "0")})
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <div className="w-full px-2 my-4">
          <h3 className="text-lg font-bold">Price Range</h3>
          <div className="flex flex-col gap-2 mt-2">
            {priceFilters.map((range) => (
              <p className="flex items-center gap-2" key={range.id}>
                <Checkbox {...label} size="small" />
                <span>{range.label}</span>
              </p>
            ))}
          </div>
        </div>
        {/* color */}
        <div className="w-full px-2 my-4">
          <h3 className="text-lg font-bold">Color</h3>
          <ul className="flex flex-col gap-2 mt-2">
            {productColors?.map((color: any) => (
              <li className="flex items-center justify-between ">
                <span>
                  <input type="checkbox" name="" id="" />
                  <span className="ml-2 text-base font-normal">
                    {color.color_name}
                  </span>
                </span>
                <span className="text-base font-normal">({color.qty})</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full px-2 my-4 ">
          <h3 className="text-lg font-bold">Size</h3>
          <div>
            <ul className="flex items-center flex-wrap gap-4 mt-2">
              <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
                XS
              </li>
              <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
                S
              </li>
              <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
                M
              </li>
              <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
                L
              </li>
              <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
                XL
              </li>
              <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
                2XL
              </li>
              <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
                3XL
              </li>
              <li className="ring-1 ring-lama ring-orange-200 text-orange-400 rounded-md py-1 px-4 text-sm cursor-pointer">
                4XL
              </li>
            </ul>
          </div>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <div className="w-full px-2 mt-2">
          <h3 className="text-lg font-bold">Availability</h3>
          <div className="my-2">
            <input type="checkbox" name="" id="" /> including Out of Stock
          </div>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <div className="w-full px-2 mt-2">
          <h3 className="text-lg font-bold">Collections</h3>
          <div className="flex flex-col gap-2 my-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <span>New Arrivals</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <span>Deals of the Day</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="" />
              <span>Best Selling</span>
            </div>
          </div>
        </div>
        {/* <div className="h-[2px] bg-gray-100" /> */}
        {/* apply */}
        <div className="flex items-center justify-between px-3 gap-5 mt-2">
          <button className="border border-orange-400 text-orange-400  text-base py-2  font-semibold rounded-md grow">
            Clear All
          </button>
          <button className="bg-orange-400 text-white text-base font-semibold py-2 rounded-md grow">
            Apply
          </button>
        </div>
      </div>
      <div className="md:pl-10 flex flex-col sm:gap-x-4 xl:gap-x-8 gap-y-8  flex-wrap w-full sm:w-3/5 lg:w-4/5">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h3 className="text-base sm:text-2xl font-semibold">
              Showing 1-10 of 120 results
            </h3>
            <div className="flex flex-col lg:flex-row items-center gap-2">
              <span className="text-lg font-medium">Sort by : </span>
              <FormControl sx={{ m: 1, minWidth: 160 }}>
                <Select
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  className="h-8 "
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={22} className="text-base font-medium">
                    Newest First
                  </MenuItem>
                  <MenuItem value={20}>Price -- Low to High</MenuItem>
                  <MenuItem value={21}>Price -- High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 ">
            <span className="text-lg font-medium">Active filter :</span>
            <span className="text-base font-medium bg-orange-400 text-white min-w-16 max-w-max p-1.5 flex items-center justify-around">
              <span>shirt</span> <ClearIcon fontSize="small" />
            </span>
            <span className="text-base font-medium bg-orange-400 text-white min-w-16 max-w-max p-1.5 flex items-center justify-around">
              <span>Rs.200 - Rs.500</span> <ClearIcon fontSize="small" />
            </span>
            <span className="text-base font-medium bg-orange-400 text-white min-w-16 max-w-max p-1.5 flex items-center justify-around">
              <span> XL</span> <ClearIcon fontSize="small" />
            </span>
          </div>
        </div>
        <div className="flex flex-wrap justify-around w-full">
          {productDetails?.map((product: any) => (
            <ProductCard product={product} />
          ))}
        </div>
        {productDetailsArray && (
          <div className="self-center mt-3">
            <Stack spacing={2}>
              <Pagination
                count={getMaxPage()}
                shape="rounded"
                page={crtPage}
                onChange={(_, page) => setCrtPage(page)}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
