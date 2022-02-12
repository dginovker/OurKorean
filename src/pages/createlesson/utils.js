import {
  updateDBObject,
  getDBObject,
  removeDBObject,
} from "../../firebase/database";
import store from "../../reducers/store";
import request from "request";

export function saveSong() {
  window.sessionStorage.setItem("mostRecentCreateSong", store.getState().createLessonTitle);

  let vid = store.getState().createLessonVideo.split("=")[1];
  if (!vid) {
    vid = null;
  }

  updateDBObject(
    `songs/unofficial/${store.getState().user.uid}/splash/${
    store.getState().createLessonTitle
    }`,
    {
      genre: store.getState().createLessonGenre,
      image: store.getState().createLessonImage,
      author: store.getState().user.nick,
      vid,
    }
  );

  updateDBObject(
    `songs/unofficial/${store.getState().user.uid}/detailed/${
    store.getState().createLessonTitle
    }`,
    {
      questions: store.getState().questionList,
    },
    () => {
      store.dispatch({ type: "CREATE_LESSON_SET_SAVE_BTN_TXT", text: "Saved!" });
      setTimeout(
        () => {
          store.dispatch({ type: "CREATE_LESSON_SET_SAVE_BTN_TXT", text: "Save" });
        }, 1000);
    }
  );
}

export function publishSong() {
  saveSong();
  updateDBObject(
    `songs/unofficial/${store.getState().user.uid}/splash/${
    store.getState().createLessonTitle
    }`,
    {
      public: true,
    }
  );
}

export function loadSong(songName) {
  getDBObject(
    `songs/unofficial/${store.getState().user.uid}/splash/${songName}`,
    (splashData) => {
      store.dispatch({ type: "CREATE_LESSON_UPDATE_TITLE", title: songName });
      store.dispatch({ type: "CREATE_LESSON_UPDATE_GENRE", genre: splashData.genre });
      store.dispatch({ type: "CREATE_LESSON_UPDATE_IMAGE", image: splashData.image });
      store.dispatch({
        type: "CREATE_LESSON_UPDATE_VIDEO",
        video: splashData.vid
          ? `https://www.youtube.com/watch?v=${splashData.vid}`
          : "",
      });
    }
  );

  getDBObject(
    `songs/unofficial/${store.getState().user.uid}/detailed/${songName}`,
    (detailedData) => {
      store.dispatch({
        type: "CREATE_LESSON_LESSON_SET_QUESTIONS",
        questions: detailedData
          ? detailedData.questions
            ? detailedData.questions
            : []
          : [],
      });
    }
  );
}

export function loadSongFromStorage() {
  const lastSong = window.sessionStorage.getItem("mostRecentCreateSong");
  //Todo: Test going back to /createlesson refilling the input fields
  if (lastSong) {
    loadSong(lastSong);
  }
}

export function deleteSong() {
  removeDBObject(
    `songs/unofficial/${store.getState().user.uid}/detailed/${
    store.getState().createLessonDeleteSongname
    }`
  );

  removeDBObject(
    `songs/unofficial/${store.getState().user.uid}/splash/${
    store.getState().createLessonDeleteSongname
    }`,
    () => {
      loadSavedSongs();
    }
  );

  store.dispatch({
    type: "CREATE_LESSON_WIPE_DELETE_SONGNAME",
  });
}

export function validateInput(questions, name, image, video) {
  //Todo: Just read this from props
  let error = "";

  if (name.length < 5) {
    if (name.length === 0) {
      error += "A lesson name is required\n";
    } else {
      error += "A lesson name is too short! (Minimum 5 characters)\n";
    }
  }

  if (!video.includes("youtube.com/watch?v=")) {
    if (video.length === 0) {
      error += "A Youtube URL is required\n";
    } else {
      error += "Invalid Youtube video URL\n";
    }
  }

  if (!image.match(/\.(jpeg|jpg|gif|png)$/)) {
    if (image.length === 0) {
      error += "An image URL is required\n";
    } else {
      error += "Invalid Image URL\n";
    }
  }

  if (questions.length < 5) {
    error += "Minimum of 5 questions is required\n";
  }

  store.dispatch({ type: "SET_ERROR", error });
  return error;
}

export function loadSavedSongs() {
  // TODO: Move this to the database version
  request(
    {
      url: `https://ourkorean-56a3e.firebaseio.com/songs/unofficial/${
        store.getState().user.uid
        }/splash.json?shallow=true`,
    },
    (error, response, body) => {
      let rowData = [];
      Object.keys(JSON.parse(body)).forEach((songname) => {
        rowData.unshift(songname);
      });
      store.dispatch({
        type: "CREATE_LESSON_UPDATE_LOAD_MODAL_DATA",
        data: rowData,
      });
    }
  );
}
