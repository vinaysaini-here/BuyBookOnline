import React from "react";
import BookCol from "../Book/BookCol";

const Featured = () => {
  return (
    <section
      id="Featured"
      className="bg-HomeBgColor w-full flex justify-center items-center box-border py-10"
    >
      <div className="w-4/5 flex flex-col">
        {/* Section Title */}
        <div className="text-4xl text-gray-800 font-semibold py-3 text-center">
          <p>Featured Books</p>
        </div>

        {/* Book Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-5">
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
        </div>
      </div>
    </section>
  );
};

export default Featured;
