import React from "react";
import { connect } from "react-redux";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import store from "../../reducers/store";

function preview(name, genre, image) {
  return (
    <>
      <Card className="pt-2 pb-2 pl-2 pr-2">
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{genre}</Card.Text>
          <Button variant="primary">Launch</Button>
        </Card.Body>
      </Card>
      <Form.Text className="text-muted float-right">Preview</Form.Text>
    </>
  );
}

const Basics = ({ title, genre, image, video }) => {
  return (
    <Row>
      <Col md={5}>
        <Card className="pt-2 pb-2 pl-2 pr-2">
          <h3>Basics</h3>
          <Form>
            <Form.Group>
              <Form.Label>Name of lesson</Form.Label>
              <Form.Control
                placeholder="BTS - Spring Day"
                onChange={(e) => {
                  store.dispatch({ type: "CREATE_LESSON_UPDATE_TITLE", title: e.target.value });
                }}
                value={title}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => {
                  store.dispatch({
                    type: "CREATE_LESSON_UPDATE_GENRE",
                    genre: e.target.value,
                  });
                }}
                value={genre}
              >
                <option>Music</option>
                <option>Talkshow</option>
                <option>Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                placeholder="https://i.imgur.com/lKke1bE.jpg"
                onChange={(e) => {
                  store.dispatch({
                    type: "CREATE_LESSON_UPDATE_IMAGE",
                    image: e.target.value,
                  });
                }}
                value={image}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Youtube URL</Form.Label>
              <Form.Control
                placeholder="https://www.youtube.com/watch?v=-WB2xSyf_Lw"
                onChange={(e) => {
                  store.dispatch({
                    type: "CREATE_LESSON_UPDATE_VIDEO",
                    video: e.target.value,
                  });
                }}
                value={video}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Card>
      </Col>
      <Col md={{ span: 4, offset: 3 }}>{preview(title, genre, image)}</Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  title: state.createLessonTitle,
  genre: state.createLessonGenre,
  image: state.createLessonImage,
  video: state.createLessonVideo,
});

export default connect(mapStateToProps)(Basics);
