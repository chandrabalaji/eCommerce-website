"use client";
import React, { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useQuery } from "@tanstack/react-query";
import { getCombos } from "@/lib/api/apiService";
import Link from "next/link";
import Image from "next/image";
import { queryKey, SERVER_URL } from "@/constant";
import StarRateIcon from "@mui/icons-material/StarRate";

const ComboCollections = () => {
  const [comboDetails, setComboDetails] = useState<any>(null);

  const { data: comboDetailsArray } = useQuery({
    queryKey: [queryKey.comboDetails],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getCombos(),
  });

  const producttemsRef = useRef<any | HTMLDivElement>(null);
  const handleNext = () => {
    producttemsRef.current?.scrollBy({ left: 560, behavior: "smooth" });
  };

  const handlePrev = () => {
    producttemsRef.current?.scrollBy({ left: -560, behavior: "smooth" });
  };

  useEffect(() => {
    setComboDetails(comboDetailsArray?.data);
  }, [comboDetailsArray]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="my-5 text-4xl font-josefin font-bold">
          Trending Combo Collection
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
        {comboDetails?.map((combo: any) => (
          <Link href="" className="min-w-56 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="relative w-full h-60">
                <Image
                  src={`${SERVER_URL}/${combo.combo_image_url}`}
                  sizes="25vw"
                  fill
                  alt=""
                  className="absolute object-cover object-top transition-opacity easy duration-500 max-h-60 w-full rounded-md"
                />
              </div>
              <div className="flex items-center gap-2">
                {combo?.product_details?.map((product: any) => (
                  <div className="relative w-full h-28 rounded-md">
                    <Image
                      src={`${SERVER_URL}/${product.image_urls[0]?.url}`}
                      sizes="25vw"
                      fill
                      alt=""
                      className="absolute object-cover transition-opacity easy duration-500 max-h-96 w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span className=" text-xs font-semibold">Combo</span>
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
              <p className=" text-xl font-semibold font-josefin">
                {combo?.combo_name}
              </p>
              <p className="text-xl font-bold text-orange-400 font-josefin">
                <span className="line-through opacity-65">
                  $ {Number(combo?.combo_price) + 300}
                </span>{" "}
                $ {combo?.combo_price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ComboCollections;
