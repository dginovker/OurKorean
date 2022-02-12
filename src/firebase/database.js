import { database } from "./firebaseapp";
import store from "../reducers/store";
import request from "request";

function waitAndRecallIfNoUID(fnCameFrom, params) {
  if (!store.getState().user.uid) {
    const unsubscribe = store.subscribe(() => {
      if (store.getState().user.uid) {
        fnCameFrom(...params);
        unsubscribe(); //Todo: Add a timeout that does this anyways
      }
    });
  }
}

/**
 * Async fetches objName from the firebase DB, calling callback with the data
 *
 * @param {String} objName : Location + object to fetch from the database
 * @param {Function} callback : Function to call with that data
 *
 * @example
 * getDatabaseObject("songs", (data) => {konsole.log(data)});
 */
export function getDBObject(objName, callback) {
  let ref = database().ref(objName);
  ref.once("value").then((snapshot) => {
    callback(snapshot.val());
  });
}

export function getShallowDBObject(objName, callback) {
  request(
    {
      url: `https://ourkorean-56a3e.firebaseio.com/${objName}.json?shallow=true`,
    },
    (e, r, body) => {
      callback(JSON.parse(body));
    }
  );
}

/**
 * @param {string} objName
 * @param {Function} callback
 */
export function getUserDBObject(objName, callback) {
  waitAndRecallIfNoUID(getUserDBObject, [objName, callback]);

  getDBObject(`users/${store.getState().user.uid}/${objName}`, callback);
}

/**
 * Async set op on the database.
 * @param {string} dbObjName
 * @param {Object} objToWrite
 */
export function updateDBObject(dbObjName, objToWrite, callback = () => {}) {
  database().ref(dbObjName).update(objToWrite).then(callback);
}

/**
 * Async del op on the database.
 * @param {string} dbObjName
 */
export function removeDBObject(dbObjName, callback = () => {}) {
  database().ref(dbObjName).remove().then(callback);
}

/**
 * @param {string} dbObjName
 * @param {any} objToWrite
 */
export function updateUserDBObject(dbObjName, objToWrite) {
  waitAndRecallIfNoUID(getUserDBObject, [dbObjName, objToWrite]);

  updateDBObject(
    "users/" + store.getState().user.uid + "/" + dbObjName,
    objToWrite
  );
}

/**
 * @param {string} dbObjName
 * @param {{ (views: any): any; (arg0: any): any; }} functionToRun
 */
export function transaction(dbObjName, functionToRun) {
  let ref = database().ref(dbObjName);
  ref.transaction((snapshot) => {
    return functionToRun(snapshot);
  });
}

/**
 * @param {any} nick
 * @param {{ (uid: any): void; (uid: any): void; (arg0: string): void; }} callback
 */
export function getUidFromNick(nick, callback) {
  //Todo: Cache this result?
  /**
   * @param {{ [x: string]: any; }} userNickObjs
   */
  getDBObject(`users/takennicks`, (userNickObjs) => {
    Object.keys(userNickObjs).forEach((uid) => {
      if (nick === userNickObjs[uid]) {
        callback(uid);
        return;
      }
    });
  });
}
