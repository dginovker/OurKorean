import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth } from "../../firebase/firebaseapp";
import { Redirect } from "react-router-dom";
import {
  centerBox,
  enterEmailFormGroup,
  enterPasswordFormGroup,
} from "./SignInUpBox";
import ErrorMsg from "../../components/ErrorMsg";
import { goToOtherButton } from "./utils";
import { getDBObject } from "../../firebase/database";
import store from "../../reducers/store";

let retrievedNicks = null;

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  if (props.user) {
    return <Redirect to={store.getState().startingPage} />;
  }

  if (retrievedNicks === null) {
    retrievedNicks = [];
    getDBObject("users/takennicks/", (takenNicks) => {
      for (const property in takenNicks) {
        retrievedNicks.unshift(takenNicks[property]);
      }
    });
  }

  return centerBox(
    <Form>
      {goToOtherButton()}
      {enterEmailFormGroup(email, setEmail)}
      <Form.Group controlId="formNickName">
        <Form.Label>Nickname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nickname"
          value={nick}
          onChange={(e) => {
            setNick(e.target.value);
            if (retrievedNicks.includes(e.target.value)) {
              store.dispatch({
                type: "SET_ERROR",
                error: "That nickname is already taken!",
              });
            } else {
              store.dispatch({ type: "WIPE_ERROR" });
            }
          }}
        />
      </Form.Group>
      {enterPasswordFormGroup(password, setPassword)}
      <Form.Group controlId="passwordValidate ">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={confPassword}
          onChange={(e) => {
            setConfPassword(e.target.value);
          }}
        />
      </Form.Group>
      <ErrorMsg />
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (nick.length === 0) {
            store.dispatch({
              type: "SET_ERROR",
              error: "You must provide a nickname!",
            });
          } else {
            store.dispatch({ type: "NEW_USER", nick: nick });
            firebaseAppAuth
              .createUserWithEmailAndPassword(email, password)
              .catch((e) => {
                store.dispatch({ type: "SET_ERROR", error: e.message });
              });
          }
        }}
      >
        Create account
      </Button>
    </Form>,
    props.user
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(SignUp);
