import React from "react";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import store from "../../reducers/store";

export function userSignedIn() {
  return <Redirect to={store.getState().startingPage} />;
}

export function goToOtherButton() {
  const signin = window.location.pathname === "/signin";

  return (
    <p className="text-right">
      {signin ? "Not signed up yet? " : "Already have an account? "}
      <Link to={signin ? "/signup" : "/signin"}>
        <Button variant="secondary" size="sm">
          {signin ? "Create an Account" : "Sign in"}{" "}
        </Button>
      </Link>
    </p>
  );
}
