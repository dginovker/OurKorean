import React, { useRef } from "react";
import { connect } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";
import store from "../../reducers/store";

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const NewQuestion = ({ newQuestion, newHint, newAnswer }) => {

  const [questionInputRef, setInputFocus] = useFocus();

  const addQuestion = () => {
    store.dispatch({
      type: "CREATE_LESSON_ADD_QUESTION",
      question: {
        q: newQuestion,
        a: newAnswer,
        h: newHint,
      },
      index: store.getState().createLessonEditIndex
    });
    store.dispatch({ type: "UPDATE_NEW_QUESTION", question: "" });
    store.dispatch({ type: "UPDATE_NEW_HINT", hint: "" });
    store.dispatch({ type: "UPDATE_NEW_ANSWER", answer: "" });
    store.dispatch({ type: "CREATE_LESSON_UPDATE_EDIT_INDEX", index: null })
    // @ts-ignore
    setInputFocus();
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addQuestion();
    }
  };

  return (
    <>
      <h3 className="mt-4">Questions</h3>
      <Card className="pt-2 pb-2 pl-2 pr-2 mt-3 mb-5">
        <h4>New</h4>
        <Form>
          <Form.Group>
            <Form.Label>Korean word</Form.Label>
            <Form.Control
              placeholder="눈"
              ref={questionInputRef}
              onKeyPress={onEnter}
              onChange={(e) => {
                store.dispatch({
                  type: "UPDATE_NEW_ANSWER",
                  answer: e.target.value,
                });
              }}
              value={newAnswer}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>English word</Form.Label>
            <Form.Control
              placeholder="Eyes"
              onKeyPress={onEnter}
              onChange={(e) => {
                store.dispatch({
                  type: "UPDATE_NEW_QUESTION",
                  question: e.target.value,
                });
              }}
              value={newQuestion}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Memory hint</Form.Label>
            <Form.Control
              placeholder="Two eyes = two n"
              onKeyPress={onEnter}
              onChange={(e) => {
                store.dispatch({
                  type: "UPDATE_NEW_HINT",
                  hint: e.target.value,
                });
              }}
              value={newHint}
            />
          </Form.Group>

          <Button
            variant="secondary"
            className="float-right mr-2"
            onClick={addQuestion}
          >
            Add Question
          </Button>
        </Form>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  newQuestion: state.newQuestion,
  newHint: state.newHint,
  newAnswer: state.newAnswer,
});

export default connect(mapStateToProps)(NewQuestion);
