import React, { useState } from 'react';
import axios from "axios";

const NDA = ({ onDocumentGenerated }) => {
  const [disclosingParty, setDisclosingParty] = useState('');
  const [receivingParty, setReceivingParty] = useState('');
  const [agreementDuration, setAgreementDuration] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API call to generate the NDA using AI backend
    try {
      // Call API to generate NDA
      const requestData = {
        type: "nda",
        companyName: disclosingParty, // Use the correct field names
        industry: "Software Engeneering" ,
        receivingParty: receivingParty,     // Use the correct field names
        duration: agreementDuration,    // This is the duration field
        // Add other fields if necessary
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
          Disclosing Party:
        </label>
        <input
          type="text"
          value={disclosingParty}
          onChange={(e) => setDisclosingParty(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Receiving Party:
        </label>
        <input
          type="text"
          value={receivingParty}
          onChange={(e) => setReceivingParty(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Duration of Agreement (in months):
        </label>
        <input
          type="number"
          value={agreementDuration}
          onChange={(e) => setAgreementDuration(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700"
      >
        Draft NDA
      </button>
    </form>
  );
};

export default NDA;
