// app/login/page.js

"use client"; // Marking this file as a client component

import { useState } from "react"; // React hooks
import { useRouter } from "next/navigation"; // Next.js 13+ router
import LoginForm from "../components/LoginForm"; // Import LoginForm component
import axios from "axios"; // Axios for making HTTP requests

const LoginPage = () => {
  const [error, setError] = useState(""); // Error state for invalid login
  const router = useRouter(); // Use Next.js router for navigation

  const handleLogin = async (email, password) => {
    try {
      // Sending login request to FastAPI backend
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });

      // Check if the login is successful
      if (response.data.success) {
        // Store the JWT token in localStorage
        localStorage.setItem("authToken", response.data.token);

        // Redirect to the tasks page
        router.push("/tasks");
      } else {
        setError("Invalid credentials"); // Display error if credentials are wrong
      }
    } catch (err) {
      setError("Something went wrong. Please try again."); // Handle errors (e.g., network issues)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6">Login to Protracl</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display error message */}
        <LoginForm onLogin={handleLogin} /> {/* Pass handleLogin as a prop */}
      </div>
    </div>
  );
};

export default LoginPage;
