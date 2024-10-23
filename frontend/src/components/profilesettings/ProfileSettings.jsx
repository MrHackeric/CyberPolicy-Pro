import React, { useState } from 'react';
import Header from '../header/Header';

const ProfileSettings = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Add logic to save the profile information here
    console.log({
      fullName,
      email,
      phoneNumber,
      profilePic,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-6 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 flex">
          {/* Profile Picture Section */}
          <div className="flex-shrink-0 flex items-center justify-center mr-6">
            <label className="cursor-pointer relative">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-24 w-24 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                  Upload Picture
                </div>
              )}
            </label>
          </div>

          {/* Profile Details Section */}
          <div className="flex-grow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Profile Settings</h2>
            <form onSubmit={handleSave} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
