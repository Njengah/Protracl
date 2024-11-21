"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [projectId, setProjectId] = useState(""); // For project selection
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [approxTime, setApproxTime] = useState("");
  const [actualTime, setActualTime] = useState("");
  const [challenges, setChallenges] = useState("");
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("Not Started");

  // Fetch projects or other necessary info for the dropdown options (can be later extended)
  const fetchProjects = async () => {
    // You can use a similar approach to fetch the list of projects from the backend
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (taskName && taskDescription && projectId) {
      const newTask = {
        task_name: taskName,
        task_desc: taskDescription,
        project_id: projectId,
        start_time: startTime,
        end_time: endTime,
        approx_time: approxTime,
        actual_time: actualTime,
        challenges,
        remarks,
        score: actualTime ? (approxTime / actualTime) * 100 : 0, // Example scoring logic
        status,
      };

      try {
        await axios.post("http://127.0.0.1:8000/tasks", newTask); // Send data to backend
        onAddTask(newTask); // Update parent component
        setTaskName("");
        setTaskDescription("");
        setProjectId("");
        setStartTime("");
        setEndTime("");
        setApproxTime("");
        setActualTime("");
        setChallenges("");
        setRemarks("");
        setStatus("Not Started");
      } catch (err) {
        console.error("Error adding task:", err);
      }
    } else {
      alert("Please fill out all fields.");
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

      {/* Additional Fields */}
      <div className="mb-4">
        <label htmlFor="projectId" className="block text-sm font-semibold mb-2">
          Project
        </label>
        <select
          id="projectId"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          {/* Map your projects data here */}
          <option value="">Select a project</option>
          {/* Example:
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.project_name}</option>
            ))}
          */}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="startTime" className="block text-sm font-semibold mb-2">
          Start Time
        </label>
        <input
          type="datetime-local"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="endTime" className="block text-sm font-semibold mb-2">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="approxTime"
          className="block text-sm font-semibold mb-2"
        >
          Approximate Time (hrs)
        </label>
        <input
          type="number"
          id="approxTime"
          value={approxTime}
          onChange={(e) => setApproxTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="actualTime"
          className="block text-sm font-semibold mb-2"
        >
          Actual Time (hrs)
        </label>
        <input
          type="number"
          id="actualTime"
          value={actualTime}
          onChange={(e) => setActualTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="challenges"
          className="block text-sm font-semibold mb-2"
        >
          Challenges
        </label>
        <textarea
          id="challenges"
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="remarks" className="block text-sm font-semibold mb-2">
          Remarks
        </label>
        <textarea
          id="remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-semibold mb-2">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
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
