import { combineReducers } from "redux";
import * as user from "./user";
import * as lessons from "./lessons";
import * as createLessonReducers from "./createLesson";
import * as signInOut from "./signInOut";
import * as lessonReducers from "./learn";
import * as splash from "./splash";
import errorMsg from "./errorMsg";

export default combineReducers({
  errorMsg,
  ...user,
  ...lessonReducers,
  ...createLessonReducers,
  ...signInOut,
  ...splash,
  ...lessons
});
