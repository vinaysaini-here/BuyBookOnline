import React from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/assets";

const Categories = () => {
  return (
    <div className="bg-HomeBgColor w-full h-full flex justify-center items-center box-border ">
      <div className="w-4/5 pt-10 flex flex-col ">
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
              <h2 className="text-white text-lg font-medium">Romantic</h2>
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
                <h2 className="text-white text-lg font-medium">Friction</h2>
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
    </div>
  );
};

export default Categories;
