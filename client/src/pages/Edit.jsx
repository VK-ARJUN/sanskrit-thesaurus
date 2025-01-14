import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
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
    <div>
      {entry ? (
        <div>
          <h1>Edit Entry</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Verb:</label>
              <input
                type="text"
                name="verb"
                value={updatedEntry.verb || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>English Meaning:</label>
              <input
                type="text"
                name="englishMeaning"
                value={updatedEntry.englishMeaning || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Lookup:</label>
              <input
                type="text"
                name="lookup"
                value={updatedEntry.lookup || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Root:</label>
              <input
                type="text"
                name="root"
                value={updatedEntry.root || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Ganam:</label>
              <input
                type="text"
                name="ganam"
                value={updatedEntry.ganam || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Trans/Non-trans:</label>
              <input
                type="text"
                name="transVerb"
                value={updatedEntry.transVerb || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>It-Agma:</label>
              <input
                type="text"
                name="ItAgma"
                value={updatedEntry.ItAgma || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Derivation:</label>
              <input
                type="text"
                name="derivation"
                value={updatedEntry.derivation || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Edit;
