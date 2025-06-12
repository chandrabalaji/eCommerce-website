"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SearchBar = () => {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchParam = formData.get("searchInput");
    if (searchParam) {
      router.push(`/list?search=${searchParam}`);
    }
  };
  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="searchInput"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none "
      />
      <button className="cursor-pointer" type="submit">
        <Image src="/search.png" alt="" width={16} height={16} />
      </button>
    </form>
  );
};

export default SearchBar;
