import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Camera } from "lucide-react";

const Setting = () => {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  if (!user) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
  }

  return (
    <div className="hidden sm:block flex-1 overflow-auto w-3/4 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings</h1>
      <div className="w-full max-w-xl p-6 bg-white rounded-md shadow">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Edit Profile
        </h2>

        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
            <img
              src={selectedImg || user?.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 "

            />

          </div>
          <label
            htmlFor="avatar-upload"
            className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
          >


            <Camera className="w-5 h-5 text-base-200" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />

          </label>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Click to update your photo"}
            
          </p>
          <p className="text-sm text-zinc-400"> Please Select Photo of Size less then 30KB</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <p className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm">{user?.name}</p>


        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm">
            {user?.email}
          </p>
        </div>

        <div className="mt-6">
          <button className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
