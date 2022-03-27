import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <a onClick={onLogout} className="nav-link" href="#!">
          <i className="fas fa-sign-out"></i> Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Create account
        </Link>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-primary mb-3">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Quality Assurance App
          </Link>

          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
