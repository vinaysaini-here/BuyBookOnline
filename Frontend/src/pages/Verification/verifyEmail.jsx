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
    <div className="w-full min-h-screen flex items-center justify-center bg-HomeBgColor p-6">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Image Section */}
        <div className="hidden lg:block">
          <img
            src={assets.verification_img}
            className="w-full h-full object-cover"
            alt="Verification"
          />
        </div>
        <div className="p-8 lg:p-12 flex flex-col items-center text-center justify-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-black">
            OTP Verification
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-4">
            Enter OTP sent to <span className="font-medium text-gray-800">abc@example.com</span>
          </p>
            <form onSubmit={handleSubmit}>
              <div className="w-full mt-6 flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 my-2 bg-gray-100 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4f5050] outline-none"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="OTP"
                  className="w-full px-4 py-3 my-2 bg-gray-100 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4f5050] outline-none tracking-widest text-center text-xl"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                />
              </div>
              <div className="w-full flex flex-col my-4">
                <button
                  className="w-full mt-4 py-3 text-white font-semibold bg-black hover:bg-[#434444] rounded-md transition-all duration-300 flex items-center justify-center"
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
  );
};

export default VerifyEmail;
