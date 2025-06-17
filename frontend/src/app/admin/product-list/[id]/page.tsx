"use client";
import ProductMaptoCategory from "@/components/ProductMaptoCategory";
import Link from "next/link";
import React, { useRef, useState } from "react";
import {
  getCategories,
  postCategory,
  postProduct,
  updateCategory,
} from "../../../../lib/api/apiService";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";

const page = ({ params }: { params: { id: string } }) => {
  const { data } = useQuery({
    queryKey: ["categoriesDetails"],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getCategories(),
  });

  const [images, setImages] = useState<any>([]);
  const editCategoryId = useSearchParams()?.get("edit") ?? null;
  const editCategoryName = params?.id;

  const [open, setOpen] = React.useState(false);
  const [productName, setProductName] = useState(
    editCategoryId ? editCategoryName : "Product 1"
  );
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [price, setPrice] = useState(1);

  const handlePost = async () => {
    if (editCategoryId) {
      const { status, data }: any = await updateCategory({
        id: editCategoryId,
        name: productName,
      });

      if (status === 200) {
        toast.success(data?.message);
      }
    } else {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("price", String(price));
      formData.append("category_id", selectedCategory?.id);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]?.file); // 'images' is the key for multiple files
      }

      const { data, status }: any = await postProduct(formData);

      if (status === 201) {
        toast.success(data?.message);
      }
    }
  };

  const fileInputRef = useRef<any>(null);

  const handleButtonClick = () => {
    fileInputRef?.current?.click(); // This triggers the file input click
  };

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file: any) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev: any) => [...prev, ...imagePreviews]);
  };

  return (
    <div className=" ">
      <div
        className="bg-pink-100 h-48 px-10 py-4 w-full flex items-center justify-between"
        style={{
          background:
            " linear-gradient(90deg,rgba(237, 100, 207, 0.78) 0%, rgba(242, 121, 216, 1) 50%, rgba(240, 109, 242, 0.79) 100%)",
        }}
      >
        <div>
          <p>Product</p>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-transparent border-b-2 border-gray-50 w-[690px] mt-3 outline-none text-3xl font-normal text-white p-1   "
          />
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/admin/categories-list"
            className=" border border-white text-black min-w-32 py-2 rounded-3xl w-full text-center hover:bg-gray-900 hover:border-gray-900 hover:text-white"
          >
            Cancel
          </Link>
          <button
            className="bg-white text-black min-w-32 py-2 rounded-3xl"
            onClick={handlePost}
          >
            Save
          </button>
        </div>
      </div>
      <section className="px-10 py-4 flex items-center justify-between">
        <div className="shadow-2xl bg-white  border w-7/12 relative -top-10 rounded-md p-4">
          <p className="text-xl font-medium  border-b-2 py-2">In Stock</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img: any, index: any) => (
              <div key={index} className="border rounded shadow p-2">
                <img
                  src={img.url}
                  alt={`preview-${index}`}
                  className="w-full h-40 object-cover rounded"
                />
                <p className="text-xs mt-1 break-all">{img.file.name}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1 mt-10">
            <p> Adding Products Images</p>
            <button
              className="bg-blue-400 px-6 py-2 rounded-3xl text-white mt-4"
              onClick={handleButtonClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />
              + Chooes Files
            </button>
          </div>
        </div>
        <div className="shadow-2xl bg-white h-96 border w-4/12 relative -top-10 rounded-md p-4">
          <p className="text-xl font-medium  border-b-2 py-2">Product info</p>
          <div className="w-full mt-4 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-lg">Product Name</p>
              <span className="p-2  border border-gray-400 rounded-md min-w-20">
                {productName}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg">Product Price</p>
              <input
                type="number"
                name=""
                id=""
                min={1}
                className=" border border-gray-400 p-2 rounded-md w-full"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg">Select Category</p>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="color"
                getOptionValue={(option: any) => option.id}
                getOptionLabel={(option: any) => option.name}
                options={data?.data || []}
                onChange={(e) => setSelectedCategory(e)}
              />
            </div>
          </div>
        </div>
      </section>
      <ProductMaptoCategory open={open} setOpen={setOpen} />
    </div>
  );
};

export default page;
