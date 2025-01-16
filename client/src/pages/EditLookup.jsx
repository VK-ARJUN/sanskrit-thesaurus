import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditLookup() {
  const { id } = useParams(); // Get the id from the URL
  const [entry, setEntry] = useState(null);
  const [updatedEntry, setUpdatedEntry] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the entry to edit when component loads
    const fetchEntry = async () => {
      try {
        const response = await fetch(`/server/entry/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch entry');
        }
        const result = await response.json();
        setEntry(result); // Set the entry data for editing
        setUpdatedEntry(result); // Initialize the updated entry state with fetched data
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/server/entry/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEntry),
      });

      if (response.ok) {
        // Redirect to the View page after successful update
        navigate('/view');
      } else {
        console.error('Failed to update entry');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-3 max-w-2xl mx-auto">
      {entry ? (
        <div>
          <h1 className="text-3xl font-semibold text-center my-5 text-blue-500">
            Edit Lookup Entry
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white shadow-md rounded-lg p-5"
          >
            {[ 
              { label: 'Lookup', name: 'lookup' },
              { label: 'English Meaning', name: 'englishMeaning' },
              {label:'Refference',name:'refference'}
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={updatedEntry[field.name] || ''}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:border-blue-400"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:opacity-90"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default EditLookup;
