import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import { firebaseAppAuth } from "../../firebase/firebaseapp";
import { goToOtherButton, userSignedIn } from "./utils";
import {
  centerBox,
  enterEmailFormGroup,
  enterPasswordFormGroup,
} from "./SignInUpBox";
import ErrorMsg from "../../components/ErrorMsg";
import store from "../../reducers/store";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return centerBox(
    <Form>
      {goToOtherButton()}
      {enterEmailFormGroup(email, setEmail)}
      {enterPasswordFormGroup(password, setPassword)}
      <ErrorMsg />

      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          firebaseAppAuth
            .signInWithEmailAndPassword(email, password)
            .then((e) => {
              userSignedIn();
            })
            .catch((e) => {
              store.dispatch({ type: "SET_ERROR", error: e.message });
            });
        }}
      >
        Login
      </Button>
    </Form>,
    props.user
  );
};

export default withFirebaseAuth({
  firebaseAppAuth,
})(SignIn);
