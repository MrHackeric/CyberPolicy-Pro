import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Section.css'; // External CSS for background animation
import { Security, Description, Dashboard } from '@mui/icons-material'; // Material UI Icons

const FeaturesSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS for scroll animations
  }, []);

  return (
    <section id="features" className="animated-bg py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">
          The Solution: CyberPolicy Pro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div
            className="bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            data-aos="fade-up"
          >
            <Security fontSize="large" className="text-primary mb-4" /> {/* AI Icon */}
            <h3 className="text-2xl font-semibold text-primary mb-4">
              AI-Powered Regulatory Assistant
            </h3>
            <p className="text-gray-600">
              Get real-time, customized guidance based on your business’s industry, location, and size. Stay updated on regulatory changes without hassle.
            </p>
          </div>

          <div
            className="bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Description fontSize="large" className="text-primary mb-4" /> {/* Document Icon */}
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Automated Document Drafting
            </h3>
            <p className="text-gray-600">
              Simplify legal documents like NDAs and privacy policies using customizable templates, eliminating the need for legal expertise.
            </p>
          </div>

          <div
            className="bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <Dashboard fontSize="large" className="text-primary mb-4" /> {/* Dashboard Icon */}
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Compliance Risk Scoring Dashboard
            </h3>
            <p className="text-gray-600">
              Track your compliance health with a dynamic scoring dashboard and actionable insights to mitigate risks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
