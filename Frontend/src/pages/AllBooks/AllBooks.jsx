import React from "react";
import BookCol from "../../Components/Book/BookCol";
import NavBar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";

const AllBooks = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="bg-gray-100 w-full flex justify-center items-center box-border pb-10">
        <div className="w-11/12 md:w-4/5 pt-5 flex flex-col">
          <div className="py-3 flex justify-center">
            <p className="text-2xl font-bold sm:text-3xl md:text-3xl text-headingColor">
              All Books
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-4">
            <BookCol />
            <BookCol />
            <BookCol />
            <BookCol />
            <BookCol />
            <BookCol />
            <BookCol />
            <BookCol />
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllBooks;
