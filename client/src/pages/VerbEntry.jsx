import React, { useState } from "react";

function EntryForm() {
  const [verb, setVerb] = useState("");
  const [lookup, setLookup] = useState(['']);
  const [root, setRoot] = useState("");
  const [ganam, setGanam] = useState("");
  const [ganamIndex, setGanamIndex] = useState("");
  const [transVerb, setTransVerb] = useState("");
  const [ItAgma, setItAgma] = useState("");
  const [derivation, setDerivation] = useState("");
  const [example, setExample] = useState("");
  const [seeAlso, setSeeAlso] = useState("");
  const [reverseWord, setReverseWord] = useState("No");
  const [message, setMessage] = useState({ type: "", text: "" });

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

  const ItAgmaOptions = ["सेट्", "अनिट्", "वेट्"];


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      verb,
      lookup,
      root,
      ganam,
      ganamIndex,
      transVerb,
      ItAgma,
      derivation,
      example,
      seeAlso,
      reverseWord,
    };

    try {
      const res = await fetch("/server/entry/addverb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (res.ok) {
        setVerb("");
        setLookup([""]);
        setRoot("");
        setGanam("");
        setGanamIndex("");
        setTransVerb("");
        setItAgma("");
        setDerivation("");
        setExample("");
        setSeeAlso("");
        setReverseWord("No");
        setMessage({ type: "success", text: "Entry added successfully!" });
        hideMessageAfterDelay();
      } else {
        const errorMessage = await res.text(); // Get the error message from the response
        setMessage({ type: "error", text: errorMessage || "Please fill in mandatory fields before submitting." });
        hideMessageAfterDelay();
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: error.message || "An unexpected error occurred." });
      hideMessageAfterDelay();
    }
  };

  const hideMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 1200);
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Lookup Inputs */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold text-gray-800 mb-2">Lookup</label>
            {lookup.map((meaning, index) => (
              <div key={index} className="flex items-center space-x-3 mb-3">
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
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
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
              placeholder="Enter root"
              onChange={(e) => setRoot(e.target.value)}
              value={root}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Ganam Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Ganam <span className="text-red-500">*</span>
            </label>
            <select
              onChange={(e) => setGanam(e.target.value)}
              value={ganam}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
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

          {/* Ganam Index Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Ganam Index <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter Ganam Index"
              onChange={(e) => setGanamIndex(e.target.value)}
              value={ganamIndex}
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Trans/Non-Trans Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Properties <span className="text-red-500">*</span>
            </label>
            <input
              placeholder="Enter Trans/Non-trans"
              onChange={(e) => setTransVerb(e.target.value)}
              value={transVerb}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* It-Agma Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              It-Agma <span className="text-red-500">*</span>
            </label>
            <select
              onChange={(e) => setItAgma(e.target.value)}
              value={ItAgma}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="" disabled>
                Select It-Agma
              </option>
              {ItAgmaOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
  

          {/* Derivation Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Derivation</label>
            <input
              placeholder="Enter derivation"
              onChange={(e) => setDerivation(e.target.value)}
              value={derivation}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Example Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Example</label>
            <input
              placeholder="Enter example"
              onChange={(e) => setExample(e.target.value)}
              value={example}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* See Also Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">See Also</label>
            <input
              placeholder="Enter see also"
              onChange={(e) => setSeeAlso(e.target.value)}
              value={seeAlso}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Reverse Word Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Reverse Word</label>
            <select
              onChange={(e) => setReverseWord(e.target.value)}
              value={reverseWord}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
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
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EntryForm;
