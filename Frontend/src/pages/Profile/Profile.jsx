import React from "react";
import NavBarLogin from "../../Components/Navbar/NavBarLogin";
import Sidebar from "../../Components/Profile/Sidebar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      <NavBarLogin />
      <div className="w-full h-[100%] flex justify-center align-middle">
        <div className="w-85vw h-full flex flex-row justify-center bg-gray-900">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
