import React, { useRef, MutableRefObject } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import Review from "./Review";
import {
  getPlaceholderAnswer,
  isLessonInputCorrect,
  displayError,
  submitAnswer,
} from "../utils";
import UnderInput from "./underinput";
import AboveLesson from "./AboveLesson";
import { useLessonInputFocus } from "./utils";

const Lesson = (props) => {
  const answerInputRef: MutableRefObject<HTMLInputElement> = useLessonInputFocus(useRef(null))[0];
  return (
    <Form>
      <AboveLesson />
      <Form.Group>
        <Form.Control
          autoFocus
          ref={answerInputRef}
          disabled={!Number.isInteger(props.questionIndex)}
          type="text"
          placeholder={getPlaceholderAnswer()}
          isInvalid={props.error.length > 0}
          isValid={props.review && isLessonInputCorrect()}
          onChange={(e) => {
            if (props.review) {
              return;
            }

            props.dispatch({
              type: "LESSON_UPDATE_INPUT",
              input: e.target.value,
            });
            props.dispatch({ type: "LESSON_UPDATE_ERROR", error: "" });
          }}
          value={props.input}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitAnswer();
            }
          }}
        />

        <Form.Control.Feedback type="invalid">
          {displayError(props.error)}
        </Form.Control.Feedback>
        <UnderInput />
      </Form.Group>

      <Review />
    </Form>
  );
};

const mapStateToProps = (state) => ({
  quizBoxErrors: state.quizBoxErrors,
  questionIndex: state.questionIndex,
  questions: state.questions,
  error: state.lessonError,
  input: state.lessonInput,
  review: state.lessonReview,
  numberOfTimesWrong: state.numberOfTimesWrong,
  prompt: state.lessonQuestionPrompt,
});

export default connect(mapStateToProps)(Lesson);
