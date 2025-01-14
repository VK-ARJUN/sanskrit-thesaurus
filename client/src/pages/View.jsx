import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function View() {
  const [data, setData] = useState([]); // State to store fetched data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/server/entry/view", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result); // Set the fetched data
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((entry, index) => (
          <div key={index} className="border-b border-gray-300 py-4">
            <p><strong>Verb:</strong> {entry.verb}</p>
            <p><strong>English Meaning:</strong> {entry.englishMeaning}</p>
            <p><strong>Lookup:</strong> {entry.lookup.join(", ")}</p>
            <p><strong>Root:</strong> {entry.root}</p>
            <p><strong>Ganam:</strong> {entry.ganam}</p>
            <p><strong>Trans/Non-trans:</strong> {entry.transVerb}</p>
            <p><strong>It-Agma:</strong> {entry.ItAgma}</p>
            <p><strong>Derivation:</strong> {entry.derivation || "N/A"}</p>

            {/* Edit button to go to the Edit page for this entry */}
            <button onClick={() => navigate(`/edit/${entry._id}`)}>Edit</button>
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default View;
