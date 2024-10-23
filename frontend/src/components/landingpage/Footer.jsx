import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Facebook, Twitter, LinkedIn, GitHub } from '@mui/icons-material'; // Importing Material UI icons
import './Section.css';

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="animated-bg text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0" data-aos="fade-up">
          <h1 className="text-2xl font-bold">CyberPolicy Pro</h1>
          <p className="mt-2">© 2024 CyberPolicy Pro. All rights reserved.</p>
        </div>

        <div className="flex space-x-4" data-aos="fade-up" data-aos-delay="400">
          <a href="https://github.com/MrHackeric/CyberPolicy-Pro.git/" className="hover:text-accent transition duration-300" target="_blank" rel="noopener noreferrer">
            <GitHub fontSize="large" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
