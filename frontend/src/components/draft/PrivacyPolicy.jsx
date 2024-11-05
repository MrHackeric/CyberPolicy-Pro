import React, { useState } from 'react';
import axios from "axios";


const PrivacyPolicy = ({ onDocumentGenerated }) => {
  const [companyName, setCompanyName] = useState('');
  const [dataCollected, setDataCollected] = useState([]);
  const [isConsentRequired, setIsConsentRequired] = useState(false);
  const [error, setError] = useState(null);


  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (dataCollected.includes(value)) {
      setDataCollected(dataCollected.filter(item => item !== value));
    } else {
      setDataCollected([...dataCollected, value]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        type: "privacy_policy",
        companyName,
        industry: "Software Engineering",
        dataCollected,
        isConsentRequired
      };

      const response = await axios.post("http://localhost:3000/api/documents/generate", requestData);
      const documentId = response.data?.document?._id || response.data?._id || null;
      onDocumentGenerated(documentId);
      if (documentId) {
        onDocumentGenerated(documentId);
        console.log("Generated Document ID:", documentId);
      } else {
        console.log("Document ID not found in response:", response.data);
        setError("Unexpected response structure. Document ID is missing.");
      }
    } catch (error) {
      console.error("Error generating document:", error);
      setError("An error occurred while generating the document. Please try again.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Company Name:
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          What data do you collect from users?
        </label>
        <div className="space-y-2">
          <label>
            <input
              type="checkbox"
              value="Email"
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Email
          </label>
          <label>
            <input
              type="checkbox"
              value="Phone Number"
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Phone Number
          </label>
          <label>
            <input
              type="checkbox"
              value="Address"
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Address
          </label>
        </div>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Is user consent required for data collection?
        </label>
        <select
          value={isConsentRequired}
          onChange={(e) => setIsConsentRequired(e.target.value === 'true')}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700"
      >
        Draft Privacy Policy
      </button>
    </form>
  );
};

export default PrivacyPolicy;
