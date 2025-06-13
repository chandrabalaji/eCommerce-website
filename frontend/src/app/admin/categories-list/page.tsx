"use client";
import Link from "next/link";
import Image from "next/image";
import { deleteCategory, getCategories } from "@/lib/api/apiService";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { toast } from "react-hot-toast";

const page = () => {
  const [categoriesDetails, setCategoriesDetails] = useState<any>(null);

  const getCategoriesDetails = async () => {
    const { data } = await getCategories();
    setCategoriesDetails(data);
  };
  useEffect(() => {
    getCategoriesDetails();
  }, []);

  const handleDeleteCategory = async (id: number) => {
    try {
      const { data, status }: any = await deleteCategory(id);
      if (status === 200) {
        toast.success(data?.message);
        getCategoriesDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const categoriesList = [
    {
      id: 1,
      name: "All Products",
      products_count: 5,
      cat_img:
        "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load",
    },
    {
      id: 2,
      name: " Accessories",
      products_count: 12,
      cat_img:
        "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 3,
      name: " Accessories",
      products_count: 12,
      cat_img:
        "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
    {
      id: 4,
      name: " Accessories",
      products_count: 12,
      cat_img:
        "https://images.pexels.com/photos/12405330/pexels-photo-12405330.jpeg?auto=compress&cs=tinysrgb&w=300",
    },
  ];

  return (
    <div className="flex flex-col gap-3 px-10 py-4 w-full ">
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
            className="w-[300px] h-96 relative rounded-md overflow-hidden "
            key={category.id}
            href={`categories-list/${category.name}?edit=${category.id}`}
          >
            <Image
              src={
                category.cat_img ||
                "https://images.pexels.com/photos/25365159/pexels-photo-25365159/free-photo-of-blue-mug-with-plants.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
              }
              layout="fill"
              objectFit="cover"
              alt=""
            ></Image>
            <p className="absolute bottom-5 left-5 text-2xl text-white ">
              {category.name} {category.products_count}
            </p>
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
