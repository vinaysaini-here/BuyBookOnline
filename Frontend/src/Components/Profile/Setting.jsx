import React, { useState } from "react";

const Setting = () => {
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    name: "Vinay",
    email: "Vinay@gmail.com",
    address: "Ghar",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({ ...profileData, profilePicture: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    alert("Profile updated successfully!");
    console.log(profileData);
  };
  return (
    <>
      <div className="hidden sm:block flex-1 overflow-auto w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings</h1>
        <div className="w-full max-w-xl p-6 bg-white Hover rounded-md shadow">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Edit Profile
          </h2>

          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
              {profileData.profilePicture ? (
                <img
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Upload
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-600"
              onChange={handleProfilePictureChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            ></textarea>
          </div>

          <div className="mt-6">
            <button
              onClick={saveChanges}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div className="block sm:hidden flex-1 overflow-auto w-full p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Settings</h1>
        <div className="w-full max-w-xl p-6 bg-white Hover rounded-md shadow">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Edit Profile
          </h2>

          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
              {profileData.profilePicture ? (
                <img
                  src={profileData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Upload
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-600"
              onChange={handleProfilePictureChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-gray-700 bg-gray-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            ></textarea>
          </div>

          <div className="mt-6">
            <button
              onClick={saveChanges}
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
