// DraftDocument.js
import React, { useEffect, useState } from 'react';
import axios from "axios";
import PrivacyPolicy from './PrivacyPolicy';
import NDA from './NDA';
import EmploymentContract from './EmploymentContract';
import CompanyPolicy from './CompanyPolicy';

const DraftDocument = ({ onDocumentGenerated }) => {
  const [selectedDocument, setSelectedDocument] = useState('');
  const [documentId, setDocumentId] = useState(null);

  const documentComponents = {
    'Privacy Policy': <PrivacyPolicy onDocumentGenerated={setDocumentId} />,
    'NDA': <NDA onDocumentGenerated={setDocumentId} />,
    'Employment Contract': <EmploymentContract onDocumentGenerated={setDocumentId} />,
    'Company Policy': <CompanyPolicy onDocumentGenerated={setDocumentId} />
  };

  const handleDocumentChange = (e) => {
    setSelectedDocument(e.target.value);
    setDocumentId(null);
  };

  useEffect(() => {
    onDocumentGenerated(documentId);
  }, [documentId, onDocumentGenerated]);

  return (
    <div>
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Select a Document Type:
      </label>
      <select
        value={selectedDocument}
        onChange={handleDocumentChange}
        className="w-full p-3 border border-gray-300 rounded-lg text-lg"
      >
        <option value="" disabled>Select Document Type</option>
        <option value="Privacy Policy">Privacy Policy</option>
        <option value="NDA">Non-Disclosure Agreement</option>
        <option value="Employment Contract">Employment Contract</option>
        <option value="Company Policy">Company Policy</option>
      </select>

      <div className="mt-6">
        {selectedDocument && !documentId ? (
          <div>{documentComponents[selectedDocument]}</div>
        ) : (
          <div className="text-gray-500 text-lg">Please select a document to draft</div>
        )}
      </div>
    </div>
  );
};

export default DraftDocument;
