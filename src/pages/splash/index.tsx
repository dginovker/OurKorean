import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Jumbotron, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import FeaturesList from "./FeaturesList";
import "./index.css";

function imageBanner(url) {
  return (
    <Image
      className="d-block pb-3 pl-1 pr-1"
      style={{
        width: "150px",
        height: "100px",
      }}
      src={url}
      alt="Banner images"
      rounded
    />
  );
}

function Splash() {
  return (
    <main>
      <div className="text-center pl-3 pr-3">
        <div
          className="hiddenscroll"
          style={{
            overflow: "scroll",
          }}
        >
          <span className="d-flex d-lg-inline-flex">
            {imageBanner("https://i.imgur.com/lKke1bE.jpg")}
            {imageBanner("https://i.imgur.com/qC9UGjJ.jpg")}
            {imageBanner("https://i.imgur.com/6C0yIpc.jpg")}
            {imageBanner("https://i.imgur.com/tA8D5Tk.png")}
          </span>
        </div>
      </div>

      <div>
        <div className="float-right">
          <a href="https://discord.gg/f4SAqGw">
            <FontAwesomeIcon
              icon={faDiscord}
              size="lg"
              color="grey"
              className="mt-3 mr-3"
            />
          </a>
        </div>
        <Jumbotron
          className="pl-5"
          style={{
            backgroundColor: "#F8F9FA",
          }}
        >
          <Container>
            <Row>
              <Col md={{ span: 6 }}>
                <h1>OurKorean</h1>
                <p>
                  The best way to learn languages through music
                  <br />
                </p>
                <div>
                  <Link to="/lessons">
                    <Button
                      size="lg"
                      className="mr-3 px-5"
                    >
                      Get started
                    </Button>
                  </Link>
                </div>
                <div className="text-muted mt-3">Current version: Beta-3</div>
              </Col>
              <Col md={{ span: 6 }}>
                <div className="d-sm-block d-md-none pt-4" />
                <h4>Some features..</h4>
                <FeaturesList />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>

      <Container>
        <Row>
          <Col sm>
            <h2>Content you love</h2>
            <p>
              We all know learning a language is hard. Sometimes you just need a
              little payoff for your learning - that's where we come in.
            </p>
            <p>
              If you listen to music in your new language, this is the solution
              for you. Easier and more meaningful lessons based on your favorite
              songs.
            </p>
          </Col>

          <Col sm>
            <h2>Spaced Repetition</h2>
            <p>
              OurKorean uses a research-backed spaced repeititon learning
              algorithm - meaning you get the most from your effort.
            </p>
            <p>
              Both spaced repetition and memorable sentences are the best ways
              to learn new vocab - which is why learning through Music so
              powerful.
            </p>
            <p />
          </Col>

          <Col sm>
            <h2>Community Driven</h2>

            <p>
              The content & lessons are created by the community. Want to add a
              new song? Sign up and head to the{" "}
              <Link to="/createlesson">Create Lesson</Link> page.
            </p>
            <p>
              I've created OurKorean simply because there was nothing like it
              out there - and it'll stay fresh so long as I listen to you.
              Discord, Reddit, or anywhere else - I'll be reading every
              suggestion.
            </p>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Splash;
