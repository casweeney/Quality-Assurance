import React, { Fragment, useContext, useEffect } from "react";
import Welcome from "../layout/Welcome";
import ProjectForm from "../project/ProjectForm";
import Projects from "../project/Projects";
import AuthContext from "../../context/auth/authContext";

const Home = (props) => {
  const authContext = useContext(AuthContext);

  const { loadUser, user, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {user && (
        <Fragment>
          <Welcome user={user} />
          {user !== null && user.role === "developer" && <ProjectForm />}
          <Projects />
        </Fragment>
      )}
    </div>
  );
};

export default Home;
