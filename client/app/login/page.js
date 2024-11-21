// app/login/page.js

"use client"; // Marking this file as a client component

import { useState } from "react"; // React hooks
import { useRouter } from "next/navigation"; // Next.js 13+ router
import axios from "axios"; // Axios for making HTTP requests
import LoginForm from "../components/LoginForm"; // Login form component

const LoginPage = () => {
  const [error, setError] = useState(""); // Error state for invalid login
  const router = useRouter(); // Use Next.js router for navigation

  const handleLogin = async (email, password) => {
    try {
      // Send POST request to FastAPI backend with email and password
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });

      // If login is successful, store JWT token and redirect
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token); // Store token
        router.push("/tasks"); // Redirect to tasks page
      } else {
        setError("Invalid credentials"); // Set error message
      }
    } catch (err) {
      setError("Something went wrong. Please try again."); // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6">Login to Protracl</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <LoginForm onLogin={handleLogin} /> {/* Pass handleLogin as a prop */}
      </div>
    </div>
  );
};

export default LoginPage;
