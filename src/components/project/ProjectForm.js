import React, { useState, useContext } from "react";
import ProjectContext from "../../context/project/projectContext";
import AlertContext from "../../context/alert/alertContext";

const ProjectForm = () => {
  const projectContext = useContext(ProjectContext);
  const alertContext = useContext(AlertContext);

  const { addProject } = projectContext;
  const { setAlert } = alertContext;

  const [project, setProject] = useState({
    project_name: "",
    project_url: "",
    status: "pending",
  });

  const { project_name, project_url } = project;

  const onChange = (e) =>
    setProject({ ...project, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (project_name === "" || project_url === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      addProject(project);
    }

    setProject({
      project_name: "",
      project_url: "",
      status: "pending",
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="card card-body card-form">
        <div className="add-project">
          <h1>Submit a new project for QA</h1>
          <p className="lead">
            Fill the form below with project details for Quality Assurance
            Review.
          </p>

          <div className="row">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Project name"
                name="project_name"
                value={project_name}
                onChange={onChange}
              />
            </div>

            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Project URL"
                name="project_url"
                value={project_url}
                onChange={onChange}
              />
            </div>

            <div className="col-md-2">
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Submit"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
