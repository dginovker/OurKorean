import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import store from "../../reducers/store";

export function enterEmailFormGroup(email, setEmail) {
  return (
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
  );
}

export function enterPasswordFormGroup(password, setPassword) {
  return (
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
    </Form.Group>
  );
}

function Timeout() {
  const [timeoutWarn, setTimeoutWarn] = useState(false);
  const history = useHistory();

  setTimeout(() => {
    setTimeoutWarn(true);
  }, 5000);

  return timeoutWarn ? (
    <>
      {" "}
      <div className="alert alert-warning" role="alert">
        Taking too long? Your browser likely blocks the Google request made
        during authorization.
        <br /> Try creating an account with email and password instead.
        <br />
        <Button
          onClick={() => {
            window.sessionStorage.setItem("attemptedlog", "false");
            history.go();
          }}
        >
          Go Back
        </Button>
      </div>
    </>
  ) : (
    <></>
  );
}

export function centerBox(jsxobjectToBeInside, user) {
  if (user) {
    return <Redirect to={store.getState().startingPage} />;
  }

  if (window.sessionStorage.getItem("attemptedlog") === "true") {
    return (
      <>
        <Timeout />
        Logging in... Please wait
      </>
    );
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Card style={{ width: "28rem" }} className="pt-2 pb-2 pl-2 pr-2">
            {jsxobjectToBeInside}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
