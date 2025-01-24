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
    <div className="h-93vh flex bg-homebg bg-no-repeat bg-cover bg-center">
      <div className="w-3/6 ml-72 flex flex-col items-center justify-center bg-white bg-opacity-10">
        <h1 className="text-4xl font-semibold text-white text-center">
          Dicover books
        </h1>
        <p className="mt-4 text-xl text-white text-center ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          distinctio.
        </p>
        <div className="mt-8">
          <button onClick={() => scrollTo("Featured")} className="text-white text-x bg-black font-semibold border-yellow-100 px-10 py-2 hover:bg-white hover:text-black rounded-full">
            Explore
          </button>
        </div>
      </div>
      <div className="w-full h-auto flex items-center justify-center">
        {/* <img src={assets.homebg}/> */}
      </div>
    </div>
  );
};

export default HomeMain;
