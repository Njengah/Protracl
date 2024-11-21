"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Import the TaskForm and TaskList components
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const TasksPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]); // State for storing tasks
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      axios
        .get(`http://127.0.0.1:8000/user/${decodedToken.sub}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  const handleAddTask = (task) => {
    // Add task to the state
    setTasks([...tasks, task]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="task-list">
      {/* User Info and Logout Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Hello, {user?.full_name}</h2>
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Tasks Management</h2>

      {/* TaskForm to add a new task */}
      <TaskForm onAddTask={handleAddTask} />

      {/* TaskList to display tasks */}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TasksPage;
