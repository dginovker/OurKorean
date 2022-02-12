import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getTimeUntilNextQuestion,
  isAQuestion,
  getCurrentQuestion,
  MAX_LEARN_WORDS_PER_DAY,
  MAX_ANSWERS,
  getNewQuestion,
} from "../utils";
import store from "../../../reducers/store";

function nextReviewInEng() {
  const mins = Math.floor(getTimeUntilNextQuestion() / 60);

  if (mins < 60) {
    return `${mins} minute${mins === 1 ? "" : "s"}`;
  }

  const hours = Math.floor(mins / 60);
  return `${hours} hour${hours === 1 ? "" : "s"}`;
}

function getQuestionPrompt() {
  if (isAQuestion()) {
    return (
      <span>
        {getCurrentQuestion().question}
        {getCurrentQuestion().answeredCount > 0 ? (
          ""
        ) : (
          <sup>
            <span className="text-muted pl-2" style={{ fontSize: 13 }}>
              New word
            </span>
          </sup>
        )}
      </span>
    );
  }

  if (store.getState().lessonNewWordsLearnedToday >= MAX_LEARN_WORDS_PER_DAY) {
    return `Congrats! You've reached your word limit for today. Next review is in ${nextReviewInEng()}.`;
  }

  if (
    store
      .getState()
      .questions.filter((question) => question.answeredCount < MAX_ANSWERS)
      .length === 0
  )
    return "Congradulations! You've learned everything in this lesson.";

  if (
    store
      .getState()
      .questions.filter((question) => question.answeredCount !== 0).length ===
    store.getState().questions.length
  ) {
    return `You've seen all the words in this lesson! Next review is in ${nextReviewInEng()}.`;
  }

  return "Something went wrong";
}

function setQuestionPrompt() {
  if (!isAQuestion() && getTimeUntilNextQuestion() === 0) {
    store.dispatch({
      type: "LESSON_CHANGE_QUESTION_INDEX",
      id: getNewQuestion(),
    });
  }
  store.dispatch({
    type: "LESSON_SET_QUESTION_PROMPT",
    prompt: getQuestionPrompt(),
  });
}

let refresherRunning = false;
function startRefresher() {
  if (refresherRunning) {
    return;
  }
  refresherRunning = true;

  setInterval(() => {
    setQuestionPrompt();
  }, 1000);
}

const QuestionPrompt = (props) => {
  useEffect(() => {
    setQuestionPrompt();
  }, [props.questionIndex]);
  startRefresher();

  return <Form.Label>{props.questionPrompt}</Form.Label>;
};

const mapStateToProps = (state) => ({
  questionIndex: state.questionIndex,
  questionPrompt: state.lessonQuestionPrompt,
  //  qLearnedToday: state.lessonNewWordsLearnedToday
});

export default connect(mapStateToProps)(QuestionPrompt);
