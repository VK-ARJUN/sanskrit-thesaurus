import React, { useState } from "react";

function EntryForm() {  
  const [verb, setVerb] = useState("");
  const [root, setRoot] = useState("");
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [lookup, setLookup] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // State for both success and error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { verb, root, englishMeaning, lookup };

    // Validation for required fields
    if (!verb || !root || !englishMeaning || !lookup) {
      setMessage({ type: "error", text: "All fields are required!" });
      hideMessageAfterDelay(); // Hide message after 1.2 seconds
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });
      
      if (response.ok) {
        setVerb("");
        setRoot("");
        setEnglishMeaning("");    
        setLookup("");
        setMessage({ type: "success", text: "Entry added successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to add entry. Please try again." });
      }
      hideMessageAfterDelay(); // Hide message after 1.2 seconds
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "An unexpected error occurred." });
      hideMessageAfterDelay(); // Hide message after 1.2 seconds
    }
  };

  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 1200); //delay
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Verb Entry</h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Verb Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Verb</label>
            <input
              placeholder="Enter verb" 
              onChange={(e) => setVerb(e.target.value)} 
              value={verb}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Root Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Root</label>
            <input
              placeholder="Root" 
              onChange={(e) => setRoot(e.target.value)} 
              value={root}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* English Meaning Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">English Meaning</label>
            <input
              placeholder="English Meaning" 
              onChange={(e) => setEnglishMeaning(e.target.value)} 
              value={englishMeaning}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Lookup Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lookup</label>
            <input
              placeholder="Lookup"  
              onChange={(e) => setLookup(e.target.value)} 
              value={lookup}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Message Display */}
        {message.text && (
          <div
            className={`mb-4 mt-4 text-sm font-medium text-center ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryForm;
