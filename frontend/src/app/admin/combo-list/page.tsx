"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCombo, getCombos } from "@/lib/api/apiService";
import { SERVER_URL } from "@/constant";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import toast from "react-hot-toast";

const page = () => {
  const queryClient = useQueryClient();
  const [comboDetails, setComboDetails] = useState<any>(null);

  // Queries
  const { data } = useQuery({
    queryKey: ["ComboDetails"],
    notifyOnChangeProps: ["data"],
    staleTime: Infinity,
    queryFn: () => getCombos(),
  });

  useEffect(() => {
    setComboDetails(data?.data);
  }, [data]);

  // Mutation
  const { mutate: handleDeleteCombo } = useMutation({
    mutationFn: (id: number) => deleteCombo(id),
    onSuccess: (data: any) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries({ queryKey: ["ComboDetails"] });
    },
  });

  return (
    <div className="flex flex-col gap-3 px-5 sm:px-10 py-4 w-full  font-josefin">
      <div className="flex items-center flex-col gap-2 sm:flex-row justify-between w-full ">
        <div className="sm:w-3/5 xl:w-auto">
          <p className="text-3xl font-josefin">Combo Products</p>
          <p className="font-josefin">
            Groups Related Productes into your site.
          </p>
        </div>
        <div className="sm:w-2/5 lg:w-auto">
          <Link
            href="/admin/combo-list/add"
            className="bg-pink-400 px-6 py-2 rounded-3xl text-white font-josefin"
          >
            + Add Combo
          </Link>
        </div>
      </div>
      <section className="flex items-center flex-wrap gap-4 sm:gap-8 h-[calc(100vh-180px)] overflow-y-auto scroll-bar-hide ">
        {comboDetails?.map((combo: any) => (
          <Link
            className="w-[160px] h-72 sm:w-[300px] sm:h-96 relative rounded-md overflow-hidden shadow-lg"
            key={combo.combo_id}
            href={`combo-list/${combo.combo_name}?edit=${combo.combo_id}`}
          >
            <Image
              src={
                combo.combo_image_url
                  ? `${SERVER_URL}/${combo.combo_image_url}`
                  : ""
              }
              layout="fill"
              objectFit="cover"
              alt=""
              className="object-top hover:scale-110 transition-all"
            ></Image>
            <div className="bg-pink-400 absolute  w-full bottom-0 p-3">
              <p className="text-lg sm:text-2xl font-medium text-white ">
                {combo.combo_name}
              </p>
              <p>{combo?.combo_price}</p>
            </div>
            <button
              className="bg-red-500 p-2 rounded-full absolute right-2 top-2 opacity-0 hover:opacity-100"
              onClick={(e) => {
                e.preventDefault(); // prevent <Link> navigation
                e.stopPropagation(); // prevent bubbling to <Link>
                handleDeleteCombo(combo.combo_id); // your delete logic
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
