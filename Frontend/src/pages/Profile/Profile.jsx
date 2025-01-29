import React from "react";
import NavBar from "../../Components/Navbar/NavBar";
import Sidebar from "../../Components/Profile/Sidebar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full h-[100%] flex justify-center align-middle bg-HomeBgColor">
        <div className="w-85vw h-full flex flex-row justify-center shadow-lg bg-white">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
