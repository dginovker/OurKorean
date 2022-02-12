import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ResetProgress from "./ResetProgress";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  return (
    <>
      <h3>General</h3>
      <>
        <Link to="/createlesson">
          <Button variant="primary"
            size="sm"
          >Create a Lesson</Button>
        </Link>
      </>
      <hr className="mt-4" />
      <h3 className="mt-2">Danger Zone</h3>
      <ResetProgress />
      <br />
      <DeleteAccount />
    </>
  );
};

export default Settings;
