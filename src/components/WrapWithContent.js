import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Row, Col } from "react-bootstrap";

export default function WrapWithContent(jsxElement) {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>{jsxElement} </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
