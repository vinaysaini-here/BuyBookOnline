import React from "react";
import assets from "../../assets/assets";

const BookCol = () => {
  return (
    <div className="w-52 h-72 rounded-lg bg-white flex flex-col">
      <div className="relative w-48 h-72 m-auto ">
        <img
          src={assets.BookImg}
          alt=""
          className="absolute h-full m-auto w-full object-cover pt-2"
        />
      </div>
      <div className="w-52 text-wrap text-black px-2">
        <div className=" text-black text-lg font-semibold"> Book Name</div>
        <div className="text-gray-700 text-sm">$400</div>
      </div>
    </div>
  );
};

export default BookCol;
