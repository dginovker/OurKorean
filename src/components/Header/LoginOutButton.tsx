import React from "react";
import { Button } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth } from "../../firebase/firebaseapp";
import { Link, useLocation } from "react-router-dom";
import store from "../../reducers/store";

const LoginOutButton = (props) => {
  let url = useLocation().pathname;
  function encompassWithLink(jsxElement) {
    return props.user ? (
      jsxElement
    ) : (
      <Link to={url === "/signin" ? "/lessons" : "/signin"}>{jsxElement}</Link>
    );
  }

  return encompassWithLink(
    <Button
      variant="primary"
      size="sm"
      onClick={() => {
        window.sessionStorage.setItem("attemptedlog", "false");

        store.dispatch({
          type: "UPDATE_STARTING_PAGE",
          page: url,
        });

        if (props.user) {
          props.signOut();
        }
      }}
    >
      {props.user ? "Logout" : "Login/Signup"}
    </Button>
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(LoginOutButton);
