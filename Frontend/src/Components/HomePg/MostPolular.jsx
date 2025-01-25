import React from "react";
import BookCol from "../Book/BookCol";
import { useNavigate } from "react-router-dom";

const MostPopular = () => {
  const navigate = useNavigate();
  const handleAllbooks = () => {
    navigate("/allbooks");
  };

  return (
    <div className="bg-HomeBgColor w-full flex justify-center items-center box-border py-10">
      <div className="w-4/5 flex flex-col">
        {/* Section Header */}
        <div className="py-3 flex justify-between items-center">
          <p className="text-4xl text-headingColor font-semibold">
            Most Popular Books
          </p>
          <button
            onClick={handleAllbooks}
            className="text-headingColor font-semibold bg-transparent border border-headingColor rounded-3xl p-2 w-24 text-center flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition"
          >
            View All
          </button>
        </div>

        {/* Books Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-5">
          <BookCol />
          <BookCol />
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

export default MostPopular;
