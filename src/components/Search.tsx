import React from "react";
import style from "./style.module.scss";
import { useSearchContext } from "../contexts/SearchContext";

interface SearchBarProps {
  placeholder: string;
}
const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const { setSearchQuery, searchQuery } = useSearchContext();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="flex items-start mb-[14px] gap-4 pr-4 ms:pr-6 lg:mb-5 lg:pr-9 lg:gap-6 ">
      <div className="w-6 h-6 bg-[url('@/assets/icon-search.svg')] bg-center bg-no-repeat bg-cover ms:w-8 ms:h-8 "></div>
      <input
        id="searchMovie"
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        className="text-base focus:border-b-[1px] focus:border-dusk_blue placeholder-white/50 flex-1 border-b border-transparent w-full caret-peach  bg-transparent font-outfit border-none outline-none font-light text-white  pb-[10px] ms:text-2xl ms:pb-[14px] "
      />
    </div>
  );
};

export default SearchBar;
