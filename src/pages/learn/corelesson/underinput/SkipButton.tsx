import React from "react";
import { Button } from "react-bootstrap";
import { getCurrentQuestion, MAX_ANSWERS, getNewQuestion, saveLearnInDB } from "../../utils";
import store from "../../../../reducers/store";
import { useLessonInputFocus } from "../utils";

export default () => {
  const setInputFocus = useLessonInputFocus()[1];

  return (
    <Button
      className="mt-3 mb-2 mr-2 pl-3 pr-3"
      //@ts-ignore
      variant="outline"
      size="sm"
      onClick={() => {
        store.dispatch({
          type: "LESSON_SET_ANSWERED_COUNT",
          question: getCurrentQuestion(),
          answeredCount: MAX_ANSWERS + 1,
        });
        store.dispatch({
          type: "LESSON_CHANGE_QUESTION_INDEX",
          id: getNewQuestion(),
        });
        saveLearnInDB();
        setInputFocus();
      }}
    >
      Skip known word
    </Button>
  )
};
