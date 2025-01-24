import React from "react";
import Bookcol from "../Book/BookCol";

const Favourites = () => {
  return (
    <div className="w-3/4 p-6">
      <h1 className="text-2xl font-bold mb-6">Favourites</h1>
      <div className="grid grid-cols-4 gap-4">
        <Bookcol />
        <Bookcol />
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
