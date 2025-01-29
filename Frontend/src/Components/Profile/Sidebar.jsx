import React, { useEffect, useState } from "react";
import assets from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const logoutUser = React.useCallback((e) => {
    e?.preventDefault();
    logout();
    navigate('/');
  }, []);

  const [data, setData] = useState([]); // Initialize as an empty array to avoid `.map` issues

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/user-info", { withCredentials: true }
        );
        console.log(response.data);

        setData(response.data.user); // Access the "data" property from the response
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };

    fetchUser();
  }, []);


  return (
    <div className="w-1/4 bg-gray-800 p-6 pb-48 ">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-500 rounded-full">
          <img src={assets.user_img} alt="" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-900">{data.name}</h2>
        <p className="text-sm pt-1 pb-7 text-slate-800">{data.email}</p>
      </div>
      <hr />
      <div className="mt-12 space-y-8 text-lg flex items-center flex-col">
        <Link to="/profile" className="cursor-pointer hover:text-blue-400 text-slate-800">
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
      </div>
      <button onClick={logoutUser} className="w-full mt-12 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
