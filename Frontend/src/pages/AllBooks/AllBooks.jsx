import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import BookCol from "../../Components/Book/BookCol";
import NavBar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";

const AllBooks = () => {

  const [data, setData] = useState([]); // Initialize as an empty array to avoid `.map` issues

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/book/getAllBooks"
        );

        setData(response.data); // Access the "data" property from the response
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

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
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-5">
            {data.length > 0 ? (
              data.map((item, i) => (
                <div key={i}>
                  <BookCol data={item} />
                </div>
              ))
            ) : (
              <p className="text-center col-span-full">
                No featured books available
              </p>
            )}

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AllBooks;
