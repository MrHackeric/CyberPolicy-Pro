import React, { useState } from 'react';
import axios from "axios"
const EmploymentContract = ({ onDocumentGenerated }) => {
  const [employerName, setEmployerName] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salary, setSalary] = useState('');
  const [benefits, setBenefits] = useState('');
  const [workHours, setWorkHours] = useState('');
  const [location, setLocation] = useState('');
  const [confidentiality, setConfidentiality] = useState(false);
  const [termination, setTermination] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
    const contractData = {
      type: "employment_contract",
      companyName: employerName, // Use the correct field names
      industry: "Software Engeneering" ,
      employerName,
      employeeName,
      jobTitle,
      startDate,
      endDate,
      salary,
      benefits,
      workHours,
      location,
      confidentiality,
      termination,
    };

    console.log('Employment Contract Data:', contractData);
    // Here you would typically send this data to your API for processing
    const response = await axios.post("http://localhost:3000/api/documents/generate", contractData);
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
          Employer Name:
        </label>
        <input
          type="text"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Employee Name:
        </label>
        <input
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Job Title:
        </label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          End Date (if applicable):
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Salary:
        </label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Benefits:
        </label>
        <textarea
          value={benefits}
          onChange={(e) => setBenefits(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Work Hours:
        </label>
        <input
          type="text"
          value={workHours}
          onChange={(e) => setWorkHours(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Work Location:
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={confidentiality}
          onChange={(e) => setConfidentiality(e.target.checked)}
          className="mr-2"
        />
        <label className="text-gray-700">
          I agree to the confidentiality clause.
        </label>
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Termination Notice Period (in weeks):
        </label>
        <input
          type="number"
          value={termination}
          onChange={(e) => setTermination(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700"
      >
        Draft Employment Contract
      </button>
    </form>
  );
};

export default EmploymentContract;
