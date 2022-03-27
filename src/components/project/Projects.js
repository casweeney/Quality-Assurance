import React, { Fragment, useContext, useEffect } from "react";
import ProjectItem from "./ProjectItem";
import AuthContext from "../../context/auth/authContext";
import ProjectContext from "../../context/project/projectContext";

const Projects = () => {
  const authContext = useContext(AuthContext);
  const projectContext = useContext(ProjectContext);

  const { user } = authContext;
  const { projects, loading, getUserProjects, getAllProjects } = projectContext;

  useEffect(() => {
    if (user.role === "developer") {
      getUserProjects();
    } else {
      getAllProjects();
    }

    // eslint-disable-next-line
  }, []);

  if (user !== null && projects !== null && projects.length === 0 && !loading) {
    if (user.role === "developer") {
      return <h3 className="mt-4 text-info">Please add a project</h3>;
    } else {
      return <h3 className="mt-4 text-info">No project available for QA</h3>;
    }
  }

  return (
    <div className="table-responsive mt-5">
      {projects !== null && !loading ? (
        <Fragment>
          {user.role === "developer" ? (
            <h3 className="text-primary" style={{ fontWeight: "bold" }}>
              Click on any project below to see quality assurance reviews
            </h3>
          ) : (
            <h3 className="text-primary" style={{ fontWeight: "bold" }}>
              Click any project below to submit a quality assurance review
            </h3>
          )}

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Project name</th>
                <th>URL</th>
                <th>QA status</th>
              </tr>
            </thead>

            <tbody className="dev-projects">
              {projects.length > 0 &&
                projects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
            </tbody>
          </table>
        </Fragment>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Projects;
