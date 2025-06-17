"use client";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "@/lib/api/apiService";
import { SERVER_URL } from "@/constant";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import toast from "react-hot-toast";

const page = () => {
  const queryClient = useQueryClient();
  const [productDetails, setProductDetails] = useState<any>(null);

  const { data } = useQuery({
    queryKey: ["productDetails"],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getProducts(),
  });
  useEffect(() => {
    setProductDetails(data?.data);
  }, [data]);

  // Mutation
  const { mutate: handleDeleteProduct } = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: (data: any) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["productDetails"] });
    },
  });

  return (
    <div className="flex flex-col gap-3 px-10 py-4 w-full ">
      <div className="flex items-center justify-between w-full ">
        <div>
          <p className="text-3xl">Productes</p>
          <p>Groups Related Productes into Categories add them to your site.</p>
        </div>
        <Link
          href="/admin/product-list/add"
          className="bg-pink-400 px-6 py-2 rounded-3xl text-white"
        >
          + Add product
        </Link>
      </div>
      <section className="flex items-center flex-wrap gap-10 ">
        {productDetails?.map((product: any) => (
          <Link
            className="w-[300px] h-72 relative rounded-md overflow-hidden "
            key={product.id}
            href={`product-list/${product.name}?edit=${product.id}`}
          >
            <Image
              src={`${SERVER_URL}/${product.image_urls[0]}`}
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>
            <div className="bg-gradient-to-b from-gray-300 via-gray-400 to-gray-400 w-full absolute bottom-0 left-0 p-2">
              <div className="text-2xl text-white  flex justify-between items-center ">
                <span>{product.name}</span> <span>$ {product.price}</span>
              </div>
              <p>{product?.category_name}</p>
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
