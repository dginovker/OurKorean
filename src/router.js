import React from "react";
import Privacy from "./pages/privacy";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import WrapWithContent from "./components/WrapWithContent";
import Splash from "./pages/splash";
import Lessons from "./pages/lessons";
import SignIn from "./pages/account/SignIn";
import SignUp from "./pages/account/SignUp";
import Learning from "./pages/learn";
import Settings from "./pages/settings";
import CreateLesson from "./pages/createlesson";
import Help from "./pages/help";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Router = () => (
  <Switch>
    <Route exact path="/">
      {WrapWithContent(<Splash />)}
    </Route>
    <Route path="/lessons">
      {WrapWithContent(<Lessons />)}
    </Route>
    <Route path="/learn/official/:songname">
      {WrapWithContent(<Learning />)}
    </Route>
    <Route path="/learn/unofficial/:author/:songname">
      {WrapWithContent(<Learning />)}
    </Route>
    <Route path="/signin">{WrapWithContent(<SignIn />)}</Route>
    <Route path="/signup">{WrapWithContent(<SignUp />)}</Route>
    <Route path="/settings">{WrapWithContent(<Settings />)}</Route>
    <Route path="/privacy">{WrapWithContent(<Privacy />)}</Route>
    <Route path="/help/:article">{WrapWithContent(<Help />)}</Route>
    <Route path="/createlesson">{WrapWithContent(<CreateLesson />)}</Route>
  </Switch>
);

export default Router;
