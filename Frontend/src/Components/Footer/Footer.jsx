import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const handleAllbooks = () => {
    navigate("/allbooks");
  };
  const handleContact = () => {
    navigate("/contact");
  };
  const handleCategories = () => {
    navigate("/categories");
  };
  return (
    <section className="w-full bg-gray-900 text-white flex flex-col">
      <div className="w-3/4 mx-auto flex justify-between items-center border-b border-gray-300 py-8">
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl">Book Store</p>
          <div className="flex items-center mt-4">
            <a
              href="http://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pr-2 transition-transform transform hover:scale-125"
            >
              <FaFacebookF />
            </a>
            <a
              href="http://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pr-2 transition-transform transform hover:scale-125"
            >
              <FaInstagram />
            </a>
            <a
              href="http://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pr-2 transition-transform transform hover:scale-125"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-125"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        <ul className="grid grid-cols-2 grid-rows-3 gap-4 text-center">
          <li
            onClick={handleHome}
            className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
          >
            Home
          </li>
          <li
            onClick={handleAllbooks}
            className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
          >
            Books
          </li>
          <li
            onClick={handleCategories}
            className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
          >
            Categories
          </li>
          <li
            onClick={handleContact}
            className="cursor-pointer relative hover:after:w-full after:transition-all after:duration-300 after:block after:h-0.5 after:w-0 after:bg-white"
          >
            Contact
          </li>
        </ul>
      </div>
      <div className="w-3/4 mx-auto flex justify-between items-center py-4">
        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        <span>
          Made with <span className="text-red-500">&#10084;</span> by{" "}
          <a
            href="https://github.com/jaiksaini/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Jay K.Saini{" "}
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
              &nbsp; &   &nbsp;
          </a>
          <a
            href="https://github.com/vinaysaini-here/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
           Vinay Saini
          </a>
        </span>
      </div>
    </section>
  );
};

export default Footer;
