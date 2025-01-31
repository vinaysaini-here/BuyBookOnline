import React from "react";
import { FaGoogle } from "react-icons/fa";
import assets from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";

const colors = {
  primary: "#060606",

  background: "#f5f5f5",

  disbaled: "#D9D9D9",
};

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData);
    if (response) {
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    window.open(`http://localhost:8000/auth/google`, "_self");
  };

  return (
    <>
      <div className="hidden sm:block bg-[#f5f5f5]">
        <div className="w-full h-screen flex items-start max-w-[80%] mx-auto">
          <div className="relative w-1/2 h-full flex flex-col">
            <img
              src="https://fairybellskart.com/wp-content/uploads/2024/11/front-6450f42da7126-A4_Black_Framed_Poster.jpg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 gap-10 items-center">
            <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold mr-auto">
              Buy Book Online
            </h1>

            <div className="w-full flex flex-col max-w-[500px]  text-[#060606] ">
              <div className="w-full flex flex-col mb-2">
                <h3 className="text-3xl font-semibold mb-2">Login</h3>

                <p className="text-base mb-2">
                  Welcome Back! Please enter your details.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col">
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
                    type="password"
                    placeholder="Password"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="w-full flex flex-col my-4">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 underline underline-offset-2 cursor-pointer"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="w-full flex flex-col my-4">
                  <button
                    type="submit"
                    className="w-full text-white my-2 font-semibold bg-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Log in"
                    )}
                  </button>

                  {/* <button className="w-full text-black my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                Register
              </button> */}
                </div>
              </form>
              <div className="w-full flex items-center justify-center relative py-2">
                <div className="w-full h-[1px] bg-black"></div>

                <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">
                  or
                </p>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full ☐ text-black my-2 font-semibold bg-white border ☐ border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
              >
                <FaGoogle className="h-6 mr-2" />
                Log In With Google
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-sm font-normal text-black">
                Dont have a account?{" "}
                <span className="font-semibold underline underline-offset-2 cursor-pointer">
                  <Link to="/signup" className="link link-primary">
                    Sign Up
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="block sm:hidden bg-[#f5f5f5]">
        <div className="w-full min-h-screen flex items-center justify-center bg-[#f5f5f5] p-6">
          <div className="w-full max-w-md bg-[#f5f5f5] flex flex-col p-6 md:p-12 gap-6 shadow-lg rounded-lg">
            <h1 className="text-lg sm:text-xl text-[#060606] font-semibold">
              Buy Book Online
            </h1>

            <div className="text-[#060606]">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2">Login</h3>
              <p className="text-sm sm:text-base mb-4">
                Welcome Back! Please enter your details.
              </p>

              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full text-black py-2 px-3 my-2 bg-transparent border-b border-black focus:outline-none"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                {/* Password Input */}
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full text-black py-2 px-3 my-2 bg-transparent border-b border-black focus:outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                {/* Forgot Password Link */}
                <div className="w-full flex justify-end my-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 underline underline-offset-2"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full text-white my-2 font-semibold bg-black rounded-md py-3 flex items-center justify-center cursor-pointer"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </form>

              {/* OR Divider */}
              <div className="w-full flex items-center justify-center relative py-2">
                <div className="w-full h-[1px] bg-black"></div>
                <p className="text-lg absolute text-black/80 bg-[#f5f5f5] px-2">
                  or
                </p>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full text-black my-2 font-semibold bg-white border border-black/40 rounded-md py-3 flex items-center justify-center cursor-pointer"
              >
                <FaGoogle className="h-5 w-5 mr-2" />
                Log In With Google
              </button>

              {/* Sign Up Link */}
              <div className="w-full flex items-center justify-center mt-4">
                <p className="text-sm text-black">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold underline underline-offset-2 text-blue-600"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
