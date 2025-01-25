import React from "react";
import Bookcol from "../Book/BookCol";

const Favourites = () => {
  return (
    <div className="w-3/4 p-6">
      <h1 className="text-2xl font-bold mb-6 ">Favourites</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-5">
        <Bookcol />
        <Bookcol />
        <Bookcol />
        <Bookcol />
        <Bookcol />
        <Bookcol />
      </div>
    </div>
  );
};

export default Favourites;
