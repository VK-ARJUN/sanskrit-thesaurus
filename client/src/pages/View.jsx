import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function View() {
  const [data, setData] = useState([]); // State to store fetched data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/server/entry/view', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result); // Set the fetched data
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-6 text-blue-600">
        Sanskrit Verbs - View Entries
      </h1>

      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((entry, index) => (
            <div
              key={index}
              className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 border border-gray-200 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-3">
                {entry.verb}
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>
                  <strong>English Meaning:</strong> {entry.englishMeaning}
                </li>
                <li>
                  <strong>Lookup:</strong> {entry.lookup.join(', ')}
                </li>
                <li>
                  <strong>Root:</strong> {entry.root}
                </li>
                <li>
                  <strong>Ganam:</strong> {entry.ganam}
                </li>
                <li>
                  <strong>Trans/Non-trans:</strong> {entry.transVerb}
                </li>
                <li>
                  <strong>It-Agma:</strong> {entry.ItAgma}
                </li>
                <li>
                  <strong>Derivation:</strong> {entry.derivation || 'N/A'}
                </li>
              </ul>
              <button
                onClick={() => navigate(`/edit/${entry._id}`)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Edit Entry
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          No entries available. Add some to get started!
        </p>
      )}
    </div>
  );
}

export default View;
