"use client";

import { useState } from "react";
import axios from "axios";

const ProjectForm = ({ onAddProject }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [deadline, setDeadline] = useState("");
  const [milestones, setMilestones] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !projectName ||
      !description ||
      !projectType ||
      !businessModel ||
      !deadline ||
      !milestones ||
      !status
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Get the user ID from the JWT token in localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You need to be logged in to create a project.");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.id;

    // Create projectData object and include user_id
    const projectData = {
      project_name: projectName,
      description,
      project_type: projectType,
      business_model: businessModel,
      deadline,
      milestones,
      status,
      user_id: userId,
    };

    console.log(projectData);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/projects",
        projectData
      );
      onAddProject(response.data); // Update the parent component with the new project
      setProjectName("");
      setDescription("");
      setProjectType("");
      setBusinessModel("");
      setDeadline("");
      setMilestones("");
      setStatus("");
      alert("Project added successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project.");
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="projectName"
            className="block text-sm font-semibold mb-2"
          >
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="projectType"
            className="block text-sm font-semibold mb-2"
          >
            Project Type
          </label>
          <input
            type="text"
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="businessModel"
            className="block text-sm font-semibold mb-2"
          >
            Business Model
          </label>
          <input
            type="text"
            id="businessModel"
            value={businessModel}
            onChange={(e) => setBusinessModel(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="deadline"
            className="block text-sm font-semibold mb-2"
          >
            Deadline
          </label>
          <input
            type="datetime-local"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="milestones"
            className="block text-sm font-semibold mb-2"
          >
            Milestones
          </label>
          <textarea
            id="milestones"
            value={milestones}
            onChange={(e) => setMilestones(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-semibold mb-2">
            Status
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
