import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import store from "../../reducers/store";
import { connect } from "react-redux";
import { loadCards } from "./utils";
import LoadingMessage from "./LoadingMessage";

const Search = ({ filter, showUnofficial }) => {
  return (
    <Form className="mb-4">
      <Form.Group controlId="filterForm">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="search"
          placeholder="Search"
          onChange={(e) => {
            store.dispatch({
              type: "SPLASH_SEARCH_UPDATE",
              value: e.target.value,
            });
          }}
          value={filter}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        />
        <Row className="pt-2">
          <Col>
            <LoadingMessage />
          </Col>
          <Col>
            <Form.Check
              className="float-right"
              type="switch"
              id="unofficial-switch"
              label="Include user submitted"
              value={showUnofficial}
              defaultChecked={showUnofficial}
              onChange={(e) => {
                store.dispatch({
                  type: "SPLASH_UNOFFICIAL_TOGGLE",
                  value: e.target.checked,
                });
                loadCards(false);
              }}
            />
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  filter: state.lessonsSearchFilter,
  showUnofficial: state.lessonsShowUnofficial,
});

export default connect(mapStateToProps)(Search);
