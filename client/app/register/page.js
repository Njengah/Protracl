"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import RegistrationForm from "../components/RegistrationForm";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (email, password, fullName) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/register", {
        email,
        password,
        full_name: fullName,
      });

      setMessage(response.data.message);

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
      </div>
    </div>
  );
};

export default RegisterPage;
