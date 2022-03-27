import React, { Fragment, useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = ({ history }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, isAuthenticated, error, clearErrors } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error !== null && error !== undefined) {
      setAlert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <Fragment>
      <h1>Signin</h1>
      <p className="lead">Provide quality assurance on projects</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={onChange}
          />
        </div>
        <br />

        <input
          className="login btn btn-primary btn-block"
          type="submit"
          value="Login"
        />
      </form>
    </Fragment>
  );
};

export default Login;
