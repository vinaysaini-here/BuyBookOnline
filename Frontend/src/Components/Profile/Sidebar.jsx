import React from "react";
import assets from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const logoutUser = React.useCallback((e) => {
    e?.preventDefault();
    logout();
    navigate('/');
  }, []);

  return (
    <div className="w-1/4 bg-gray-50 p-6 pb-48 ">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-500 rounded-full">
          <img src={assets.user_img} alt="" />
        </div>
        <h2 className="mt-4 text-xl text-gray-900 font-bold">Vinay</h2>
        <p className="text-sm pt-1 pb-7 text-gray-800">Vinay@gmail.com</p>
      </div>
      <hr />
      <div className="mt-12 space-y-8 text-lg flex items-center flex-col text-gray-800">
        <Link to="/profile" className="cursor-pointer hover:text-blue-400">
          {" "}
          Favourites
        </Link>
        <Link
          to="/profile/orderhistory"
          className="cursor-pointer hover:text-blue-400"
        >
          {" "}
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="cursor-pointer hover:text-blue-400"
        >
          {" "}
          Settings
        </Link>
      </div>
      <button onClick={logoutUser} className="w-full text-white mt-12 py-2 bg-red-600 rounded-lg hover:bg-red-700">
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
