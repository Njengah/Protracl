"use client"; // Marking this file as a client component

import { useState } from "react"; // React hooks
import axios from "axios"; // Axios for making HTTP requests

const RegistrationForm = ({ onRegister }) => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [fullName, setFullName] = useState(""); // Full name state
  const [error, setError] = useState(""); // Error state for registration

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      // Call the parent onRegister function to handle registration logic
      await onRegister(email, password, fullName);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="full_name" className="block text-sm font-semibold mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="full_name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
