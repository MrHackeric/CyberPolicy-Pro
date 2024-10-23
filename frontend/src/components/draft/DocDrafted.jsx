import React, { useState } from 'react';

// Placeholder for AI-generated document fetching
const fetchAIDocument = async (documentType) => {
  // Simulate fetching AI-generated document content
  const response = await fetch(`YOUR_API_ENDPOINT/${documentType}`);
  const data = await response.json();
  return data; // Assumes data contains the document content and metadata
};

const DocDrafted = () => {
  const [selectedDocument, setSelectedDocument] = useState('');
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const documentTypes = ['Privacy Policy', 'NDA', 'Employment Contract', 'Company Policy'];

  const handleDocumentChange = (e) => {
    setSelectedDocument(e.target.value);
  };

  const handleGenerateDocument = async () => {
    setLoading(true);
    try {
      const documentData = await fetchAIDocument(selectedDocument);
      setGeneratedDocument(documentData);
    } catch (error) {
      console.error("Error fetching AI document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-8">
        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md h-[50vh] overflow-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Drafted Document</h1>
          
          {/* Render the generated document */}
          <div className="mt-6">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : generatedDocument ? (
              <div>
                <h2 className="text-xl font-bold">Generated Document</h2>
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <h3 className="font-semibold">{generatedDocument.title}</h3>
                  <p>{generatedDocument.content}</p>
                </div>
                <a 
                  href={generatedDocument.downloadLink}
                  download
                  className="mt-4 inline-block text-blue-600 underline"
                >
                  Download Document
                </a>
              </div>
            ) : (
              <div className="text-gray-500 text-lg">Please select a document to draft</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocDrafted;
