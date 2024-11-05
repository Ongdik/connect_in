"use client";

import { useState } from "react";
import SearchIcon from "@/public/svgs/search.svg";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center p-4 bg-white shadow rounded-lg">
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded-lg w-full p-2 mr-2 focus:outline-none"
      />
      <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition flex items-center">
        <SearchIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
