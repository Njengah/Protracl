"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ router

const TasksPage = () => {
  const [loading, setLoading] = useState(true); // State for loading
  const [user, setUser] = useState(null); // State for storing user information
  const router = useRouter(); // Use Next.js router for navigation

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      // Redirect to login if there's no token
      router.push("/login");
    } else {
      // Decode the token to get user info (assuming you have user info like email)
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
      console.log(decodedToken); // Log the decoded token to check its contents

      setUser({
        email: decodedToken.sub, // Assuming email is stored as 'sub'
        fullName: decodedToken.full_name || "Unknown User", // Ensure fallback if full_name doesn't exist
      });
      setLoading(false); // Stop loading once authentication is verified
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    router.push("/login"); // Redirect to login
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state until verification
  }

  return (
    <div className="task-list">
      {/* Display user information at the top */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Hello, {user.fullName}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Tasks Management</h2>
      {/* Add your task management components here */}
    </div>
  );
};

export default TasksPage;
