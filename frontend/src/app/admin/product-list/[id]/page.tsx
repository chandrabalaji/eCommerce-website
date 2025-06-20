"use client";
import ProductMaptoCategory from "@/components/ProductMaptoCategory";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  getCategories,
  getProductById,
  postCategory,
  postProduct,
  updateCategory,
  updateProduct,
} from "../../../../lib/api/apiService";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { SERVER_URL } from "@/constant";
import CloseIcon from "@mui/icons-material/Close";
import Switch from "@mui/material/Switch";

const page = ({ params }: { params: { id: string } }) => {
  const productId = useSearchParams()?.get("edit") ?? null;
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [open, setOpen] = React.useState(false);
  const [todatDealStatus, setTodayDealStatus] = useState(false);
  const [productName, setProductName] = useState("Product 1");
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [price, setPrice] = useState(1);
  const [images, setImages] = useState<any>([]);
  const [deleteImageIds, setDeleteImageIds] = useState<any>([]);

  const { data } = useQuery({
    queryKey: ["categoriesDetails"],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getCategories(),
  });

  const { data: productDetails } = useQuery({
    queryKey: ["productDetail"],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getProductById(productId),
  });

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", String(price));
    formData.append("category_id", selectedCategory?.id);
    formData.append("is_today_deal", JSON.stringify(todatDealStatus));
    if (deleteImageIds.length) {
      formData.append("delete_images_ids", JSON.stringify(deleteImageIds));
    }
    if (productId) {
      for (let i = 0; i < images.length; i++) {
        if (images[i]?.file) {
          formData.append("productImages", images[i]?.file); // 'images' is the key for multiple files
        }
      }
      const { status, data }: any = await updateProduct(formData, productId);

      if (status === 200) {
        toast.success(data?.message);
      }
    } else {
      for (let i = 0; i < images.length; i++) {
        formData.append("productImages", images[i]?.file); // 'images' is the key for multiple files
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

  useEffect(() => {
    const productDetail = productDetails?.data[0];
    if (productDetail) {
      setProductName(productDetail?.name);
      setSelectedCategory({
        id: productDetail?.category_id,
        name: productDetail?.category_name,
      });
      setPrice(productDetail?.price);
      setImages(productDetail?.image_urls || []);
    }
  }, [productDetails]);

  const handleDeleteProductImage = (img: any) => {
    if (img.id) {
      // already inserted images need to store the id and pass to api for delete
      const updatedImages = images.filter(
        (image: any) => image.url !== img.url
      );
      setDeleteImageIds((prev: any) => [...prev, img.id]);
      setImages(updatedImages);
    } else {
      // new image
      const updatedImages = images.filter(
        (image: any) => image.url !== img.url
      );
      setImages(updatedImages);
    }
  };

  return (
    <div className=" font-josefin">
      <div
        className="bg-pink-100 h-48 px-10 py-4 w-full flex items-center justify-between"
        style={{
          background:
            " linear-gradient(90deg,rgba(237, 100, 207, 0.78) 0%, rgba(242, 121, 216, 1) 50%, rgba(240, 109, 242, 0.79) 100%)",
        }}
      >
        <div>
          <p className="text-2xl font-medium">Product</p>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="bg-transparent border-b-2 border-gray-50 w-[690px] mt-3 outline-none text-3xl font-normal text-white p-1   "
          />
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/admin/product-list"
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
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {images.map((img: any, index: any) => (
              <div key={index} className="border rounded shadow p-2 relative">
                <img
                  src={img?.file?.name ? img.url : `${SERVER_URL}/${img.url}`}
                  alt={`preview-${index}`}
                  className="w-full h-40 object-cover rounded"
                />
                <p className="text-xs mt-1 break-all">
                  {img?.file?.name || img?.name}
                </p>
                <button
                  className="bg-gray-300 p-1 rounded-full absolute -right-1 -top-2 opacity-0 hover:opacity-100"
                  onClick={() => handleDeleteProductImage(img)}
                >
                  <CloseIcon />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-1 mt-10">
            <p> Add Products Images</p>
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
        <div className="shadow-2xl bg-white border w-4/12 relative -top-10 rounded-md p-4">
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
                type="text"
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
                value={selectedCategory}
                getOptionValue={(option: any) => option.id}
                getOptionLabel={(option: any) => option.name}
                options={data?.data || []}
                onChange={(e) => setSelectedCategory(e)}
              />
            </div>
            <div>
              <label>Mark as Today Deal</label>
              <Switch
                {...label}
                checked={todatDealStatus}
                onChange={(e: any) => setTodayDealStatus(e.target.checked)}
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
