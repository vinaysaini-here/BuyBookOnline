import React, { useEffect, useState } from "react";
import BookCol from "../Book/BookCol";

import { axiosInstance } from "../../lib/axios";

const Featured = () => {
  const [data, setData] = useState([]); // Initialize as an empty array to avoid `.map` issues

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/book/recentBooks"
        );

        setData(response.data); // Access the "data" property from the response
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
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
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-5 m-auto">
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
      </section>
    </>
  );
};

export default Featured;
