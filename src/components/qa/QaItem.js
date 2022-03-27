import React, { Fragment, useState, useContext } from "react";
import ProjectContext from "../../context/project/projectContext";
import AlertContext from "../../context/alert/alertContext";

const QaItem = ({ qa, user }) => {
  const projectContext = useContext(ProjectContext);

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const { declineQa, markDone } = projectContext;

  const [data, setData] = useState({
    dev_comment: "",
    status: "Declined",
  });

  const { dev_comment } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (dev_comment === "") {
      setAlert("Please enter comments", "danger");
    } else {
      declineQa(data, qa.id);
    }

    setData({
      dev_comment: "",
      status: "Declined",
    });
  };

  const onClick = () => {
    const data = {
      dev_comment: "QA fixes done",
      status: "Done",
    };

    markDone(data, qa.id);
  };

  return (
    <tr>
      <td>{qa.qa_url}</td>
      <td>{qa.qa_comment}</td>
      <td>{qa.qa_media}</td>
      <td>{qa.developer_comment}</td>
      <td>{qa.status}</td>
      {user.role === "developer" && (
        <Fragment>
          <td>
            <form onSubmit={onSubmit}>
              <textarea
                cols="40"
                rows="3"
                name="dev_comment"
                style={{ resize: "none" }}
                placeholder="Developer Comment"
                className="form-control"
                onChange={onChange}
              ></textarea>
              <button type="submit" className="btn btn-danger decline-btn mt-1">
                Decline QA
              </button>
            </form>
          </td>
          <td>
            <button onClick={onClick} className="btn btn-success done-btn">
              Done
            </button>
          </td>
        </Fragment>
      )}
    </tr>
  );
};

export default QaItem;
