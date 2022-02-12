import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ErrorMsg from "../../components/ErrorMsg";
import { publishSong, validateInput, saveSong, loadSavedSongs } from "./utils";
import store from "../../reducers/store";
import LoadModal from "./LoadModal";

const Publish = ({ questions, title, image, video, saveBtnTxt }) => {
  const [publishModal, setPublishModal] = useState(false);
  const [publishedModal, setPublishedModal] = useState(false);
  const [published, setPublished] = useState(false);

  if (published) {
    return <Redirect to="/lessons" />;
  }

  return (
    <>
      <ErrorMsg />
      <Button
        className="float-right mt-4 mr-2"
        onClick={() => {
          if (validateInput(questions, title, image, video).length === 0) {
            setPublishModal(true);
          }
        }}
      >
        Publish
      </Button>
      <Button
        className="float-right mt-4 mr-2"
        onClick={() => {
          loadSavedSongs();
          store.dispatch({
            type: "CREATE_LESSON_UPDATE_LOAD_MODAL",
            showLoadModal: true,
          });
        }}
      >
        Load
      </Button>
      <Button
        className="float-right mt-4 mr-2"
        onClick={() => {
          store.dispatch({ type: "CREATE_LESSON_SET_SAVE_BTN_TXT", text: "Saving.." });
          if (title) {
            store.dispatch({
              type: "WIPE_ERROR",
              error: "Can't save a song without a title!",
            });
            saveSong();
          } else {
            store.dispatch({
              type: "SET_ERROR",
              error: "Can't save a song without a title!",
            });
          }
        }}
      >
        {saveBtnTxt}
      </Button>

      <LoadModal />
      <Modal
        show={publishModal}
        onHide={() => {
          setPublishModal(false);
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Publish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you ready to publish? As the creator, you can edit the lesson from
          the learning screen at any time.
        </Modal.Body>
        <Modal.Footer>
          <>
            <Button
              onClick={() => {
                setPublishModal(false);
                setPublishedModal(true);

                publishSong();
              }}
            >
              Publish
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                setPublishModal(false);
              }}
            >
              Not Yet
            </Button>
          </>
        </Modal.Footer>
      </Modal>

      <Modal
        show={publishedModal}
        onHide={() => {
          setPublishedModal(false);
        }}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your new lesson is being published!
          <br />
          <br />
          It will be available in the User submitted section shortly.
        </Modal.Body>
        <Modal.Footer>
          <>
            <Button
              onClick={() => {
                setPublished(true);
              }}
            >
              Go Home
            </Button>
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questionList,
  title: state.createLessonTitle,
  image: state.createLessonImage,
  video: state.createLessonVideo,
  saveBtnTxt: state.createLessonSaveBtnTxt,
});

export default connect(mapStateToProps)(Publish);
