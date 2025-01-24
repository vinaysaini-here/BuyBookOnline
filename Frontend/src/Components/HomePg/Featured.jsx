import React from "react";
import BookCol from "../Book/BookCol";

const Featured = () => {
  return (
    <section id="Featured">
    <div className="bg-yellow-100 w-full h-full flex justify-center items-center box-border ">
      <div className="w-4/5 pt-10 flex flex-col  ">
        <div className=" text-4xl text-gray-800 font-semibold py-3">
          <p>Featured Books</p>{" "}
        </div>

        <div className="flex justify-between w-full py-4 gap-4">
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
          <BookCol />
        </div>
      </div>
    </div>
    </section>
  );
};

export default Featured;
