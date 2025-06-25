"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductMaptoCategory from "@/components/ProductMaptoCategory";
import { queryKey, SERVER_URL } from "@/constant";
import { getComboById, postCombo, updateCombo } from "@/lib/api/apiService";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const page = ({ params }: { params: { id: string } }) => {
  const queryClient = useQueryClient();
  const comboId = useSearchParams()?.get("edit") ?? null;

  const [open, setOpen] = React.useState(false);
  const [comboName, setComboName] = useState(" New Combo");
  const [price, setPrice] = useState(1);
  const [selectedItemForCombo, setSelectedItemForCombo] = useState([]);
  const [image, setImage] = useState<any>([]);
  const [comboDetails, setComboDetails] = useState<any>(null);

  // Queries
  const { data } = useQuery({
    queryKey: [queryKey.ComboDetail],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getComboById(comboId),
    select(data) {
      return data?.data[0];
    },
  });

  useEffect(() => {
    if (data) {
      setComboDetails(data);
      setComboName(data?.combo_name);
      setPrice(data?.combo_price);
      setSelectedItemForCombo(data?.product_details);
      setImage(data?.combo_image_url);
    }
  }, [data]);

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file: any) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImage(imagePreviews);
  };

  const handlePost = async () => {
    const product_ids = selectedItemForCombo.map((product: any) => product.id);
    const formData = new FormData();
    formData.append("combo_name", comboName);
    formData.append("combo_price", String(price));
    formData.append("product_ids", JSON.stringify(product_ids));
    formData.append("combo_image_url", image[0]?.file);

    handleDeleteCategory(formData);
  };

  const { mutate: handleDeleteCategory } = useMutation({
    mutationFn: (payload: any) => {
      if (comboId) {
        return updateCombo(payload);
      } else {
        return postCombo(payload);
      }
    },
    onSuccess: (data: any) => {
      console.log(data);
      toast.success(data?.data?.message);
      queryClient.invalidateQueries({ queryKey: [queryKey.ComboDetail] });
    },
  });

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
          <p className="text-2xl font-medium">Combo Products</p>
          <input
            type="text"
            value={comboName}
            onChange={(e) => setComboName(e.target.value)}
            className="bg-transparent border-b-2 border-gray-50 w-[690px] mt-3 outline-none text-3xl font-normal text-white p-1   "
          />
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/admin/combo-list"
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
        <div className="shadow-2xl bg-white  border w-7/12 relative -top-10 rounded-md p-4 min-h-96">
          <div className="flex justify-between items-center">
            <p>Combo Items</p>
            <div>
              <button
                onClick={() => setOpen(true)}
                className="bg-blue-500 p-2 px-6 rounded-3xl text-white text-base "
              >
                Add Product
              </button>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {selectedItemForCombo?.length > 0 &&
              selectedItemForCombo?.map((product: any) => (
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
              ))}
          </div>
        </div>
        <div className="shadow-2xl bg-white border w-4/12 relative -top-10 rounded-md p-4">
          <p className="text-xl font-medium  border-b-2 py-2">Combo info</p>
          <div className="w-full mt-4 flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <p className="text-lg">Combo Name</p>
              <span className="p-2  border border-gray-400 rounded-md min-w-20">
                {comboName}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg">Price</p>
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
              <p className="text-lg">Upload Combo Template</p>
              {image ? (
                <div className="border rounded shadow p-2 cursor-pointer max-w-60">
                  <img
                    src={`${SERVER_URL}/${image}`}
                    alt={`preview`}
                    className="w-full h-48 object-cover rounded object-top"
                  />
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              )}
            </div>
          </div>
        </div>
      </section>
      {open && (
        <ProductMaptoCategory
          open={open}
          setOpen={setOpen}
          selectedItemForCombo={selectedItemForCombo}
          setSelectedItemForCombo={setSelectedItemForCombo}
        />
      )}
    </div>
  );
};

export default page;
