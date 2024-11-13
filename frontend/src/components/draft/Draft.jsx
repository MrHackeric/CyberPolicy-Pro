// Draft.js
import React, { useState } from 'react';
import DraftDocument from './DraftDoc';
import DocDrafted from './DocDrafted';
import Header from '../header/Header';

const Draft = () => {
  const [documentId, setDocumentId] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col md:flex-row md:space-x-4 p-8">
        {/* Left: Draft Document */}
        <div className="flex-1 mb-4 md:mb-0">
          <DraftDocument onDocumentGenerated={setDocumentId} />
        </div>
        {/* Right: Display generated document */}
        <div className="flex-1">
          <DocDrafted documentId={documentId} />
        </div>
      </div>
    </div>
  );
};

export default Draft;
