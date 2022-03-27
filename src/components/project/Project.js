import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import QaItem from "../qa/QaItem";
import QaForm from "../qa/QaForm";

import AuthContext from "../../context/auth/authContext";
import ProjectContext from "../../context/project/projectContext";

const Project = ({ match }) => {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);

  const { loadUser, user } = authContext;
  const { project, getProject, getQas, loading, updateProjectStatus, qas } =
    projectContext;

  useEffect(() => {
    loadUser();
    getProject(match.params.id);
    getQas(match.params.id);

    // eslint-disable-next-line
  }, []);

  const { project_name, project_url, status, id } = project;

  const markPassed = () => {
    const data = {
      status: "passed",
    };
    updateProjectStatus(data, id);
  };

  const markPending = () => {
    const data = {
      status: "pending",
    };

    updateProjectStatus(data, id);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <div className="card card-body">
        <h3>{project_name}</h3>
        <p className="dev-project-url">{project_url}</p>
        <p className="dev-project-status">{status}</p>
        <div className="row">
          <div className="col-md-4">
            {user !== null &&
              user.role === "qa_person" &&
              project.status === "pending" && (
                <button
                  style={{ marginRight: "10px" }}
                  onClick={markPassed}
                  className="btn btn-success"
                >
                  Marked as passed
                </button>
              )}

            {user !== null &&
              user.role === "qa_person" &&
              project.status === "passed" && (
                <button
                  style={{ marginRight: "10px" }}
                  onClick={markPending}
                  className="btn btn-warning"
                >
                  Keep pending
                </button>
              )}
            <Link to="/" className="text-white devBackBtn btn btn-secondary">
              <i className="fa fa-arrow-left"></i> Return Back
            </Link>
          </div>
        </div>
      </div>
      <br />

      {user !== null && user.role === "qa_person" && <QaForm project_id={id} />}

      {user !== null && qas && qas.length > 0 && (
        <div className="mt-5">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>QA URL</th>
                  <th>QA Comment</th>
                  <th>QA Media</th>
                  <th>Developer Comment</th>
                  <th>QA Status</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody className="project-qas">
                {qas.map((qa) => (
                  <QaItem key={qa.id} qa={qa} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
