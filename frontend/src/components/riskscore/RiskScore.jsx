import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { FaSpinner } from 'react-icons/fa';
import Header from '../header/Header'; // Importing the Header component

const RiskScore = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      setIsLoading(true);
      onFileUpload(selectedFile)
        .then(response => {
          setScores(response); // Assume backend returns scores
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Content Section */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
        <div className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-lg flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-900">Compliance Risk Score Analyzer</h2>

          {/* File Input Section */}
          <div className="w-full mb-6">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="w-full text-lg text-gray-900 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:border-blue-400 hover:border-blue-400 p-4 transition duration-300 ease-in-out"
            />
          </div>

          {/* Upload & Analyze Button */}
          <button
            onClick={handleFileUpload}
            disabled={isLoading}
            className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin mr-2" /> Analyzing...
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <AiOutlineCloudUpload className="mr-2" size={24} /> Upload & Analyze
              </div>
            )}
          </button>

          {/* Status Message */}
          {selectedFile && !isLoading && (
            <div className="mt-4 text-center text-gray-600 font-medium">
              {`Selected file: ${selectedFile.name}`}
            </div>
          )}

          {/* Display Scores After Analysis */}
          {scores && !isLoading && (
            <div className="w-full mt-8">
              <h3 className="text-2xl font-semibold text-center mb-4">Risk Score Analysis</h3>
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-4 py-2">Category</th>
                    <th className="border border-gray-300 px-4 py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-left">Data Handling Practices</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{scores.dataHandling}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2 text-left">Security Measures</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{scores.security}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-left font-bold">Overall R-Score</td>
                    <td className="border border-gray-300 px-4 py-2 text-center font-bold">{scores.overallRScore}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Loading Animation */}
          {isLoading && (
            <div className="mt-6 flex justify-center">
              <span role="img" aria-label="rocket" className="text-5xl animate-pulse">
                🚀
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskScore;