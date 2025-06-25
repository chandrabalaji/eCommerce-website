import Image from "next/image";
import React from "react";
import { Poppins } from "next/font/google";


const poppin = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"], // choose weights as needed
});
 
const Ads = () => {
  const addsObjects = [
    {
      title: "NEW ARRIVALS",
      subTitle: "TOUCH OF COLOR",
      description: "The Crew Neck style T-shirt",
    },
    {
      title: "DISCOVER THEM ALL",
      subTitle: `THIS SEASON’S BOMBER SHIRT’S`,
      description: "",
    },
  ];

  return (
    <div
      className={` ${poppin.className} max-h-[700px]  flex items-center my-10`}
    >
      {addsObjects.map((obj) => (
        <div className="h-[700px] w-1/2 relative  group overflow-hidden">
          <Image
            src="/ads.jpg"
            alt=""
            fill
            sizes="100%"
            className="object-cover "
          />
          <div className="absolute inset-0 bg-[#55392399] opacity-50 transition-transform duration-700 origin-top-left group-hover:scale-0 cursor-pointer"></div>
          <div className="absolute z-10  text-white flex flex-col items-center justify-center text-center w-full h-full">
            <p className="text-xl font-medium">{obj.title}</p>
            <p className="text-5xl font-bold">{obj.subTitle}</p>
            {obj.description && (
              <p className="text-2xl font-medium">{obj.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ads;
