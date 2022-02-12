import React from "react";
import { connect } from "react-redux";
import { Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import QuestionPrompt from "./QuestionPrompt";
import store from "../../../reducers/store";

/*import store from "../../../reducers/store";
import { isDifferentDate } from "../utils";
*/
const AboveLesson = ({
  questions,
  questionIndex,
  review,
  user,
  warningBox,
}) => {
  return (
    <>
      {user.uid || !warningBox ? (
        <></>
      ) : (
        <Alert
          variant="warning"
          onClose={() =>
            store.dispatch({ type: "LESSONS_DISABLE_WARNING_BOX" })
          }
          dismissible
        >
          Note: You're not logged in. While you can still try out the lessons,
          all progress will be lost upon leaving the page!
          <Link to="/signup" className="pl-2">
            Sign up
          </Link>
        </Alert>
      )}
      <Row>
        <Col className={`text-muted ${user.uid ? "pt-3" : ""}`}>
          {questions[questionIndex] ? (
            questions[questionIndex].answeredCount !== 0 ? (
              `Review ${questions[questionIndex].answeredCount}`
            ) : (
              <span>&nbsp;&nbsp;</span>
            )
          ) : (
            ""
          )}
        </Col>
      </Row>
      <QuestionPrompt />
    </>
  );
};

const mapStateToProps = (state) => ({
  questionIndex: state.questionIndex,
  questions: state.questions,
  review: state.lessonReview,
  user: state.user,
  warningBox: state.lessonsWarningBox,
});

export default connect(mapStateToProps)(AboveLesson);
