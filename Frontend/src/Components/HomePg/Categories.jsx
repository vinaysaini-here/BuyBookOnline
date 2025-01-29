import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/assets";

const Categories = () => {
  // const [MobileNav] = useState(false);

  return (
    <div className="bg-HomeBgColor w-full h-full flex justify-center items-center box-border ">
      <div className="hidden sm:block w-4/5 pt-2 flex-col max-w-6xl ">
        <h1 className="text-3xl text-headingColor font-bold mb-5 flex justify-center">
          Categories
        </h1>
        <div className="flex flex-wrap gap-10 justify-center">
          <Link
            to={"/categories"}
            className="w-30% h-30rem bg-slate-200 relative group items-center flex flex-col rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={assets.Book1}
              className="absolute h-full m-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-white text-lg font-medium">Romance</h2>
            </div>
          </Link>
          <div className="w-30% h-30rem flex flex-col justify-between">
            <Link
              to={"/categories"}
              className="h-56 w-full bg-slate-200 relative group items-center flex flex-col rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={assets.Book3}
                className="absolute h-full m-auto object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h2 className="text-white text-lg font-medium">Fantasy</h2>
              </div>
            </Link>
            <Link
              to={"/categories"}
              className="w-full h-56  bg-slate-200 relative group items-center flex flex-col rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={assets.Book4}
                className="absolute h-full m-auto object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h2 className="text-white text-lg font-medium">Horror</h2>
              </div>
            </Link>
          </div>
          <Link
            to={"/categories"}
            className="w-30% h-30rem bg-slate-200 relative group items-center flex flex-col rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={assets.Book2}
              className="absolute h-full m-auto object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-white text-lg font-medium">Motivational</h2>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full block sm:hidden max-w-6xl pt-2 flex-col">
        {/* Heading */}
        <h1 className="text-3xl text-headingColor font-bold mb-5 text-center">
          Categories
        </h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-2">
          {/* Romance */}
          <Link
            to="/categories"
            className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={assets.Book1}
              alt="Romance"
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-white text-lg font-semibold">Romance</h2>
            </div>
          </Link>

          {/* Fantasy */}
          <Link
            to="/categories"
            className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={assets.Book3}
              alt="Fantasy"
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-white text-lg font-semibold">Fantasy</h2>
            </div>
          </Link>

          {/* Horror */}
          <Link
            to="/categories"
            className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={assets.Book4}
              alt="Horror"
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-white text-lg font-semibold">Horror</h2>
            </div>
          </Link>

          {/* Motivational */}
          <Link
            to="/categories"
            className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
          >
            <img
              src={assets.Book2}
              alt="Motivational"
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-white text-lg font-semibold">Motivational</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
