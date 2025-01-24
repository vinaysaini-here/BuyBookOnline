import React, { useState } from "react";
import assets from "../../assets/assets";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react"

const NewPassword = () => {
  const { id, token } = useParams(); // Extract id and token from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { newPassword, setnewPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) {
      return alert("Both fields are required!");
    }

    // Ensure passwords match
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    newPassword(id, token, formData)
    // Navigate to login page after successful password reset
    navigate("/login");
  };

  return (
    <div className="bg-[#ebdfdf] h-screen w-screen flex items-center justify-center">
      <div className="bg-[#f4efef] flex items-center justify-center w-[59%] h-[80%] rounded-xl">
        <div className="relative w-1/2 h-full flex flex-col">
          <img
            src={assets.EnterMail_img}
            className="w-full h-full object-cover rounded-s-xl"
          />
        </div>
        <div className="w-1/2 h-full max-w-[500px] bg-[#f4efef] flex flex-col p-16 items-start justify-center rounded-xl">
          <div className="flex flex-col mb-21 text-[#060606] justify-center items-start py-4">
            <h3 className="text-4xl font-semibold mb-2">
              <p>Reset</p>
              <p>Your Password?</p>
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-5">
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-2 text-black py-2 my-2 bg-[#d1eaf6] border rounded-lg border-black focus:outline-none"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-col gap-5">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full pl-2 text-black py-2 my-2 bg-[#d1eaf6] border rounded-lg border-black focus:outline-none"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="w-full flex flex-col my-4 mt-5">
              <button
                type="submit"
                className="w-full text-black my-2 font-semibold bg-[#00aeff] border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer" disabled={setnewPassword}
              >
                {setnewPassword ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
