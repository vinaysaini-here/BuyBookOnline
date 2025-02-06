import React, { useState } from "react";
import NavBar from "../../Components/Navbar/NavBar";
import { Link } from "react-router-dom";
import assets from "../../assets/assets";
import Footer from "../../Components/Footer/Footer";

const CategoriesPg = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const categories = [
    { id: 1, name: "Fiction", image: assets.Book1 },
    { id: 2, name: "Non-Fiction", image: assets.Book3 },
    { id: 3, name: "Science", image: assets.Book4 },
    { id: 4, name: "Biography", image: assets.Book2 },

    { id: 5, name: "Children", image: assets.Book1 },
    { id: 6, name: "Fantasy", image: assets.Book3 },
    { id: 7, name: "Romance", image: assets.Book4 },
    { id: 8, name: "Mystery", image: assets.Book2 },

    { id: 9, name: "History", image: assets.Book1 },
    { id: 10, name: "Horror", image: assets.Book1 },
    { id: 11, name: "Motivational", image: assets.Book3 },
    { id: 12, name: "Others", image: assets.Book3 },
  ];

  return (
    <div>
      <NavBar />
      <div className="bg-gray-100 w-full  flex justify-center items-center box-border">
        <div className="w-11/12 md:w-4/5 pt-5 flex flex-col">
          <h1 className="text-2xl font-bold text-center mb-4 text-headingColor">
            Our Collection Of Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 pb-14">
            {categories.map((category, index) => (
              <div className="h-56 ">
                <Link
                  key={index}
                  to={"/allbooks"}
                  className="relative h-48 group rounded-t-lg overflow-hidden shadow hover:shadow-lg transition duration-300 flex justify-center bg-slate-300"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <h2 className="text-white text-lg font-medium">
                      {category.name}
                    </h2>
                  </div>
                </Link>
                <p className="w-full rounded-b-lg text-center text-2xl bottom-0 text-white bg-black bg-opacity-30">
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesPg;
