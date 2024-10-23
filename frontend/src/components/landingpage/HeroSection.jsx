import React from 'react';
import './Section.css'; // Create a separate CSS file for the animation

const HeroSection = () => {
  return (
    <header className="relative h-screen flex items-center justify-center text-white animated-bg">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-20">
        <h1 className="text-5xl font-bold">Simplifying Compliance Management</h1>
        <p className="mt-4 text-xl">
          Unified tools to streamline compliance, automate legal document drafting, 
          and keep your business updated on regulatory changes.
        </p>
        <button className="mt-8 bg-white text-primary font-semibold px-6 py-3 rounded hover:bg-gray-100 transition duration-300 ease-in-out">
          <a href="/signup" className="hover:text-accent transition duration-300" target="_blank" rel="noopener noreferrer">
            Get Started
          </a>
        </button>
      </div>
    </header>
  );
};

export default HeroSection;
