import React, { useReducer } from "react";
import axios from "axios";
import ProjectContext from "./projectContext";
import projectReducer from "./projectReducer";
import setAuthToken from "../../utils/setAuthToken";

import {
  GET_PROJECTS,
  ADD_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
  PROJECT_ERROR,
  ADD_QA,
  GET_QAS,
  UPDATE_QA,
  SET_LOADING,
} from "../types";

const ProjectState = (props) => {
  const initialState = {
    projects: null,
    project: {},
    qas: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Get User Projects
  const getUserProjects = async () => {
    if (localStorage.access_token) {
      setAuthToken(localStorage.access_token);
    }

    setLoading();

    try {
      const res = await axios.get(
        "http://localhost:8000/api/user/fetch/projects"
      );

      dispatch({
        type: GET_PROJECTS,
        payload: res.data.projects,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Get All Projects
  const getAllProjects = async () => {
    if (localStorage.access_token) {
      setAuthToken(localStorage.access_token);
    }

    setLoading();

    try {
      const res = await axios.get(
        "http://localhost:8000/api/fetch/all/projects"
      );

      dispatch({
        type: GET_PROJECTS,
        payload: res.data.projects,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Add Project
  const addProject = async (project) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/submit/project",
        project,
        config
      );

      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Get Project
  const getProject = async (id) => {
    setLoading();

    try {
      const res = await axios.get(
        `http://localhost:8000/api/fetch/project/${id}/details`
      );

      dispatch({
        type: GET_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Get Qas
  const getQas = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/fetch/project/${id}/details`
      );

      dispatch({
        type: GET_QAS,
        payload: res.data.qas,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Add Qa
  const addQa = async (qa) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:8000/api/submit/qa",
        qa,
        config
      );

      dispatch({
        type: ADD_QA,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Decline Qa
  const declineQa = async (data, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:8000/api/add/dev/qa/${id}/comment`,
        data,
        config
      );

      dispatch({
        type: UPDATE_QA,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Mark Qa Done
  const markDone = async (data, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:8000/api/add/dev/qa/${id}/comment`,
        data,
        config
      );

      dispatch({
        type: UPDATE_QA,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Set project to passed
  const updateProjectStatus = async (data, id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:8000/api/update/project/${id}/status`,
        data,
        config
      );

      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
        payload: err.response.data.message,
      });
    }
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        project: state.project,
        loading: state.loading,
        qas: state.qas,
        error: state.error,
        getUserProjects,
        getAllProjects,
        addProject,
        getProject,
        getQas,
        addQa,
        setLoading,
        declineQa,
        markDone,
        updateProjectStatus,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
