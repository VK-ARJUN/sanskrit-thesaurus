import React from 'react';
import { Link } from 'react-router-dom';

function ViewHome() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full">

                {/* Using flex-col for vertical stacking */}
                <div className="flex flex-col gap-8">
                    {/* Root Card */}
                    <Link to="/view/root">
                        <div className="p-6 bg-indigo-100 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Root</h2>
                        </div>
                    </Link>

                    {/* Verb Card */}
                    <Link to="/view/verb">
                        <div className="p-6 bg-indigo-100 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Verb</h2>
                        </div>
                    </Link>

                    {/* Lookup Card */}
                    <Link to="/view/lookup">
                        <div className="p-6 bg-indigo-100 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Lookup</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ViewHome;
