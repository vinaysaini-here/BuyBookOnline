import React from "react";
import assets from "../../assets/assets";

const Categories = () => {
  return (
    <div className="bg-yellow-100 w-full h-full flex justify-center items-center box-border ">
      <div className="w-4/5 pt-10 flex flex-col ">
        <h1 className="text-3xl text-gray-800 font-bold mb-5 flex justify-center">
          Categories
        </h1>
        <div className="flex flex-wrap gap-10 justify-center">
          <div className="w-30% h-30rem rounded-lg bg-slate-200 flex flex-col relative items-center">
            <img
              src={assets.Book1}
              alt="image"
              className="absolute h-full m-auto object-cover "
            />
          </div>
          <div className="w-30% h-30rem flex flex-col justify-between">
            <div className="h-56 w-full bg-green-50 rounded-lg relative">
            <img
              src={assets.Book3}
              alt="image"
              className="absolute h-full m-auto object-cover "
            />
            </div>
            <div className="w-full h-56 bg-green-50 rounded-lg relative">
            <img
              src={assets.Book4}
              alt="image"
              className="absolute h-full m-auto object-cover "
            /> 
            </div>
          </div>
          <div className="w-30% h-30rem rounded-lg bg-slate-200 flex flex-col relative items-center">
            <img
              src={assets.Book2}
              alt="image"
              className="absolute h-full m-auto object-cover "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
