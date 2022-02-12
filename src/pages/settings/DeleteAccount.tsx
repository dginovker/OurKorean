import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteAccount = () => {
  const [showDeleteAccWarning, setShowDeleteAccWarning] = useState(false);

  return (
    <>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => {
          setShowDeleteAccWarning(true);
        }}
      >
        Delete Account
        </Button>

      <Modal
        show={showDeleteAccWarning}
        onHide={() => {
          setShowDeleteAccWarning(false);
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Account Deletion </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          To delete your account, please send an email detailing your request
            to <a href="mailto:dcress01@uoguelph.ca">dcress01@uoguelph.ca</a>.
          </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowDeleteAccWarning(false);
            }}
          >
            Close{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccount;