import React from "react";
import { Modal, Col, Button, Row, Table } from "react-bootstrap";
import { connect } from "react-redux";
import store from "../../reducers/store";
import DeleteModal from "./DeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { loadSong } from "./utils";

function generateTable(rowData) {
  let rows = [];
  rowData.forEach((songname) => {
    rows.unshift(
      <tr key={songname}>
        <td>
          <Row className="align-items-center">
            <Col
              xs={3}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={() => {
                  loadSong(songname);
                  store.dispatch({
                    type: "CREATE_LESSON_UPDATE_LOAD_MODAL",
                    showLoadModal: false,
                  });
                }}
              >
                load
              </Button>
            </Col>
            <Col xs={7}>{songname}</Col>
            <Col
              md={2}
              style={{
                top: 0,
                bottom: 0,
                margin: "auto",
              }}
            >
              <Button
                //@ts-ignore
                variant="outline"
                size="sm"
                style={{
                  width: "1em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="pr-3 pl-3 float-left"
                onClick={() => {
                  store.dispatch({
                    type: "CREATE_LESSON_UPDATE_DELETE_SONGNAME",
                    songname,
                  });
                  store.dispatch({
                    type: "CREATE_LESSON_UPDATE_DELETE_MODAL",
                    showDeleteModal: true,
                  });
                  store.dispatch({
                    type: "CREATE_LESSON_UPDATE_LOAD_MODAL",
                    showLoadModal: false,
                  });
                }}
              >
                <FontAwesomeIcon icon={faTrash} size="lg" color="grey" />
              </Button>
            </Col>
          </Row>
        </td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover size="sm">
      <tbody>{rows ? rows : "Loading..."}</tbody>
    </Table>
  );
}

const LoadModal = ({ showLoad, modalData }) => {
  return (
    <>
      <Modal
        show={showLoad}
        onHide={() => {
          store.dispatch({
            type: "CREATE_LESSON_UPDATE_LOAD_MODAL",
            showLoadModal: false,
          });
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Load</Modal.Title>
        </Modal.Header>
        <Modal.Body>{generateTable(modalData)}</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              store.dispatch({ type: "CREATE_LESSON_UPDATE_TITLE", title: "" });
              store.dispatch({ type: "CREATE_LESSON_UPDATE_GENRE", genre: "" });
              store.dispatch({ type: "CREATE_LESSON_UPDATE_IMAGE", image: "" });
              store.dispatch({ type: "CREATE_LESSON_UPDATE_VIDEO", video: "" });
              store.dispatch({
                type: "CREATE_LESSON_LESSON_SET_QUESTIONS",
                questions: [],
              });
              store.dispatch({
                type: "CREATE_LESSON_UPDATE_LOAD_MODAL",
                showLoadModal: false,
              });
            }}
          >
            New Lesson
          </Button>
        </Modal.Footer>
      </Modal>

      <DeleteModal />
    </>
  );
};

const mapStateToProps = (state) => ({
  showLoad: state.createLessonLoadModal,
  modalData: state.createLessonLoadModalData,
});

export default connect(mapStateToProps)(LoadModal);
