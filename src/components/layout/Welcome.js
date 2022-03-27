import React from "react";

const Welcome = ({ user }) => {
  return (
    <div>
      <h2>
        Howdy! {user.name} You are logged in as {user.role}
      </h2>
      <br />
    </div>
  );
};

export default Welcome;
