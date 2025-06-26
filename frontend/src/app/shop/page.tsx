"use client";
import ProductCard from "@/components/ProductCard";
import { allCategoriesId, queryKey } from "@/constant";
import { getCategories, getProducts } from "@/lib/api/apiService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const page = () => {
  const [productDetails, setProductDetails] = useState<any>([]);
  const [offset, setOffset] = useState(0);
  const [categoriesDetails, setCategoriesDetails] = useState<any>(null);
  const productColors = [
    { id: 1, color_name: "green", qty: 5 },
    { id: 2, color_name: "red", qty: 5 },
    { id: 3, color_name: "green", qty: 5 },
    { id: 4, color_name: "green", qty: 5 },
    { id: 5, color_name: "green", qty: 5 },
  ];

  const { data } = useQuery({
    queryKey: [queryKey.categoriesDetails],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getCategories(),
  });

  const { data: productDetailsArray } = useQuery({
    queryKey: [queryKey.productDetails, offset],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getProducts({ offset, limit: 20 }),
  });

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

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div className="flex px-32 mt-10 font-josefin">
      <div className="w-1/5  px-2">
        <h3 className="text-2xl font-bold py-2">Filter options</h3>
        <div className="h-[2px] bg-gray-100" />
        <div className="w-full px-2 mt-4">
          <h3 className="text-lg font-bold">Categories</h3>
          <ul className="flex flex-col gap-2 my-2">
            {categoriesDetails?.map((category: any) => (
              <li className="flex items-center justify-between ">
                <span>
                  <input type="checkbox" name="" id="" />
                  <span className="ml-2 text-base font-normal">
                    {category.name}
                  </span>
                </span>
                <span className="text-base font-normal">(30)</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <div className="w-full px-2 my-4">
          <h3 className="text-lg font-bold">Price Range</h3>
          <div className="flex flex-col gap-2 mt-2">
            <p>
              <input type="checkbox" name="" id="" /> Rs. 200 and below
            </p>
            <p>
              {" "}
              <input type="checkbox" name="" id="" /> Rs. 200 - Rs. 500
            </p>
            <p>
              {" "}
              <input type="checkbox" name="" id="" /> Rs. 500 - Rs. 750
            </p>
            <p>
              {" "}
              <input type="checkbox" name="" id="" /> Rs. 750 - Rs. 1000
            </p>
            <p>
              {" "}
              <input type="checkbox" name="" id="" /> Rs. 1000 and above
            </p>
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
      <div className="pl-10 flex flex-col gap-x-4 xl:gap-x-8 gap-y-8  flex-wrap w-4/5">
        <div className="flex flex-col gap-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">
              Showing 10 of 120 results
            </h3>
            <div className="flex items-center gap-2">
                <span className="text-lg font-medium">Sort by : </span>
              <FormControl sx={{ m: 1, minWidth: 160 }}>
                <Select
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  className="h-8"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={22}>Newest First</MenuItem>
                  <MenuItem value={20}>Price -- Low to High</MenuItem>
                  <MenuItem value={21}>Price -- High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
        <div className="flex flex-wrap w-full">
          {productDetails?.map((product: any) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
