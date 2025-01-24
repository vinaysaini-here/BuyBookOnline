import React from "react";
import BookCol from "../Book/BookCol";
import { useNavigate } from "react-router-dom";

const MostPolular = () => {
  const navigate = useNavigate();
  const handleAllbooks = () => {
    navigate("/allbooks");
  };
  return (
    <div className="bg-yellow-100 w-full h-full flex justify-center items-center box-border ">
      <div className="w-4/5 pt-10 flex flex-col  ">
        <div className="  py-3 flex justify-between">
          <p className="text-4xl text-gray-800 font-semibold">
            Most Popular Books
          </p>{" "}
          <button
            onClick={() => handleAllbooks()}
            className="text-black font-semibold bg-transparent border border-black rounded-3xl p-2 w-24 text-center flex items-center justify-center cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="flex justify-between w-full py-4">
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
        </div>
        <div className="flex justify-between w-full py-4 pb-16">
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
        </div>
      </div>
    </div>
  );
};

export default MostPolular;
