import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
  const { id } = useParams(); // Get the id from the URL
  const [entry, setEntry] = useState(null);
  const [updatedEntry, setUpdatedEntry] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });
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

  const validateFields = () => {
    const mandatoryFields = ['verb', 'root', 'ganam', 'transVerb', 'ItAgma'];
    for (let field of mandatoryFields) {
      if (!updatedEntry[field]) {
        setMessage({ type: 'error', text: 'Please fill in all mandatory fields.' });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

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
            Edit Entry
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-white shadow-xl rounded-2xl p-8"
          >
            {[
              { label: 'Verb', name: 'verb', required: true },
              { label: 'Lookup', name: 'lookup' },
              { label: 'Root', name: 'root', required: true },
              { label: 'Ganam', name: 'ganam', required: true },
              { label: 'Trans/Non-trans', name: 'transVerb', required: true },
              { label: 'It-Agma', name: 'ItAgma', required: true },
              { label: 'Derivation', name: 'derivation' },
              { label: 'Example', name: 'example' },
              { label: 'Reverse Word', name: 'reverseWord' },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-800 mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={updatedEntry[field.name] || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            ))}

            {message.text && (
              <div
                className={`w-full text-base font-medium text-center p-3 rounded-lg shadow-md ${
                  message.type === 'success'
                    ? 'text-green-600 bg-green-100'
                    : 'text-red-600 bg-red-100'
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
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

export default Edit;
