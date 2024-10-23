import React, { useState } from 'react';

const NDA = () => {
  const [disclosingParty, setDisclosingParty] = useState('');
  const [receivingParty, setReceivingParty] = useState('');
  const [agreementDuration, setAgreementDuration] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to generate NDA
    const requestData = {
      disclosingParty,
      receivingParty,
      agreementDuration,
    };
    console.log(requestData);
    // API call to generate the NDA using AI backend
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
