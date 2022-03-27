import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/layout/Footer";
import Project from "./components/project/Project";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import ProjectState from "./context/project/ProjectState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.access_token) {
  setAuthToken(localStorage.access_token);
}

function App() {
  return (
    <AuthState>
      <ProjectState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />

              <div className="container">
                <Alert />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute exact path="/project/:id" component={Project} />
                  <Route component={NotFound} />
                </Switch>
              </div>

              <Footer />
            </div>
          </Router>
        </AlertState>
      </ProjectState>
    </AuthState>
  );
}

export default App;
