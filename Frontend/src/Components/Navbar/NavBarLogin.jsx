import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBarLogin = () => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };
  const handleCart = () => {
    navigate("/cart");
  };
  const handleHome = () => {
    navigate("/");
  };
  const handleAllbooks = () => {
    navigate("/allbooks");
  };
  const handleCategories = () => {
    navigate("/categories");
  };
  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <div>
      <div className="w-full h-16 bg-blue-500 flex justify-between items-center px-6 md:px-12 lg:px-40 text-lg text-white">
        <p className="text-2xl font-bold">BuyBookOnline</p>
        <div className="hidden md:flex justify-between items-center space-x-7">
          <p
            onClick={handleHome}
            className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
          >
            Home
          </p>
          <p
            onClick={handleAllbooks}
            className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
          >
            Books
          </p>
          <p
            onClick={handleCategories}
            className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
          >
            Categories
          </p>
          <p
            onClick={handleCart}
            className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
          >
            Cart
          </p>
        </div>

        <div className="hidden md:flex items-center space-x-7">
          <button
            onClick={handleProfile}
            className="bg-blue-500 text-white w-20 rounded-md border-white p-1 border-2 cursor-pointer hover:text-blue-500 hover:bg-white hover:font-semibold"
          >
            Profile
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
            className="text-white text-2xl cursor-pointer"
          >
            &#9776;
          </button>
        </div>
      </div>
      <div
        className={`${MobileNav} w-full bg-blue-500 flex flex-col space-y-4 px-6 py-4 text-lg text-white md:hidden items-center`}
      >
        <p onClick={handleHome} className="cursor-pointer hover:underline ">
          Home
        </p>
        <p onClick={handleAllbooks} className="cursor-pointer hover:underline">
          Books
        </p>
        <p
          onClick={handleCategories}
          className="cursor-pointer hover:underline"
        >
          Categories
        </p>
        <p onClick={handleCart} className="cursor-pointer hover:underline">
          Cart
        </p>
        <button
          onClick={handleProfile}
          className="bg-blue-500 text-white w-full rounded-md border-white p-2 border-2 cursor-pointer hover:text-blue-500 hover:bg-white hover:font-semibold"
        >
          Profile
        </button>
      </div>
    </div>
  );
};

export default NavBarLogin;
