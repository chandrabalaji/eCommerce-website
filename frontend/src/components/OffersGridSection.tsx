import React from "react";
import Image from "next/image";

import { Abhaya_Libre } from "next/font/google";

const abhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "600"], // choose weights as needed
});

const OffersGridSection = () => {
  return (
    <div className={` cutom-offer-grid-style max-w-5xl mx-auto my-16`}>
      <div className="span-2 flex items-center font-rollgates bg-[#efefef]">
        <div className="relative w-full h-52 ">
          <Image
            alt=""
            src="/offerSections/offer1.png"
            fill
            className=" object-cover"
          />
        </div>
        <div
          className={`${abhayaLibre.className} flex flex-col mx-auto gap-1 `}
        >
          <p className="font-bold text-2xl text-[#724C2F]">
            Upto 70% off Final Fashion sale
          </p>
          <p className="text-sm">
            Get special offers on your favourite dresses
          </p>
          <button className="text-lg font-bold p-2 rounded-md bg-orange-400 text-white max-w-max mx-auto">
            Shop Now
          </button>
        </div>
      </div>
      <div className="span-2 !bg-[#fde8cd] relative">
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            alt=""
            fill
            src="/offerSections/offer2.png"
            className="object-cover !-left-20 "
          />
        </div>
        <div
          className={`${abhayaLibre.className} flex flex-col mx-auto gap-1 absolute right-5 top-5 `}
        >
          <p className="font-bold text-4xl text-[#724C2F]">sale</p>
          <p className="text-sm bg-orange-400 p-2 rounded-md">50% off</p>
        </div>
      </div>
      <div className="relative bg-[#ede9e6]">
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            alt=""
            fill
            src="/offerSections/offer3.jpg"
            className="object-cover !top-6"
          />
        </div>
        <div
          className={`${abhayaLibre.className} flex flex-col mx-auto gap-1 absolute right-5 top-5 `}
        >
          <p className="font-bold text-4xl text-[#724C2F]">SUNGLASS</p>
          <button className="text-lg font-bold p-2 rounded-md bg-orange-400 text-white max-w-max mx-auto">
            Shop Now
          </button>
        </div>
      </div>
      <div
        className={`${abhayaLibre.className} bg-[#FEE5CD] f flex flex-col justify-center items-center `}
      >
        <p className="text-4xl font-bold text-[#724C2F] text-center">
          END OF SEASON
        </p>
        <p className="font-black text-2xl ">70%</p>
        <p className="font-bold text-base text-white bg-[#724C2F] p-2 rounded-md w-max">
          OFFER
        </p>
      </div>
      <div className="span-2 flex items-center font-rollgates bg-[#efefef] relative">
        <div
          className={`${abhayaLibre.className} flex flex-col mx-auto gap-1 absolute top-5 left-5 z-10 max-w-28`}
        >
          <p className="font-bold text-4xl text-[#724C2F]">Men’s Collection</p>

          <button className="text-lg font-bold p-2 rounded-md bg-orange-400 text-white max-w-max mx-auto">
            Shop Now
          </button>
        </div>
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            alt=""
            src="/offerSections/offer4.png"
            fill
            className="object-cover "
          />
        </div>
      </div>
      <div className="span-2 bg-gradient-to-r from-[#FFD5AD] to-[#FEE5CD] flex items-center font-rollgates  relative">
        <div
          className={`${abhayaLibre.className} flex flex-col mx-auto gap-1 absolute top-5 left-5 z-10 max-w-60`}
        >
          <p className="font-bold text-4xl text-[#724C2F]">
            Best Men’s Watches
          </p>
          <p className="text-sm">By selecting your favourit</p>
          <p className="text-lg font-bold p-2 rounded-md bg-orange-400 text-white max-w-max ">
            20% off
          </p>
        </div>
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            alt=""
            src="/offerSections/offer5.png"
            fill
            className="object-cover !left-36"
          />
        </div>
      </div>
    </div>
  );
};

export default OffersGridSection;
