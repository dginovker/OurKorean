import { getNewQuestion, isDifferentDate } from "./utils";
import {
  getDBObject,
  getUserDBObject,
  transaction,
  getUidFromNick,
} from "../../firebase/database";
import store from "../../reducers/store";

export function loadAndInitSong(author, songname) {
  function loadSongFrom(detailedPath, splashPath, userLoadPath) {
    // Load questions
    getDBObject(`${detailedPath}/questions`, (questions) => {
      //Todo: Test putting a delay on this, see if it breaks when getNewQuestion is called for a new user
      store.dispatch({
        type: "LESSON_SET_QUESTIONS",
        questions: questions.map((question, index) => {
          return {
            question: question.q,
            answer: question.a,
            hint: question.h,
            id: index,
            answeredCount: 0,
          };
        }),
      });

      //There's too many cases this wouldn't get called, I cba :joy:
      store.dispatch({
        type: "LESSON_CHANGE_QUESTION_INDEX",
        id: getNewQuestion(),
      });
    });

    //Load video
    getDBObject(`${splashPath}/vid`, (id) => {
      store.dispatch({
        type: "CHANGE_VIDEO_ID",
        id,
      });
    });

    // Load learned today
    getUserDBObject(`learning/learnedToday`, (snapshot) => {
      if (snapshot &&
        snapshot.wordsLearnedToday &&
        snapshot.whenTodayWas &&
        Number.isInteger(snapshot.wordsLearnedToday) &&
        Number.isInteger(snapshot.whenTodayWas) &&
        !isDifferentDate(Date.now(), snapshot.whenTodayWas)) {
        store.dispatch({
          type: "LESSON_SET_LSST",
          lsst: snapshot.whenTodayWas,
        });
        store.dispatch({
          type: "LESSON_SET_NEW_WORDS_LEARNED_TODAY",
          words: snapshot.wordsLearnedToday,
        });
      } else {
        store.dispatch({
          type: "LESSON_SET_LSST",
          lsst: Date.now(),
        });
        store.dispatch({
          type: "LESSON_SET_NEW_WORDS_LEARNED_TODAY",
          words: 0,
        });
      }
    });

    // Load question answers
    getUserDBObject(`${userLoadPath}`, (snapshot) => {
      if (snapshot && snapshot.answers) {
        store.dispatch({
          type: "LESSON_UPDATE_ANSWERED_COUNTS_TIMES",
          qstatus: snapshot.answers,
        });
      }
      store.dispatch({
        type: "LESSON_CHANGE_QUESTION_INDEX",
        id: getNewQuestion(),
      });
    });

    //Inc views
    transaction(`${splashPath}/views`, (views) => {
      if (!views) {
        views = 0;
      }
      return views + 1;
    });
  }

  store.dispatch({ type: "LESSON_SET_AUTHOR", author: author ? author : null });
  store.dispatch({ type: "LESSON_SET_LESSON_NAME", lessonName: songname });

  if (!author) {
    loadSongFrom(
      `songs/official/detailed/${songname}`,
      `songs/official/splash/${songname}`,
      `learning/songs/official/${songname}`
    );
  } else {
    getUidFromNick(author, (uid) => {
      loadSongFrom(
        `songs/unofficial/${uid}/detailed/${songname}`,
        `songs/unofficial/${uid}/splash/${songname}`,
        `learning/songs/unofficial/${uid}/${songname}`
      );
    });
  }
}
