import React from "react";
import BookCol from "../../Components/Book/BookCol";
import NavBar from "../../Components/Navbar/NavBar";

const AllBooks = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-yellow-100 w-full h-full flex justify-center items-center box-border ">
        <div className="w-4/5 pt-5 flex flex-col  ">
          <div className="py-3 flex justify-between">
            <p className="text-4xl text-gray-800 font-semibold">
              All Books
            </p>{" "}
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
    </div>
  );
};

export default AllBooks;
