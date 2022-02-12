import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth } from "../../firebase/firebaseapp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import LoginOutButton from "./LoginOutButton";

const Header = (props) => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-3">
        <Link to="/lessons">
          <Navbar.Brand className="mr-2">Korean Vocab</Navbar.Brand>
          <Navbar.Brand className="text-muted">
            <sup>BETA</sup>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Form inline>
            {props.user ? `Welcome, ${props.user.email}` : ""}
            <LoginOutButton />
            <Link
              to={
                useLocation().pathname === "/settings"
                  ? "/lessons"
                  : "/settings"
              }
            >
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
              >
                <FontAwesomeIcon icon={faCog} size="lg" color="grey" />
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>{" "}
      </Navbar>
    </>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(Header);
