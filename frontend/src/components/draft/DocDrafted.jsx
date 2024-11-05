import React, { useEffect, useState } from 'react';
import axios from "axios";

const fetchAIDocument = async (documentId) => {
  const response = await axios.get(`http://localhost:3000/api/documents/${documentId}`);
  console.log("Full API Response:", response); // Log the entire response
  return response.data;
};

const DocDrafted = ({ documentId }) => {
  const [error, setError] = useState(null);
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (documentId) {
      const getDocument = async () => {
        setLoading(true);
        try {
          const document = await fetchAIDocument(documentId); // Fetch the entire data object
          setGeneratedDocument(document.data); // Adjust this based on the logged structure
          console.log("Fetched Document:", document.data);
        } catch (error) {
          console.error("Error fetching AI document:", error);
          setError("Error fetching AI document");
        } finally {
          setLoading(false);
        }
      };
      getDocument();
    }
  }, [documentId]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-8">
        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md h-[50vh] overflow-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Drafted Document</h1>

          <div className="mt-6">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : generatedDocument ? (
              <div>
                <h2 className="text-xl font-bold">Generated Document</h2>
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <p><strong>Type:</strong> {generatedDocument.type}</p>
                  <p><strong>Company Name:</strong> {generatedDocument.companyName}</p>
                  <p><strong>Industry:</strong> {generatedDocument.industry}</p>
                  <p><strong>Content:</strong> {generatedDocument.content}</p>
                  <p><strong>Version:</strong> {generatedDocument.metadata?.version}</p>
                  {generatedDocument.metadata?.customFields && (
                    <div>
                      <p><strong>Custom Fields:</strong></p>
                      <ul>
                        {Object.entries(generatedDocument.metadata.customFields).map(([key, value]) => (
                          <li key={key}>{key}: {value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {generatedDocument.downloadLink && (
                  <a
                    href={generatedDocument.downloadLink}
                    download
                    className="mt-4 inline-block text-blue-600 underline"
                  >
                    Download Document
                  </a>
                )}
              </div>
            ) : (
              <div className="text-gray-500 text-lg">No document found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocDrafted;





// import React, { useState } from 'react';
// import axios from "axios"
// import { useParams } from 'react-router-dom';

// // Placeholder for AI-generated document fetching
// const fetchAIDocument = async (documentType) => {
//   // Simulate fetching AI-generated document content
//   const response = await axios.get(`http://localhost:3000/api/:${documentType}`);
//   // const data = await response.json();
//   // return data; // Assumes data contains the document content and metadata
//   return response.data;
// };

// const DocDrafted = () => {
//   const [selectedDocument, setSelectedDocument] = useState('');
//   const [generatedDocument, setGeneratedDocument] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [generatedDocumentId, setGeneratedDocumentId] = useState(null);

//   const documentTypes = ['Privacy Policy', 'NDA', 'Employment Contract', 'Company Policy'];

//   const handleDocumentChange = (e) => {
//     setSelectedDocument(e.target.value);
//   };

//   const handleGenerateDocument = async () => {
//     setLoading(true);
//     try {
//       const documentData = await fetchAIDocument(selectedDocument);
//       setGeneratedDocument(documentData); // Set the generated document directly
//       setGeneratedDocumentId(documentData._id); // Save the document ID
//     } catch (error) {
//       console.error("Error fetching AI document:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-8">
//         <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md h-[50vh] overflow-auto">
//           <h1 className="text-3xl font-bold mb-4 text-center">Drafted Document</h1>

//           {/* Render the generated document */}
//           <div className="mt-6">
//             {loading ? (
//               <div className="text-center">Loading...</div>
//             ) : generatedDocument ? (
//               <div>
//                 <h2 className="text-xl font-bold">Generated Document</h2>
//                 <div className="mt-4 p-4 bg-gray-100 rounded">
//                   <h3 className="font-semibold">{generatedDocument.title}</h3>
//                   <p>{generatedDocument.content}</p>
//                 </div>
//                 <a
//                   href={generatedDocument.downloadLink}
//                   download
//                   className="mt-4 inline-block text-blue-600 underline"
//                 >
//                   Download Document
//                 </a>
//               </div>
//             ) : (
//               <div className="text-gray-500 text-lg">Please select a document to draft</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocDrafted;
