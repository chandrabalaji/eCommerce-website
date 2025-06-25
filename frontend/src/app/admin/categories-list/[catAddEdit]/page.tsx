"use client";
import ProductMaptoCategory from "@/components/ProductMaptoCategory";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  getProductByCategoryId,
  postCategory,
  updateCategory,
} from "../../../../lib/api/apiService";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { queryKey, SERVER_URL } from "@/constant";

const page = ({ params }: { params: { catAddEdit: string } }) => {
  const editCategoryId = useSearchParams()?.get("edit") ?? null;
  const editCategoryName = params?.catAddEdit;

  const [open, setOpen] = React.useState(false);
  const [productDetails, setProductDetails] = useState<any>(null);
  const [categoryName, setCategoryName] = useState(
    editCategoryId ? editCategoryName : "Category 1"
  );

  const { data: productDetailsByCategory } = useQuery({
    queryKey: [queryKey.productDetail],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getProductByCategoryId(editCategoryId),
  });

  const handlePost = async () => {
    if (editCategoryId) {
      const { status, data }: any = await updateCategory({
        id: editCategoryId,
        name: categoryName,
      });

      if (status === 200) {
        toast.success(data?.message);
      }
    } else {
      const { data, status }: any = await postCategory({
        name: categoryName,
      });

      if (status === 201) {
        toast.success(data?.message);
      }
    }
  };

  useEffect(() => {
    setProductDetails(productDetailsByCategory);
  }, [productDetailsByCategory]);

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
          <p>Category</p>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
        <div className="shadow-2xl bg-white h-[calc(100vh-300px)] overflow-y-auto scroll-bar-hide  border w-7/12 relative -top-10 rounded-md px-4">
          <p className="text-xl font-medium  border-b-2 py-3 sticky top-0 bg-white z-30">
            Products in Category ({productDetails?.meta?.totalCount || 0})
          </p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {productDetails?.data?.length > 0 ? (
              productDetails?.data?.map((product: any) => (
                <Link
                  key={product.id}
                  className="border rounded shadow p-2 cursor-pointer hover:scale-110 transition-all"
                  href={`/admin/product-list/${product.name}?edit=${product.id}`}
                >
                  <img
                    src={`${SERVER_URL}/${product?.image_urls[0].url}`}
                    alt={`preview-${product.id}`}
                    className="w-full h-48 object-cover rounded object-top"
                  />
                  <p className="text-lg font-medium mt-1 break-all">
                    {product?.name}
                  </p>
                  <p className="text-sm font-medium mt-1 break-all">
                    $ {product?.price}
                  </p>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center gap-1 mt-10">
                <p>Start Adding Product to your category</p>
                <p className="text-gray-600">
                  Create new category to display on your site
                </p>
                <button
                  className="bg-blue-400 px-6 py-2 rounded-3xl text-white mt-4"
                  onClick={() => setOpen(true)}
                >
                  {" "}
                  + Add Product
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="shadow-2xl bg-white h-96 border w-4/12 relative -top-10 rounded-md p-4">
          <p className="text-xl font-medium  border-b-2 py-2">Category info</p>
          <div className="w-full mt-4 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-lg">Category Name</p>
              <span className="p-2  border border-gray-400 rounded-md min-w-20">
                {categoryName}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg">Category image</p>
              <input type="file" name="" />
            </div>
          </div>
        </div>
      </section>
      <ProductMaptoCategory open={open} setOpen={setOpen} />
    </div>
  );
};

export default page;
