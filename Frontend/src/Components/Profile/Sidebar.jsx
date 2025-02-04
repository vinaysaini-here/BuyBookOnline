import React, { useEffect } from "react";
import assets from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LuLogOut } from "react-icons/lu";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user, isfetchingUser, fetchUser } = useAuthStore(
    (state) => state
  );
  const role = user?.role;

  const logoutUser = React.useCallback((e) => {
    e?.preventDefault();
    logout();
    navigate("/");
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="hidden sm:block w-1/4 bg-gray-50 p-6  ">
        <div className="flex flex-col items-center">
          <div>
            <img
              src={user?.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 "

            />
          </div>
          <h2 className="mt-4 text-xl font-bold text-slate-900">
            {user?.name}
          </h2>
          <p className="text-sm pt-1 pb-7 text-slate-800">{user?.email}</p>
        </div>
        <hr />
        {role === "user" && <div className="mt-12 space-y-8 text-lg flex items-center flex-col">
          <Link
            to="/profile"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Favourites
          </Link>
          <Link
            to="/profile/orderhistory"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Settings
          </Link>
        </div>}
        {role === "author" && <div className="mt-12 space-y-8 text-lg flex items-center flex-col">
          <Link
            to="/profile"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            All Orders
          </Link>
          <Link
            to="/add-new-book"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Add Books
          </Link>
          <Link
            to="/profile/settings"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Settings
          </Link>
        </div>}

        <button
          onClick={logoutUser}
          className="w-full mt-12 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Log Out
        </button>
      </div>
      <div className="w-full block sm:hidden bg-gray-50 p-4  ">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div
            // className="w-16 h-16 bg-blue-500 rounded-full"
            >
              <img
                src={user?.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-20 rounded-full object-cover border-4 "

              />
            </div>
            <div className="ml-4">
              <h2 className="mt-4 text-xl font-bold text-slate-900">
                {user?.name}
              </h2>
              <p className="text-sm pt-1 pb-7 text-slate-800">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logoutUser}
            className=" text-black rounded-sm text-3xl hover:bg-red-700 hover:text-white"
          >
            <LuLogOut />
          </button>
        </div>
        <hr />
        {role === "user" && <div className="px-3 mt-4 text-lg flex items-center flex-row justify-between">
          <Link
            to="/profile"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Favourites
          </Link>
          <Link
            to="/profile/orderhistory"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Settings
          </Link>
        </div>}
        {role === "author" && <div className="px-3 mt-4 text-lg flex items-center flex-row justify-between">
          <Link
            to="/profile"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            All Orders
          </Link>
          <Link
            to="/add-new-book"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Add Books
          </Link>
          <Link
            to="/profile/settings"
            className="cursor-pointer hover:text-blue-400 text-slate-800"
          >
            {" "}
            Settings
          </Link>
        </div>}

      </div>
    </>
  );
};

export default Sidebar;
