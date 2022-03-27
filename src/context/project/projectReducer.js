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

// eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
        loading: false,
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    case ADD_QA:
      return {
        ...state,
        qas: [action.payload, ...state.qas],
      };
    case GET_QAS:
      return {
        ...state,
        qas: action.payload,
        loading: false,
      };
    case UPDATE_QA:
      return {
        ...state,
        qas: state.qas.map((qa) =>
          qa.id === action.payload.id ? action.payload : qa
        ),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
