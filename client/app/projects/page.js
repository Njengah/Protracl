"use client";

import { useState, useEffect } from "react"; // React hooks
import axios from "axios"; // Axios for making HTTP requests
import ProjectForm from "../components/ProjectForm"; // Project form component

const ProjectsPage = ({ userId }) => {
  // Accept userId as a prop
  const [projects, setProjects] = useState([]); // State for storing projects
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages

  // Fetch projects from the backend when the component mounts or userId changes
  useEffect(() => {
    if (!userId) {
      setError("User ID is required.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/projects?user_id=${userId}`) // Fetch projects for the specific user
      .then((response) => {
        setProjects(response.data); // Set the fetched projects to the state
        setLoading(false); // Stop loading once projects are fetched
      })
      .catch((error) => {
        setError("Error fetching projects.");
        setLoading(false); // Stop loading if there's an error
        console.error(error);
      });
  }, [userId]); // The effect now properly depends on userId

  const handleAddProject = (newProject) => {
    setLoading(true);
    // Send the new project to the backend
    axios
      .post("http://127.0.0.1:8000/api/projects", {
        ...newProject,
        user_id: userId,
      }) // Include user_id in the new project
      .then((response) => {
        setProjects((prevProjects) => [...prevProjects, response.data]); // Add the new project to the state
        setLoading(false); // Stop loading after the project is added
      })
      .catch((error) => {
        setError("Error adding project.");
        setLoading(false); // Stop loading if there's an error
        console.error(error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Projects</h1>

      {/* Add Project Form */}
      <ProjectForm onAddProject={handleAddProject} />

      {/* Loading state */}
      {loading && <div>Loading...</div>}

      {/* Error message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display list of projects */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        {projects.length === 0 ? (
          <p>No projects found. Start by adding a new project!</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="mb-4">
                <div className="p-4 border rounded">
                  <h3 className="text-lg font-semibold">
                    {project.project_name}
                  </h3>
                  <p className="text-gray-600">{project.description}</p>
                  <p className="text-gray-600">Type: {project.project_type}</p>
                  <p className="text-gray-600">Status: {project.status}</p>
                  <p className="text-gray-600">
                    Deadline: {new Date(project.deadline).toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Milestones: {project.milestones}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
