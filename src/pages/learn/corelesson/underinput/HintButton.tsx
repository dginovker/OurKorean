import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { getCurrentQuestion } from "../../utils";
import { useLessonInputFocus } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export function calculateHintInput(input) {
  for (let i = 0; i < getCurrentQuestion().answer.length; i++) {
    if (getCurrentQuestion().answer[i] !== input[i]) {
      return getCurrentQuestion().answer.substring(0, i + 1);
    }
  }
  return getCurrentQuestion().answer;
}

const HintButton = (props) => {
  const setInputFocus = useLessonInputFocus()[1];

  return (
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

        props.dispatch({
          type: "LESSON_UPDATE_INPUT",
          input: calculateHintInput(props.input),
        });
        props.dispatch({ type: "LESSON_UPDATE_ERROR", error: "" });
        setInputFocus();
      }}
    >
      <FontAwesomeIcon icon={faQuestionCircle} size="lg" color="grey" />
    </Button>
  )
}

const mapStateToProps = (state) => ({
  input: state.lessonInput,
});

export default connect(mapStateToProps)(HintButton);
