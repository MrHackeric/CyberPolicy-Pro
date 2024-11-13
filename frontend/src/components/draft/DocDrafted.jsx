import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DocDrafted = ({ documentId }) => {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDocumentData = async () => {
      if (documentId) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/documents/${documentId}`);
          setDocumentData(response.data.data);
        } catch (error) {
          console.error('Error fetching document:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDocumentData();
  }, [documentId]);

  const formatContent = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Replace **bold** with HTML <strong>
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Replace *italic* with HTML <em>
  };

  const handleDownload = () => {
    if (!documentData) return;

    // Assuming documentData.content contains the content you want to download
    const data = documentData.content; // Replace with the actual data you want to download
    const blob = new Blob([data], { type: 'text/plain' }); // Change 'text/plain' to the appropriate MIME type
    const url = URL.createObjectURL(blob);
    
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${documentData.companyName}_document.txt`; // Set the desired file name

    // Append to the body, click and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg h-full overflow-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Drafted Document Preview</h2>
      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : documentData ? (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold capitalize">{documentData.type.replace('_', ' ')}</h3>
            <p className="text-gray-600">
              <strong>Company Name:</strong> {documentData.companyName}
            </p>
            <p className="text-gray-600">
              <strong>Industry:</strong> {documentData.industry}
            </p>
          </div>

          {/* Content Section */}
          <div className="text-gray-800">
            {documentData.content.split('\n').map((paragraph, index) => (
              <p
                key={index}
                className="mb-4 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: formatContent(paragraph) }}
              />
            ))}
          </div>

          {/* Download Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleDownload}
              className="inline-block px-6 py-2 text-lg text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Download Document
            </button>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-lg">Document preview will appear here once generated.</div>
      )}
    </div>
  );
};

export default DocDrafted;