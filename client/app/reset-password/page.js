"use client";

import { useState, useEffect } from "react"; // React hooks
import { useRouter } from "next/navigation"; // Next.js 13+ router
import axios from "axios"; // Axios for making HTTP requests

const ResetPassword = () => {
  const [token, setToken] = useState(null); // State for the token
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Use Next.js router for navigation

  // Use useEffect to handle the query parameters
  useEffect(() => {
    // Ensure router.query is ready before accessing token
    if (router.isReady && router.query?.token) {
      setToken(router.query.token); // Set the token from the URL query
    }
  }, [router.isReady, router.query]); // Dependency on router.isReady and router.query

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid or expired token");
      return;
    }

    try {
      // Send POST request to reset password endpoint with new password and token
      const response = await axios.post(
        "http://127.0.0.1:8000/reset-password",
        {
          token,
          newPassword,
        }
      );

      setMessage(response.data.message); // Show success message
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
