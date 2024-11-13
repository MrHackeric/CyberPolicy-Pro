import React, { useState } from 'react';
import axios from "axios"

const CompanyPolicy = ({ onDocumentGenerated }) => {
  const [policyName, setPolicyName] = useState('');
  const [policyDescription, setPolicyDescription] = useState('');
  const [policyPurpose, setPolicyPurpose] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [reviewDate, setReviewDate] = useState('');
  const [applicability, setApplicability] = useState('');
  const [responsibility, setResponsibility] = useState('');
  const [consequences, setConsequences] = useState('');
  const [policyOwner, setPolicyOwner] = useState('');
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const policyData = {
      type: "company_policy",
      companyName: policyOwner, // Use the correct field names
      industry: "Software Engeneering" ,
      policyName,
      policyDescription,
      policyPurpose,
      effectiveDate,
      reviewDate,
      applicability,
      responsibility,
      consequences,
      policyOwner,
      approvalStatus,
    };

    console.log('Company Policy Data:', policyData);
    // Here you would typically send this data to your API for processing

  const response = await axios.post("http://localhost:3000/api/documents/generate", policyData);
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
          Policy Name:
        </label>
        <input
          type="text"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Policy Description:
        </label>
        <textarea
          value={policyDescription}
          onChange={(e) => setPolicyDescription(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Purpose of the Policy:
        </label>
        <textarea
          value={policyPurpose}
          onChange={(e) => setPolicyPurpose(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Effective Date:
        </label>
        <input
          type="date"
          value={effectiveDate}
          onChange={(e) => setEffectiveDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Review Date:
        </label>
        <input
          type="date"
          value={reviewDate}
          onChange={(e) => setReviewDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Applicability:
        </label>
        <textarea
          value={applicability}
          onChange={(e) => setApplicability(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Responsibilities:
        </label>
        <textarea
          value={responsibility}
          onChange={(e) => setResponsibility(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Consequences of Non-Compliance:
        </label>
        <textarea
          value={consequences}
          onChange={(e) => setConsequences(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Policy Owner:
        </label>
        <input
          type="text"
          value={policyOwner}
          onChange={(e) => setPolicyOwner(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={approvalStatus}
          onChange={(e) => setApprovalStatus(e.target.checked)}
          className="mr-2"
        />
        <label className="text-gray-700">
          I confirm that this policy is approved.
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700"
      >
        Draft Company Policy
      </button>
    </form>
  );
};

export default CompanyPolicy;
