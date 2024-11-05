import React, { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';
import NDA from './NDA';
import EmploymentContract from './EmploymentContract';
import DocDrafted from './DocDrafted';

const DocumentContainer = () => {
    const [generatedDocument, setGeneratedDocument] = useState(null);
    const [selectedDocumentType, setSelectedDocumentType] = useState('PrivacyPolicy');


    const handleDocumentGenerated = (document) => {
        setGeneratedDocument(document);
    };

    const renderDocumentComponent = () => {
        switch (selectedDocumentType) {
            case 'PrivacyPolicy':
                return <PrivacyPolicy onDocumentGenerated={handleDocumentGenerated} />;
            case 'NDA':
                return <NDA onDocumentGenerated={handleDocumentGenerated} />;
            case 'EmploymentAgreement':
                return <EmploymentContract onDocumentGenerated={handleDocumentGenerated} />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto">

            {renderDocumentComponent()}
            <DocDrafted document={generatedDocument} />
        </div>
    );
};

export default DocumentContainer;
