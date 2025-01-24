import React, { useState } from "react";
import assets from "../../assets/assets";
// import { OtpInput } from "reactjs-otp-input";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  const { otp, setotp } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await otp(formData);

    // Navigate to home page after successful OTP verification
    if (response) {
      // set("is_auth", true);
      navigate("/"); // Redirect to homepage on successful verification
    }
  };

  return (
    <div className=" bg-[#f5f5f5]">
      <div className="w-full h-screen flex items-start max-w-[80%] mx-auto">
        <div className="relative w-1/2  h-full flex flex-col">
          <img
            src={assets.verification_img}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-center items-center ">
          <div className=" w-full flex flex-col max-w-[500px] text-[#060606]">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-3xl font-semibold mb-2 text-center">
                OTP Verification
              </h3>

              <p className="text-base mt-6 mb-4 text-center text-[#B3B4B5]">
                Enter OTP sent to abc@example.com
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col ">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="OTP"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                />
              </div>
              <div className="w-full flex flex-col my-4">
                <button
                  className="w-full text-white my-2 font-semibold bg-[#00aeff] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                  type="submit"
                  disabled={setotp}
                >
                  {setotp ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
