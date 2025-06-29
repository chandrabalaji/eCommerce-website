"use client";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "@/lib/api/apiService";
import { queryKey, SERVER_URL } from "@/constant";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import toast from "react-hot-toast";

const page = () => {
  const queryClient = useQueryClient();
  const [productDetails, setProductDetails] = useState<any>(null);

  const { data } = useQuery({
    queryKey: [queryKey.productDetail],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getProducts({ offset: 0, limit: 0 }),
  });
  useEffect(() => {
    setProductDetails(data?.data);
  }, [data]);

  // Mutation
  const { mutate: handleDeleteProduct } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: (data: any) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries({ queryKey: [queryKey.productDetail] });
    },
  });

  return (
    <div className="flex flex-col gap-3 px-5 sm:px-10 py-4 w-full  font-josefin">
      <div className="flex items-center flex-col gap-2 sm:flex-row justify-between w-full ">
        <div className="sm:w-3/5 xl:w-auto">
          <p className="text-3xl font-josefin">Productes</p>
          <p className="font-josefin">
            Groups Related Productes into Categories add them to your site.
          </p>
        </div>
        <div className="sm:w-2/5 lg:w-auto">
          <Link
            href="/admin/product-list/add"
            className="bg-pink-400 px-6 py-2 rounded-3xl text-white font-josefin"
          >
            + Add product
          </Link>
        </div>
      </div>
      <section className="flex items-center flex-wrap gap-4 sm:gap-8 h-[calc(100vh-180px)] overflow-y-auto scroll-bar-hide ">
        {productDetails?.map((product: any) => (
          <Link
            className="w-[160px] h-72 sm:w-[300px] sm:h-96  relative rounded-lg overflow-hidden shadow-lg"
            key={product.id}
            href={`product-list/${product.name}?edit=${product.id}`}
          >
            <Image
              src={`${SERVER_URL}/${product.image_urls[0]?.url}`}
              layout="fill"
              objectFit="cover"
              alt=""
              className="hover:scale-110 transition-all"
            ></Image>
            <div className="bg-gradient-to-b bg-white w-full absolute bottom-0 left-0 p-2 font-josefin">
              <p>{product?.category_name}</p>
              <p className=" text-lg lg:text-2xl font-medium  text-pink-400">
                {product.name}
              </p>
              <p>$ {product.price}</p>
            </div>
            <button
              className="bg-red-500 p-2 rounded-full absolute right-2 top-2 opacity-0 hover:opacity-100"
              onClick={(e) => {
                e.preventDefault(); // prevent <Link> navigation
                e.stopPropagation(); // prevent bubbling to <Link>
                handleDeleteProduct(product.id);
              }}
            >
              <DeleteForeverIcon />
            </button>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default page;
