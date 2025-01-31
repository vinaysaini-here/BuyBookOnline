import React from "react";
import NavBar from "../../Components/Navbar/NavBar";
import Sidebar from "../../Components/Profile/Sidebar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full h-[100%] flex justify-center align-middle bg-HomeBgColor">
        <div className="w-full h-91vh md:w-4/5 lg:w-3/4 md:h-5/6 flex flex-col md:flex-row justify-center shadow-lg bg-white gap-4 p-4 ">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
