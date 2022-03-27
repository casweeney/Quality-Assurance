import React, { useState, useContext } from "react";
import ProjectContext from "../../context/project/projectContext";
import AlertContext from "../../context/alert/alertContext";

const QaForm = ({ project_id }) => {
  const projectContext = useContext(ProjectContext);
  const { addQa } = projectContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [qa, setQa] = useState({
    project_id,
    qa_url: "",
    qa_comment: "",
    qa_media: "",
  });

  const onChange = (e) => {
    setQa({ ...qa, [e.target.name]: e.target.value });
  };

  const { qa_url, qa_comment } = qa;

  const onSubmit = (e) => {
    e.preventDefault();

    if (qa_url === "" || qa_comment === "") {
      setAlert("Please enter all fields", "danger");
    } else {
      addQa(qa);
    }

    setQa({
      project_id,
      qa_url: "",
      qa_comment: "",
      qa_media: "",
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Submit QA</h3>
      <p className="lead">
        Fill the form below with project Quality Assurance Review.
      </p>

      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            name="qa_url"
            className="form-control"
            placeholder="QA URL"
            onChange={onChange}
          />
        </div>

        <div className="col-md-3">
          <textarea
            style={{ resize: "none" }}
            name="qa_comment"
            className="form-control"
            placeholder="QA Comment"
            onChange={onChange}
          ></textarea>
        </div>

        <div className="col-md-3">
          <input
            type="file"
            name="qa_media"
            className="form-control"
            placeholder="QA Media"
            onChange={onChange}
          />
        </div>

        <div className="col-md-2">
          <button
            type="submit"
            className="submit-qa-btn btn btn-primary btn-block"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default QaForm;
