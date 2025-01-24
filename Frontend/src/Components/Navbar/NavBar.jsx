import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   FaRegUserCircle,
//   FaRegHeart,
//   FaSearch,
//   FaShoppingCart,
// } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate()
  const handleSignIn=()=>{
    navigate("/login");
  }
  const handleSignUp=()=>{
    navigate("/signup");
  }
  return (
    <div className="w-full h-7vh bg-blue-500 flex justify-between items-center px-40 text-lg text-white">
      <p className="text-2xl">BookStore</p>
      <div className="flex justify-between items-center space-x-7">
        <p>Home</p>
        <p>Books</p>
        <p>Categories</p>
        <p>Contact</p>

        <div className="flex items-center space-x-7 relative">
          {/* <FaSearch className="cursor-pointer " /> */}
          {/* <FaRegHeart className="cursor-pointer" /> */}
          {/* <FaRegUserCircle className="cursor-pointer" /> */}
          {/* <FaShoppingCart className="cursor-pointer" /> */}
          <div className="flex items-center space-x-5 relative">
            <button onClick={() => handleSignIn()} className="bg-blue-500 text-white w-20 rounded-md border-white p-1 border-2 cursor-pointer hover:text-blue-500 hover:bg-white hover:font-semibold">
              SignIn
            </button>
            <button onClick={() => handleSignUp()} className="bg-blue-500 text-white  w-20 rounded-md border-white p-1 border-2 cursor-pointer hover:text-blue-500 hover:bg-white hover:font-semibold">
              SignUp
            </button>{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
