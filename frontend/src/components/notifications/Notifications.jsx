import React from 'react';
import Header from '../header/Header';
import NotificationPreferences from './NotificationPreferences'; // Importing NotificationPreferences
import Updates from './Updates'; // Importing Updates

const Notifications = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 p-6 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          {/* Render the Notification Preferences and Updates components */}
          <NotificationPreferences />
          <Updates />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
