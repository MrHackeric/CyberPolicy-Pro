import React, { useState } from 'react';

const NotificationPreferences = () => {
  // State to manage notification preferences
  const [preferences, setPreferences] = useState({
    email: false,
    sms: false,
    push: false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Handle save preferences
  const handleSavePreferences = () => {
    // Here you could add functionality to save the preferences, e.g., to an API or local storage
    console.log('Saved Preferences:', preferences);
    alert('Your notification preferences have been saved!');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
      {/* Add your notification preference options here */}
      <div>
        <label className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            name="email"
            checked={preferences.email}
            onChange={handleCheckboxChange}
          />
          Email Notifications
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            name="sms"
            checked={preferences.sms}
            onChange={handleCheckboxChange}
          />
          SMS Notifications
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            className="mr-2"
            name="push"
            checked={preferences.push}
            onChange={handleCheckboxChange}
          />
          Push Notifications
        </label>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleSavePreferences}
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
