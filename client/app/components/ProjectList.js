"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Axios for making HTTP requests

const ProjectList = ({ userId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/projects?user_id=${userId}`) // Fetch projects of the logged-in user
      .then((response) => {
        setProjects(response.data); // Update the state with the fetched projects
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        setError("Error fetching projects.");
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
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
  );
};

export default ProjectList;
