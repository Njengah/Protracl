"use client"; // Marking this file as a client component

import { useState } from "react"; // React hooks
import { useRouter } from "next/navigation"; // Next.js 13+ router
import axios from "axios"; // Axios for making HTTP requests
import RegistrationForm from "../components/RegistrationForm"; // Registration form component

const RegistrationPage = () => {
  const [error, setError] = useState(""); // Error state for registration
  const router = useRouter(); // Use Next.js router for navigation

  const handleRegister = async (email, password, fullName) => {
    try {
      // Send POST request to FastAPI backend with email, password, and full name
      const response = await axios.post("http://127.0.0.1:8000/register", {
        email,
        password,
        full_name: fullName,
      });

      // If registration is successful, redirect to the login page
      if (response.data.success) {
        router.push("/login"); // Redirect to login page
      } else {
        setError(response.data.message); // Show error message if registration failed
      }
    } catch (err) {
      setError("Something went wrong. Please try again."); // Handle error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6"> Protracl Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <RegistrationForm onRegister={handleRegister} />{" "}
        {/* Pass handleRegister as a prop */}
      </div>
    </div>
  );
};

export default RegistrationPage;
