import { Link } from "react-router-dom";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col ">
      <div>
        <h1 className="text-[100px] ms:text-[200px] text-[#454649] font-roboto_slab font-bold tracking-[3px]  ">
          Error
        </h1>
        <p className="text-white flex tracking-[8px] absolute text-center font-bold left-1/2 -translate-x-1/2 top-[60px] ms:top-[120px] text-[85px] ms:text-[170px]">
          <span>40</span>
          <span className="inline-block rotate-180">4</span>
        </p>
      </div>
      <p className="text-base font-light text-center text-white  mt-[30px] ms:text-[20px] ms:mt-[70px]">
        Page Not Found
      </p>
      <Link className="flex" to="/" aria-label="Navigate to Home page">
        <button
          className="outline-none border-none w-[126px] h-10  bg-peach text-dark_blue rounded-[8px] font-extrabold text-sm mt-[22px] mr-auto ml-auto cursor-pointer font-roboto_slab  hover:bg-peach_hover "
          title="Return Home"
        >
          Return Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
