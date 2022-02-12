import React from "react";
import { connect } from "react-redux";
import { getCurrentQuestion } from "../../utils";
import HintButton from "./HintButton";
import SkipButton from "./SkipButton";

const HintOrSkip = (props) => {
  return getCurrentQuestion() ? getCurrentQuestion().answeredCount > 0 ? (
    <HintButton />
  ) : props.input.length === 0 ? (
    <SkipButton />
  ) : <></> : <></>
};

const mapStateToProps = (state) => ({
  questionIndex: state.questionIndex,
  input: state.lessonInput
});

export default connect(mapStateToProps)(HintOrSkip);
