import React, { Fragment, useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Register = ({ history }) => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated, error, clearErrors } = authContext;

  const alertContext = useContext(AlertContext);
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
    name: "",
    email: "",
    password: "",
    role: "qa_person",
    access_code: "",
  });

  const { name, email, password, role, access_code } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "" || access_code === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      register({
        name,
        email,
        password,
        role,
        accessCode: access_code,
      });
    }
  };

  return (
    <Fragment>
      <h1>Create an Account</h1>
      <p>Provide quality assurance on projects</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
        </div>
        <br />

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onChange}
          />
        </div>
        <br />

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            name="role"
            className="form-control"
            value={role}
            onChange={onChange}
          >
            <option value="developer">Developer</option>
            <option value="qa_person">QA Person</option>
          </select>
        </div>
        <br />

        <div className="form-group">
          <input
            type="password"
            name="access_code"
            className="form-control"
            placeholder="App access code"
            value={access_code}
            onChange={onChange}
          />
        </div>
        <br />

        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Add Account"
        />
      </form>
    </Fragment>
  );
};

export default Register;
