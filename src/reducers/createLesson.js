import arrayMove from "array-move";

export function createLessonTitle(state = "", action) {
  switch (action.type) {
    case "CREATE_LESSON_UPDATE_TITLE":
      return action.title;
    default:
      return state;
  }
}

export function createLessonGenre(state = "Music", action) {
  switch (action.type) {
    case "CREATE_LESSON_UPDATE_GENRE":
      return action.genre;
    default:
      return state;
  }
}

export function createLessonImage(state = "", action) {
  switch (action.type) {
    case "CREATE_LESSON_UPDATE_IMAGE":
      return action.image;
    default:
      return state;
  }
}

export function createLessonVideo(state = "", action) {
  switch (action.type) {
    case "CREATE_LESSON_UPDATE_VIDEO":
      return action.video;
    default:
      return state;
  }
}

export function newQuestion(state = "", action) {
  switch (action.type) {
    case "UPDATE_NEW_QUESTION":
      return action.question;
    default:
      return state;
  }
}

export function newHint(state = "", action) {
  switch (action.type) {
    case "UPDATE_NEW_HINT":
      return action.hint;
    default:
      return state;
  }
}

export function newAnswer(state = "", action) {
  switch (action.type) {
    case "UPDATE_NEW_ANSWER":
      return action.answer;
    default:
      return state;
  }
}

export function questionList(state = [], action) {
  let newState;
  switch (action.type) {
    case "CREATE_LESSON_ADD_QUESTION":
      newState = [...state, action.question];
      if (action.index) {
        newState = arrayMove(newState, newState.length - 1, action.index);
      }
      return newState;
    case "CREATE_LESSON_TRASH_QUESTION":
      newState = [...state];
      newState.splice(action.index, 1);
      return newState;
    case "CREATE_LESSON_SWAP_QUESTION_INDICIES":
      newState = [...state];
      newState = arrayMove(newState, action.oldIndex, action.newIndex);
      return newState;
    case "CREATE_LESSON_LESSON_SET_QUESTIONS":
      return action.questions;
    default:
      return state;
  }
}

export function createLessonLoadModal(state = false, action) {
  if (action.type === "CREATE_LESSON_UPDATE_LOAD_MODAL") {
    return action.showLoadModal;
  }
  return state;
}

export function createLessonLoadModalData(state = [], action) {
  if (action.type === "CREATE_LESSON_UPDATE_LOAD_MODAL_DATA") {
    return action.data;
  }
  return state;
}

export function createLessonDeleteModal(state = false, action) {
  if (action.type === "CREATE_LESSON_UPDATE_DELETE_MODAL") {
    return action.showDeleteModal;
  }
  return state;
}

export function createLessonDeleteSongname(state = "", action) {
  switch (action.type) {
    case "CREATE_LESSON_UPDATE_DELETE_SONGNAME":
      return action.songname;
    case "CREATE_LESSON_WIPE_DELETE_SONGNAME":
      return "";
    default:
      return state;
  }
}

export function createLessonEditIndex(state = null, action) {
  if (action.type === "CREATE_LESSON_UPDATE_EDIT_INDEX") {
    return action.index;
  }
  return state;
}

export function createLessonSaveBtnTxt(state = "Save", action) {
  if (action.type === "CREATE_LESSON_SET_SAVE_BTN_TXT") {
    return action.text;
  }
  return state;
}