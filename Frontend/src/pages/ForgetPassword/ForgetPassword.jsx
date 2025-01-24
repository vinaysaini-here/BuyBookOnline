import React, { useState } from "react";
import assets from "../../assets/assets";

import { useAuthStore } from "../../store/useAuthStore";

import { useNavigate } from'react-router-dom';

const ForgetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
   
  });
  const { forgetPasswordEmailCheck, setforgetPasswordEmailCheck } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgetPasswordEmailCheck(formData);
    // Navigate to OTP verification page
    navigate('/CodeRecived');
  };


  return (
    <div className=" bg-[#ebdfdf] h-screen w-screen flex items-center justify-center">
      <div className="bg-[#f4efef] flex items-center justify-center w-[59%] h-[80%] rounded-xl">
        <div className="relative w-1/2  h-full flex flex-col">
          <img
            src={assets.ForgetPassword_img}
            className="w-full h-full object-cover rounded-s-xl bg-[#00aeff]"
          />
        </div>
        <div className="w-1/2 h-full max-w-[500px] bg-[#f4efef] flex flex-col p-16 items-start justify-center rounded-xl">
          <div className=" flex flex-col mb-21 text-[#060606] justify-center items-start py-4 ">
            <h3 className="text-4xl font-semibold mb-2">
              <p>Forget</p>
              <p>Your Password?</p>
            </h3>
          </div>
          <form onSubmit={handleSubmit} >
            <div className="w-full flex flex-col gap-5 ">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full pl-2 text-black py-2 my-2 bg-[#d1eaf6]  border rounded-lg border-black focus: outline-none"
                required value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="w-full flex flex-col my-4 mt-5 ">
              <button className="w-full text-black my-2 font-semibold bg-[#00aeff] border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
              Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
