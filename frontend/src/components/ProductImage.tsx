"use client";
import { formatImageUrl } from "@/utils/utils";
import Image from "next/image";
import { useState } from "react";

const ProductImage = ({ productDetails }: any) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image
          src={formatImageUrl(productDetails?.image_urls[index]?.url)}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md object-top"
        />
      </div>
      <div className="flex items-center gap-4 mt-4">
        {productDetails?.image_urls?.map((img: any, index: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 cursor-pointer"
            key={img.id}
            onClick={() => setIndex(index)}
          >
            <Image
              src={formatImageUrl(img?.url)}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md object-top"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
