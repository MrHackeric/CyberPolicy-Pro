import React from 'react';
import DraftDoc from './DraftDoc';
import DocDrafted from './DocDrafted';
import Header from '../header/Header';

const Draft = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />
      <div className="flex flex-col md:flex-row md:space-x-4 p-8">
        {/* DraftDocument on the left side and DocDrafted on the right */}
        <div className="flex-1 mb-4 md:mb-0">
          <DraftDoc />
        </div>
        <div className="flex-1">
          <DocDrafted />
        </div>
      </div>
    </div>
  );
};

export default Draft;
