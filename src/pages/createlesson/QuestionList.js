import React from "react";
import { connect } from "react-redux";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { ListGroup, Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBars,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import store from "../../reducers/store";

const SortableItem = SortableElement(({ value }) => (
  <div>
    <ListGroup.Item as="li">{value}</ListGroup.Item>
  </div>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <ListGroup as="ul">
      {items.map((value, index) => {
        return (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={createQuestion(value.q, value.h, value.a, index)}
          />
        );
      })}
    </ListGroup>
  );
});

const createQuestion = (question, hint, answer, index) => {
  return (
    <Container className="ml-0 pl-0">
      <Row>
        <Col
          md={1}
          style={{
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
        >
          <FontAwesomeIcon icon={faBars} size="lg" color="grey" />
        </Col>
        <Col
          md={{ span: 6, offset: 0 }}
          style={{
            top: 0,
            bottom: 0,
            margin: "auto",
          }}
        >
          {`Question: ${question} Answer: ${answer} Hint: ${hint}`}
        </Col>
        <Col md={{ span: 4, offset: 1 }}>
          <Button
            size="sm"
            style={{
              width: "1em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="float-right"
            onClick={(e) => {
              store.dispatch({
                type: "CREATE_LESSON_TRASH_QUESTION",
                index,
              });
            }}
          >
            <FontAwesomeIcon icon={faTrash} size="lg" />
          </Button>
          <Button
            //@ts-ignore
            variant="outline"
            size="sm"
            style={{
              width: "1em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="float-right"
            onClick={(e) => {
              store.dispatch({ type: "UPDATE_NEW_QUESTION", question });
              store.dispatch({ type: "UPDATE_NEW_HINT", hint });
              store.dispatch({ type: "UPDATE_NEW_ANSWER", answer });
              store.dispatch({
                type: "CREATE_LESSON_UPDATE_EDIT_INDEX",
                index,
              });
              store.dispatch({
                type: "CREATE_LESSON_TRASH_QUESTION",
                index,
              });
            }}
          >
            <FontAwesomeIcon icon={faPencilAlt} size="lg" />
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

function SortableComponent({ items }) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    store.dispatch({
      type: "CREATE_LESSON_SWAP_QUESTION_INDICIES",
      oldIndex,
      newIndex,
    });
  };

  return <SortableList items={items} onSortEnd={onSortEnd} />;
}

const mapStateToProps = (state) => ({
  items: state.questionList,
});

export default connect(mapStateToProps)(SortableComponent);
