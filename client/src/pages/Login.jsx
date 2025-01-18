import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

function Login({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('/server/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                onLoginSuccess(); // Notify parent component of successful login
                navigate('/home'); // Redirect to the home page
            } else {
                setError(result.message || 'Invalid login credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during login. Please try again.');
        }
    };
    

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
            <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg w-full">
                <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle password visibility
                                className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icons */}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
