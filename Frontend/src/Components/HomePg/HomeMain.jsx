import React from "react";
import assets from "../../assets/assets";

const HomeMain = () => {
  const scrollTo = (id) => {
    let element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <div className="lg:h-93vh xl:h-93vh flex flex-col sm:h-96 md:flex-row bg-homebg2 bg-no-repeat bg-cover bg-center">
      {/* Left Section */}
      <div className="w-full md:w-3/6 md:ml-72 flex flex-col items-center justify-center bg-white bg-opacity-10 p-6 md:p-0">
        <h1 className="text-3xl md:text-4xl font-semibold text-white text-center">
          Discover books
        </h1>
        <p className="mt-4 text-base md:text-xl text-white text-center">
          Welcome to BuyBooksOnline – Your One-Stop Destination for Books of All
          Genres, Delivered to Your Doorstep!
        </p>
        <div className="mt-6 md:mt-8">
          <button
            onClick={() => scrollTo("Featured")}
            className="text-white text-sm md:text-base bg-black font-semibold border-HomeBgColor px-6 md:px-10 py-2 hover:bg-white hover:text-black rounded-full transition duration-300"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full h-auto flex items-center justify-center mt-6 md:mt-0">
        {/* Uncomment the image below if needed */}
        {/* <img src={assets.homebg} alt="Background" className="w-full md:w-auto" /> */}
      </div>
    </div>
  );
};

export default HomeMain;
