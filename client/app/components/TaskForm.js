// components/TaskForm.js

"use client";

import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && taskDescription) {
      onAddTask({ name: taskName, description: taskDescription });
      setTaskName(""); // Clear input fields
      setTaskDescription("");
    } else {
      alert("Please provide both task name and description.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="taskName" className="block text-sm font-semibold mb-2">
          Task Name
        </label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="taskDescription"
          className="block text-sm font-semibold mb-2"
        >
          Task Description
        </label>
        <textarea
          id="taskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
