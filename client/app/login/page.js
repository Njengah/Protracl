"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        router.push("/tasks");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#91b0b8] to-[#ecf3ef]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6">Protracl Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <LoginForm onLogin={handleLogin} />
        <div className="mt-4">
          <div className="text-center text-sm">
            <a
              href="/forgot-password"
              className="text-teal-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <div className="text-center text-sm mt-2">
            <span>Don't have an account? </span>
            <a href="/register" className="text-teal-500 hover:underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
