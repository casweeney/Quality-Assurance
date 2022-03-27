import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({ project }) => {
  return (
    <tr
      style={
        project.status === "pending"
          ? { backgroundColor: "#c30", color: "#fff" }
          : { backgroundColor: "green", color: "#fff", fontWeight: "bold" }
      }
    >
      <td>
        <Link
          to={`/project/${project.id}`}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          {project.project_name}
        </Link>
      </td>
      <td>
        <Link
          to={`/project/${project.id}`}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          {project.project_url}
        </Link>
      </td>
      <td>
        <Link
          to={`/project/${project.id}`}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          {project.status}
        </Link>
      </td>
    </tr>
  );
};

export default ProjectItem;
