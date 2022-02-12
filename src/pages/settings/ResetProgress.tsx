import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { updateUserDBObject } from "../../firebase/database";

const DeleteAccount = () => {
  const [showResetWarning, setShowResetWarning] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <Button
        //@ts-ignore
        variant="outline"
        size="sm"
        onClick={() => {
          setShowResetWarning(true);
        }}
      >
        Reset Progress
        </Button>

      <Modal
        show={showResetWarning}
        onHide={() => {
          setShowResetWarning(false);
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reset all of your lesson progress? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowResetWarning(false);
            }}
          >
            Get me our of here!
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowResetWarning(false);
              updateUserDBObject("", {
                learning: null
              });
              setShowConfirmation(true);
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showConfirmation}
        onHide={() => {
          setShowConfirmation(false);
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Progress Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your progress has been reset. You can now go back and start learning from scratch!
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setShowConfirmation(false);
            }}
          >
            Sounds good
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccount;