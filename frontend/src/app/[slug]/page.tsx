import Add from "@/components/Add";
import CustomizeProduct from "@/components/CustomizeProduct";
import ProductImage from "@/components/ProductImage";
import React from "react";

const SinglePage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG  */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImage />
      </div>
      {/* TEXTS  */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 ">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
          eius quasi cumque quisquam? Blanditiis, voluptatum. Cupiditate rem
          nisi impedit illo?
        </p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$59</h3>
          <h2 className="font-medium text-2xl">$59</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizeProduct />
        <Add />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore ducimus voluptas, quaerat enim omnis quis a. Aspernatur officia harum possimus quis vel facilis eligendi repellendus, ut est ad obcaecati molestiae?</p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore ducimus voluptas, quaerat enim omnis quis a. Aspernatur officia harum possimus quis vel facilis eligendi repellendus, ut est ad obcaecati molestiae?</p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">Title</h4>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore ducimus voluptas, quaerat enim omnis quis a. Aspernatur officia harum possimus quis vel facilis eligendi repellendus, ut est ad obcaecati molestiae?</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
