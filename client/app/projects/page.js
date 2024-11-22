"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

const ProjectsPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    } else {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

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

      console.log(userId + "ready");

      // Fetch user data and projects
      axios
        .get(`http://127.0.0.1:8000/projects?user_id=${userId}`) // Fetch projects for the user
        .then((response) => {
          setProjects(response.data); // Set the fetched projects
          setUser(decodedToken); // Set the user information from the decoded token
          setLoading(false); // Stop loading
        })
        .catch((error) => {
          setError("Error fetching projects.");
          setLoading(false);
        });
    }
  }, [router]);

  const handleAddProject = (newProject) => {
    const token = localStorage.getItem("authToken");
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode token for userId
    const userId = decodedToken.sub || decodedToken.id;

    axios
      .post("http://127.0.0.1:8000/api/projects", {
        ...newProject,
        user_id: userId,
      }) // Add user_id to new project
      .then((response) => {
        setProjects((prevProjects) => [...prevProjects, response.data]); // Add the new project to the list
      })
      .catch((error) => {
        setError("Error adding project.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
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
          <p className="text-gray-600">id: {user?.id}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Projects</h2>
      <ProjectForm onAddProject={handleAddProject} />

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

export default ProjectsPage;
