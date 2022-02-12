import React from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import store from "../../reducers/store";
import { deleteSong } from "./utils";

const DeleteModal = ({ showDelete }) => {
  return (
    <>
      <Modal
        show={showDelete}
        onHide={() => {
          store.dispatch({
            type: "CREATE_LESSON_UPDATE_DELETE_MODAL",
            showDeleteModal: false,
          });
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>There is no way to revert this!</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              store.dispatch({
                type: "CREATE_LESSON_UPDATE_LOAD_MODAL",
                showLoadModal: true,
              });
              store.dispatch({
                type: "CREATE_LESSON_UPDATE_DELETE_MODAL",
                showDeleteModal: false,
              });
            }}
          >
            Take me back
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteSong();
              store.dispatch({
                type: "CREATE_LESSON_UPDATE_LOAD_MODAL",
                showLoadModal: true,
              });
              store.dispatch({
                type: "CREATE_LESSON_UPDATE_DELETE_MODAL",
                showDeleteModal: false,
              });
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  showDelete: state.createLessonDeleteModal,
});

export default connect(mapStateToProps)(DeleteModal);
