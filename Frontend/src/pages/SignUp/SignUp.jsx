import { FaGoogle } from "react-icons/fa";
// import assets from "../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader2 } from "lucide-react";

const colors = {
  primary: "#060606",

  background: "#f5f5f5",

  disbaled: "#D9D9D9",
};

const SignUp = () => {
  const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signup(formData);

      navigate("/verify-email");
    }
  };

  const handleGoogleLogin = async () => {
    window.location.href = "https://buybookonline.onrender.com/auth/google";
  };

  return (
    <>
      <div className="hidden sm:block bg-[#f5f5f5]">
        <div className="w-full h-screen flex items-start max-w-[80%] mx-auto">
          <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
            <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold mr-auto">
              Buy Book Online
            </h1>

            <div className="w-full flex flex-col max-w-[500px]  text-[#060606] ">
              <div className="w-full flex flex-col mb-2">
                <h3 className="text-3xl font-semibold mb-2">
                  Create Your Account
                </h3>

                <p className="text-base mb-2">
                  Welcome Back! Please enter your details.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-fulltext-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-fulltext-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-fulltext-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="w-full flex flex-col my-4">
                  <button
                    type="submit"
                    className="w-full text-white my-2 font-semibold bg-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "SignUp"
                    )}
                  </button>
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
                Sign up With Google
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-sm font-normal text-black">
                Already have a account?{" "}
                <span className="font-semibold underline underline-offset-2 cursor-pointer">
                  <Link to="/login" className="link link-primary">
                    Sign in
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="relative w-1/2 h-full flex flex-col">
            <img
              src="https://fydn.imgix.net/m%2Fgen%2Fart-print-square-p1%2F62daaadb-9c86-4417-a2a8-4f0b588a3d4d.jpg?auto=format%2Ccompress&q=75&ar=1:1&fit=crop&crop=top&w=1280"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="block sm:hidden bg-[#f5f5f5]">
        <div className="w-full min-h-screen flex items-center justify-center bg-[#f5f5f5] p-6">
          <div className="w-full max-w-md bg-[#f5f5f5] flex flex-col p-6 md:p-12 gap-6 shadow-lg rounded-lg">
            <h1 className="text-lg sm:text-xl text-[#060606] font-semibold">
              Buy Book Online
            </h1>

            <div className="w-full flex flex-col max-w-[500px]  text-[#060606] ">
              <div className="w-full flex flex-col mb-2">
                <h3 className="text-3xl font-semibold mb-2">
                  Create Your Account
                </h3>

                <p className="text-base mb-2">
                  Welcome Back! Please enter your details.
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-fulltext-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-fulltext-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-fulltext-black py-2 my-2 bg-transparent border-b border-black focus: outline-none"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <div className="w-full flex flex-col my-4">
                  <button
                    type="submit"
                    className="w-full text-white my-2 font-semibold bg-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                    disabled={isSigningUp}
                  >
                    {isSigningUp ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "SignUp"
                    )}
                  </button>
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
                Sign up With Google
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <p className="text-sm font-normal text-black">
                Already have a account?{" "}
                <span className="font-semibold underline underline-offset-2 cursor-pointer">
                  <Link to="/login" className="link link-primary">
                    Sign in
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
