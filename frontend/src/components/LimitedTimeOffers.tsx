"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const LimitedTimeOffers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="my-14">
      <motion.div
        className="relative w-full h-[700px] "
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ minHeight: "50vh", margin: "100px 0" }}
      >
        <Image
          src="/offerSections/limitedOffer.jpg"
          fill
          alt=""
          className="absolute object-cover transition-opacity easy duration-500  w-full"
        />
        <div className="absolute top-60 left-[700px] max-w-[420px] font-josefin text-center flex flex-col gap-4">
          <p className="text-base font-semibold ">Limited Time Offers</p>
          <h1 className="font-bold text-5xl">
            Up to 50% OFF on Men's Fashion!
          </h1>
          <p className="text-base font-normal">
            Upgrade Your Wardrobe with Trendy Styles Today
          </p>
          <button className="bg-[#FFF8ED] text-orange-400 font-bold px-3 p-1 w-max self-center">
            Shop Now
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LimitedTimeOffers;
