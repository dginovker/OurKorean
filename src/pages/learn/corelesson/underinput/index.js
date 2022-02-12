import React from "react";
import { connect } from "react-redux";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import HintOrSkip from "./HintOrSkip";
import { submitAnswer } from "../../utils";
import { loadSong } from "../../../createlesson/utils";
import { useLessonInputFocus } from "../utils";

const UnderInput = (props) => {
  const setInputFocus = useLessonInputFocus()[1];
  const songname = useParams().songname;

  return (
    <Container className="pl-0 pr-0">
      <Row className="justify-content-end">
        <Col xs="auto" className="d-flex">
          <HintOrSkip />
          {props.lessonAuthor && props.user.nick === props.lessonAuthor ? (
            <Link to="/createlesson">
              <Button
                className="mt-3 mb-2 mr-2 pl-3 pr-3"
                //@ts-ignore
                variant="outline"
                size="sm"
                style={{
                  height: "3em",
                  width: "2em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => {
                  loadSong(songname);
                }}
              >
                <FontAwesomeIcon icon={faPencilAlt} size="lg" color="grey" />
              </Button>
            </Link>
          ) : (
            <></>
          )}
          <Button
            className="mt-3 mb-2"
            variant="primary"
            type="button"
            onClick={() => {
              submitAnswer();
              setInputFocus();
            }}
            aria-controls="insight-fade-text"
            aria-expanded={props.review}
          >
            {props.review ? "Continue" : "Submit"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  review: state.lessonReview,
  user: state.user,
  lessonAuthor: state.lessonAuthor,
  lessonEdit: state.lessonEdit,
  input: state.lessonInput,
});

export default connect(mapStateToProps)(UnderInput);
