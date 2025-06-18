"use client";
import Link from "next/link";
import Image from "next/image";
import { deleteCategory, getCategories } from "@/lib/api/apiService";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SERVER_URL } from "@/constant";

const page = () => {
  const queryClient = useQueryClient();
  const [categoriesDetails, setCategoriesDetails] = useState<any>(null);

  // Queries
  const { data } = useQuery({
    queryKey: ["categoriesDetails"],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getCategories(),
  });

  useEffect(() => {
    setCategoriesDetails(data?.data);
  }, [data]);

  /* const handleDeleteCategory = async (id: number) => {
    try {
      // const { data, status }: any = await deleteCategory(id);

      const { data, status }: any = useMutation({
         mutationFn: (id: number) => deleteCategory(id),
      })
      if (status === 200) {
        toast.success(data?.message);
        getCategoriesDetails();
      }
    } catch (error) {
      console.log(error);
    }
  }; */

  // Mutation
  const { mutate: handleDeleteCategory } = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: (data: any) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["categoriesDetails"] });
    },
  });

  return (
    <div className="flex flex-col gap-3 px-10 py-4 w-full  font-josefin">
      <div className="flex items-center justify-between w-full ">
        <div>
          <p className="text-3xl">categories</p>
          <p>Groups Related Productes into Categories add them to your site.</p>
        </div>
        <Link
          href="categories-list/add"
          className="bg-pink-400 px-6 py-2 rounded-3xl text-white"
        >
          + Add Category
        </Link>
      </div>
      <section className="flex items-center flex-wrap gap-8 ">
        {categoriesDetails?.map((category: any) => (
          <Link
            className="w-[300px] h-96 relative rounded-md overflow-hidden shadow-lg"
            key={category.id}
            href={`categories-list/${category.name}?edit=${category.id}`}
          >
            <Image
              src={
                category.image_url ? `${SERVER_URL}/${category.image_url}` : ""
              }
              layout="fill"
              objectFit="cover"
              alt=""
              className="object-top hover:scale-110 transition-all"
            ></Image>
            <div className="bg-pink-400 absolute  w-full bottom-0 p-3">
              <p className=" text-2xl font-medium text-white ">
                {category.name} 
              </p>
              <p>No of Products : 10</p>
            </div>
            <button
              className="bg-red-500 p-2 rounded-full absolute right-2 top-2 opacity-0 hover:opacity-100"
              onClick={(e) => {
                e.preventDefault(); // prevent <Link> navigation
                e.stopPropagation(); // prevent bubbling to <Link>
                handleDeleteCategory(category.id); // your delete logic
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
