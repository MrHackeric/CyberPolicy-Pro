import React from 'react';
import './Section.css'; // External CSS for animated background


const Navbar = () => {
  return (
    <nav className="animated-bg py-4 text-center text-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand Logo */}
        <h1 className="text-3xl font-bold text-white">CyberPolicy Pro</h1>

        {/* Buttons */}
        <div className="space-x-4">
          <a href="/login" className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out" target="_blank" rel="noopener noreferrer">
            Login
          </a>
          <a href="/signup" className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-blue-500 transition duration-300 ease-in-out" target="_blank" rel="noopener noreferrer">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
