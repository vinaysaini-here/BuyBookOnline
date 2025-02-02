import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";

const Setting = () => {
  const { user, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 30KB)
    if (file.size > 30 * 1024) {
      toast.error("Please select an image smaller than 30KB.");
      return;
    }

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
    <div className="flex flex-col items-center sm:block flex-1 overflow-auto w-full sm:w-3/4 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings</h1>
      
      <div className="w-full max-w-xl p-6 bg-white rounded-md shadow">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Edit Profile
        </h2>

        {/* Profile Picture Section */}
        <div className="relative flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 overflow-hidden">
            {/* Profile Image */}
            <img
              src={selectedImg || user?.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-4"
            />

            {/* Camera Icon (Button) */}
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer border transition-transform duration-200 hover:scale-105 ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="w-5 h-5 text-gray-700" />
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </div>

          <p className="text-sm text-zinc-500 mt-2">
            {isUpdatingProfile ? "Uploading..." : "Click to update your photo"}
          </p>
          <p className="text-sm text-zinc-400">
            Please select a photo smaller than 30KB
          </p>
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <p className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm">
            {user?.name}
          </p>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <p className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm">
            {user?.email}
          </p>
        </div>

        {/* Save Changes Button */}
        <div className="mt-6">
          <button className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
