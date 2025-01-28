import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditRoot() {
  const { id } = useParams(); // Get the id from the URL
  const [entry, setEntry] = useState(null); // Original entry data
  const [updatedEntry, setUpdatedEntry] = useState({}); // Updated entry data
  const [errors, setErrors] = useState({}); // To store error messages
  const navigate = useNavigate();

  // Predefined ganam options
  const ganamOptions = [
    "भ्वादि",
    "अदादि",
    "जुहोत्यादि",
    "दिवादि",
    "स्वादि",
    "तुदादि",
    "रुधादि",
    "तनादि",
    "क्र्यादि",
    "चुरादि",
  ];

  useEffect(() => {
    // Fetch the entry to edit when the component loads
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

  const validate = () => {
    let tempErrors = {};
    if (!updatedEntry.root) {
      tempErrors.root = 'Root is required';
    }
    if (!updatedEntry.ganam) {
      tempErrors.ganam = 'Ganam is required';
    }
    if (updatedEntry.rootIndex == null || updatedEntry.rootIndex === '') {
      tempErrors.rootIndex = 'Root Index is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Prevent submission if validation fails
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
        navigate('/view/root');
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
            Edit Root Entry
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 bg-white shadow-md rounded-lg p-5"
          >
            {[
              { label: 'Root', name: 'root' },
              { label: 'Root Index', name: 'rootIndex', type: 'number' },
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm font-medium text-gray-600">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={updatedEntry[field.name] || ''}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:border-blue-400"
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm">{errors[field.name]}</span>
                )}
              </div>
            ))}

            {/* Dropdown for Ganam */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Ganam <span className="text-red-500">*</span>
              </label>
              <select
                name="ganam"
                value={updatedEntry.ganam || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:border-blue-400"
              >
                <option value="" disabled>
                  Select a Ganam
                </option>
                {ganamOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.ganam && (
                <span className="text-red-500 text-sm">{errors.ganam}</span>
              )}
            </div>

            <button
              type="submit" // Submit button to update the entry
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

export default EditRoot;
