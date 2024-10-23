import React from 'react';
import { AiOutlineFileText, AiOutlineBell, AiOutlineSetting } from 'react-icons/ai'; // Icons for Draft Document, Notifications, Settings
import { FaFileAlt } from 'react-icons/fa'; // Icon for Risk Score
import { Link } from 'react-router-dom'; // For linking to different pages
import LogoutIcon from '@mui/icons-material/Logout'; // Importing Material UI Logout Icon

const Header = () => {
  return (
    <header className="bg-blue-600 shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo or Title */}
        <div className="text-3xl font-bold text-white">CyberPolicy Pro</div>

        {/* Navigation Icons */}
        <nav className="flex space-x-10">
          {/* Draft Document */}
          <Link to="/draft" className="flex flex-col items-center text-white hover:text-blue-300 transition duration-300 ease-in-out">
            <AiOutlineFileText size={28} />
            <span className="text-sm mt-1">Draft Document</span>
          </Link>

          {/* Risk Score */}
          <Link to="/riskscore" className="flex flex-col items-center text-white hover:text-blue-300 transition duration-300 ease-in-out">
            <FaFileAlt size={28} />
            <span className="text-sm mt-1">Risk Score</span>
          </Link>

          {/* Notifications */}
          <Link to="/notifications" className="flex flex-col items-center text-white hover:text-blue-300 transition duration-300 ease-in-out">
            <AiOutlineBell size={28} />
            <span className="text-sm mt-1">Notifications</span>
          </Link>

          {/* Settings */}
          <Link to="/settings" className="flex flex-col items-center text-white hover:text-blue-300 transition duration-300 ease-in-out">
            <AiOutlineSetting size={28} />
            <span className="text-sm mt-1">Settings</span>
          </Link>

          {/* Logout */}
          <Link to="" className="flex flex-col items-center text-white hover:text-blue-300 transition duration-300 ease-in-out">
            <LogoutIcon fontSize="large" />
            <span className="text-sm mt-1">Logout</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
