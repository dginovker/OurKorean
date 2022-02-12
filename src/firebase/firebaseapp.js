import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import store from "../reducers/store";
import { updateDBObject, updateUserDBObject, getUserDBObject } from "./database";

export const config = {
  apiKey: "AIzaSyBzP-D-o-uUwXrmCiH5ftfL7eswdBvNUWo",
  authDomain: "ourkorean-56a3e.firebaseapp.com",
  databaseURL: "https://ourkorean-56a3e.firebaseio.com",
  projectId: "ourkorean-56a3e",
  storageBucket: "ourkorean-56a3e.appspot.com",
  messagingSenderId: "448050382473",
  appId: "1:448050382473:web:cf487f78b2797bd1402858",
  measurementId: "G-QYTXGFZE9W",
};

export const database = firebase.database;

export const firebaseAppAuth = firebase.initializeApp(config).auth();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch({ type: "UPDATE_USER", uid: user.uid });
    if (store.getState().user.newUser) {
      //On register
      updateDBObject("users/takennicks/", JSON.parse(`{"${user.uid}": "${store.getState().user.nick}"}`));
      updateUserDBObject("general/", {
        nick: store.getState().user.nick
      });
    } else {
      getUserDBObject("general/nick", (nick) => {
        store.dispatch({ type: "UPDATE_USER", nick });
      });
    }

  } else {
    //User has just signed out
  }
});
