import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCamera, FaSpinner } from 'react-icons/fa'; // Icons for inputs
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {
  const [fullName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false); // New state for checkbox
  const navigate = useNavigate()

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleSignUp = async () => {

    // Simulate sign up logic (replace with actual API call)
    try {
      setIsLoading(true);
      const userData = {
        fullName: fullName,
        email: email,
        phoneNUmber: phone,
        role: role || "user",
        profilePicture: profilePic,
        password: password,
      }

      const response = await axios.post('http://localhost:3000/api/user/register', userData)

      console.log("User created succesfully", response.data)

    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setIsLoading(false);

    }, 3000);
    navigate('/login')
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        {/* Full Name Input */}
        <div className="relative mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Create a password"
            />
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="relative mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full focus:outline-none focus:border-blue-400"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Profile Picture Upload */}
        <div className="relative mb-4">
          <label htmlFor="profilePic" className="block text-gray-700 font-medium mb-2">Profile Picture</label>
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaCamera className="text-gray-400 mr-2" />
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="w-full focus:outline-none focus:border-blue-400"
            />
          </div>
          {profilePic && (
            <div className="mt-2 text-sm text-gray-600">Selected: {profilePic.name}</div>
          )}
        </div>

        {/* Privacy Policy Agreement Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="privacyPolicy"
            checked={agreedToPrivacyPolicy}
            onChange={(e) => setAgreedToPrivacyPolicy(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="privacyPolicy" className="text-gray-600">
            I agree to the <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
          </label>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          disabled={isLoading || !agreedToPrivacyPolicy} // Disable if loading or not agreed
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75
            ${isLoading || !agreedToPrivacyPolicy ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin mr-2" /> Signing up...
            </div>
          ) : (
            'Sign Up'
          )}
        </button>

        {/* Already have an account Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
