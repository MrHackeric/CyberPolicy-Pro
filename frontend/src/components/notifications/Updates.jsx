import React, { useEffect, useState } from 'react';

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching updates from an API
  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      // Simulated API call
      const simulatedUpdates = [
        { id: 1, message: 'New policy adjustment regarding data privacy effective immediately.' },
        { id: 2, message: 'Annual compliance review is due next month. Ensure all documents are prepared.' },
        { id: 3, message: 'New regulations on data storage have been implemented.' },
      ];
      // Simulating a delay
      setTimeout(() => {
        setUpdates(simulatedUpdates);
        setLoading(false);
      }, 1000);
    };

    fetchUpdates();

    // Optional: Fetch updates periodically
    const interval = setInterval(fetchUpdates, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Updates</h2>
      {loading ? (
        <p>Loading updates...</p>
      ) : updates.length === 0 ? (
        <p>No updates at this time. You are compliant!</p>
      ) : (
        <ul className="space-y-2">
          {updates.map((update) => (
            <li key={update.id} className="border-l-4 border-blue-600 pl-4 text-gray-800">
              {update.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Updates;
