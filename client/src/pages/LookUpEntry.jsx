import React, { useState } from "react";

function LookUpEntry() {
  const [lookup, setLookup] = useState("");
  const [englishMeaning, setEnglishMeaning] = useState("");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // State for both success and error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { lookup, englishMeaning, reference };

    try {
      const res = await fetch('/server/entry/addlookup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });
      
      if (res.ok) {
        setLookup("");
        setEnglishMeaning("");    
        setReference("");
        setMessage({ type: "success", text: "Entry added successfully!" });
        hideMessageAfterDelay(); // Hide message after 1.2 seconds
      } else {
        setMessage({ type: "error", text: "Please fill in Mandatory fields before submitting." });
        hideMessageAfterDelay(); // Hide message after 1.2 seconds
      }
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          LookUp Entry
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Lookup Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              LookUp <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter LookUp"
              id="lookup"
              value={lookup}
              onChange={(e) => setLookup(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* English Meaning Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              English Meaning <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter English Meaning"
              id="englishMeaning"
              value={englishMeaning}
              onChange={(e) => setEnglishMeaning(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Reference Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Reference <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Reference"
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          

          {/* Message Display */}
          {message.text && (
            <div
              className={`w-full text-base font-medium text-center p-3 rounded-lg shadow-md ${
                message.type === "success"
                  ? "text-green-600 bg-green-100"
                  : "text-red-600 bg-red-100"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
          >
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default LookUpEntry;