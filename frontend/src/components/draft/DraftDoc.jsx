import React, { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';
import NDA from './NDA';
import EmploymentContract from './EmploymentContract';
import CompanyPolicy from './CompanyPolicy';
import DocDrafted from './DocDrafted'; // Import DocDrafted component
import Header from '../header/Header';

const DraftDocument = () => {
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
    setDocumentId(null); // Reset documentId when changing document type
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-8">
        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Draft Legal Business Documents</h1>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select a Document Type:
            </label>
            <select
              value={selectedDocument}
              onChange={handleDocumentChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select Document Type</option>
              <option value="Privacy Policy">Privacy Policy</option>
              <option value="NDA">Non-Disclosure Agreement</option>
              <option value="Employment Contract">Employment Contract</option>
              <option value="Company Policy">Company Policy</option>
            </select>
          </div>

          {/* Render the selected document form or the drafted document */}
          <div className="mt-6">
            {selectedDocument && !documentId ? (
              <div>{documentComponents[selectedDocument]}</div>
            ) : documentId ? (
              <DocDrafted documentId={documentId} /> // Pass documentId to DocDrafted
            ) : (
              <div className="text-gray-500 text-lg">Please select a document to draft</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftDocument;