import React, { useState } from "react";

function RootEntry() {
  const [root, setRoot] = useState("");
  const [ganam, setGanam] = useState("");
  const [rootIndex, setRootIndex] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // State for both success and error messages

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { root, ganam, rootIndex };

    try {
      const res = await fetch("/server/entry/addroot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (res.ok) {
        setRoot("");
        setGanam("");
        setRootIndex("");
        setMessage({ type: "success", text: "Root entry added successfully!" });
        hideMessageAfterDelay(); // Hide message after 1.2 seconds
      } else {
        const errorMessage = await res.text();
        console.error("Error:", errorMessage);
        setMessage({
          type: "error",
          text: errorMessage || "An unexpected error occurred.",  
        });
        hideMessageAfterDelay();
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "An unexpected error occurred." });
      hideMessageAfterDelay();
    }
  };

  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          Root Entry
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Root Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Root <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Root"
              id="root"
              value={root}
              onChange={(e) => setRoot(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* Ganam Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Ganam <span className="text-red-500">*</span>
            </label>
            <select
              id="ganam"
              value={ganam}
              onChange={(e) => setGanam(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              <option value="" disabled>
                Select Ganam
              </option>
              {ganamOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Ganam Index Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Root Index <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Root Index"
              id="rootIndex"
              value={rootIndex}
              onChange={(e) => setRootIndex(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
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
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition duration-300"
          >
            Add Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default RootEntry;
