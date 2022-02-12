import React, { useState } from "react";
import { connect } from "react-redux";
import { Fade } from "react-bootstrap";
import store from "../../../reducers/store";
import {
  getCurrentQuestion,
  isAQuestion,
  isLessonInputCorrect,
} from "../utils";

const invisLine = <span>&nbsp;&nbsp;</span>;

function displayRightAnswer() {
  return (isAQuestion() &&
    store.getState().reviewState) ||
    !isLessonInputCorrect() ? (
    <>Answer: {getCurrentQuestion().answer}</>
  ) : (
    invisLine
  );
}

function displayHint() {
  return getCurrentQuestion() && getCurrentQuestion().hint.length > 0
    ? getCurrentQuestion().hint
    : invisLine;
}

let prevQindex;
const Review = (props) => {
  const [rightAnswer, setRightAnswer] = useState(invisLine);
  const [hint, setHint] = useState(invisLine);

  if (props.questionIndex !== prevQindex) {
    prevQindex = props.questionIndex;
    setHint(displayHint());
  }

  return (
    <>
      <Fade
        onEnter={() => {
          setRightAnswer(displayRightAnswer());
        }}
        onExit={() => {
          setRightAnswer(invisLine);
        }}
        in={props.review}
      >
        <div id="insight-fade-text">{rightAnswer}</div>
      </Fade>
      <Fade
        onEnter={() => {
          setHint(displayHint());
        }}
        onExit={() => {
          setHint(invisLine);
        }}
        in={
          props.review ||
          (!props.review &&
            getCurrentQuestion() &&
            getCurrentQuestion().answeredCount === 0)
        }
      >
        <div id="insight-fade-text">{hint}</div>
      </Fade>
    </>
  );
};

const mapStateToProps = (state) => ({
  input: state.lessonInput,
  review: state.lessonReview,
  questionIndex: state.questionIndex,
});

export default connect(mapStateToProps)(Review);
