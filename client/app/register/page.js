"use client"; // Marking this file as a client component

import { useState } from "react"; // React hooks
import { useRouter } from "next/navigation"; // Next.js 13+ router
import axios from "axios"; // Axios for making HTTP requests
import RegistrationForm from "../components/RegistrationForm"; // Import your RegistrationForm component

const RegisterPage = () => {
  const [error, setError] = useState(""); // Error message state
  const [message, setMessage] = useState(""); // Success message state
  const router = useRouter(); // Use Next.js router for navigation

  const handleRegister = async (email, password, fullName) => {
    try {
      // Send POST request to FastAPI backend for user registration
      const response = await axios.post("http://127.0.0.1:8000/register", {
        email,
        password,
        full_name: fullName,
      });

      setMessage(response.data.message); // Show success message

      // Optionally, you can redirect to the login page after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6">Register for Protracl</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <RegistrationForm onRegister={handleRegister} />{" "}
        {/* Pass handleRegister as a prop */}
      </div>
    </div>
  );
};

export default RegisterPage;
