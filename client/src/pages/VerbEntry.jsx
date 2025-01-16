import React, { useState } from "react";

function EntryForm() {  
  const [verb, setVerb] = useState("");
  const [lookup, setLookup] = useState([""]);
  const [root, setRoot] = useState("");
  const [ganam, setGanam] = useState("");
  const [transVerb, setTransVerb] = useState("");
  const [ItAgma, setItAgma] = useState("");
  const [derivation, setDerivation] = useState("");
  const [example,setExample] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" }); // State for both success and error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = { verb, lookup, root, ganam, transVerb, ItAgma, derivation,example };

    try {
      const res = await fetch('/server/entry/addverb', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });
      
      if (res.ok) {
        setVerb("");
        setRoot("");   
        setLookup([""]);
        setGanam("");
        setTransVerb("");
        setItAgma("");
        setDerivation("");
        setExample("");
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

  const handleAddLookup = () => {
    setLookup([...lookup, ""]);
  };

  const handleRemoveLookup = (index) => {
    setLookup(lookup.filter((_, i) => i !== index));
  };

  const handleLookupChange = (index, value) => {
    const updatedLookup = [...lookup];
    updatedLookup[index] = value;
    setLookup(updatedLookup);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
          Verb Entry
        </h1>
  
        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          {/* Verb Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Verb <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter verb"
              onChange={(e) => setVerb(e.target.value)}
              value={verb}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
  
          {/* Lookup Input */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Lookup
            </label>
            {lookup.map((meaning, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 mb-3 bg-gray-100 px-3 py-2 rounded-lg"
              >
                <input
                  placeholder={`Lookup ${index + 1}`}
                  onChange={(e) => handleLookupChange(index, e.target.value)}
                  value={meaning}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveLookup(index)}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddLookup}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold mt-2"
            >
              + Add Another Lookup
            </button>
          </div>
  
          {/* Root Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Root <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter Root"
              onChange={(e) => setRoot(e.target.value)}
              value={root}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
  
          {/* Ganam Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Ganam <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter Ganam"
              onChange={(e) => setGanam(e.target.value)}
              value={ganam}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
  
          {/* Trans/Non-trans Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Properties  <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter Trans/Non-trans"
              onChange={(e) => setTransVerb(e.target.value)}
              value={transVerb}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
  
          {/* It-Agma Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              It-Agma <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter It-Agma"
              onChange={(e) => setItAgma(e.target.value)}
              value={ItAgma}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
  
          {/* Derivation Input */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Derivation
            </label>
            <input
              placeholder="Enter derivation"
              onChange={(e) => setDerivation(e.target.value)}
              value={derivation}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Example
            </label>
            <input
              placeholder="Enter Example"
              onChange={(e) => setExample(e.target.value)}
              value={example}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>


          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Reverse Word
            </label>
            <select
              // onChange={(e) => setReverseWord(e.target.value)} // Set the value based on selection
              // value={rever} // Set the selected value
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>



          {/* Message Display */}
          {message.text && (
            <div
              className={`w-full mt-6 text-base font-medium text-center ${
                message.type === "success"
                  ? "text-green-600 bg-green-100"
                  : "text-red-600 bg-red-100"
              } p-3 rounded-lg shadow-md`}
            >
              {message.text}
            </div>
          )}
  
          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>'
        </form>
      </div>
    </div>
  );  
};

export default EntryForm;
