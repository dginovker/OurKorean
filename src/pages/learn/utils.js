import React from "react";
import store from "../../reducers/store";
import { updateUserDBObject, getUidFromNick } from "../../firebase/database";
import { Link } from "react-router-dom";

export const MAX_ANSWERS = 8; //The number of times you answer a question before you "learn" it
export const MIN_ANSWERS = 2; //The number of times you answer a question before you level up
export const MAX_TRIES = 3; //Number of times you answer before it decides you don't know it
export const QUESTIONS_PER_LEVEL = 3;
export const MAX_LEARN_WORDS_PER_DAY = 5;

export function isAQuestion() {
  return Number.isInteger(store.getState().questionIndex);
}

export function getCurrentQuestion() {
  return store.getState().questions[store.getState().questionIndex];
}

/**
 * Checks if two ms represented timestamps were on the same day
 * @param {string | number} ms1
 * @param {string | number} ms2
 */
export function isDifferentDate(ms1, ms2) {
  ms1 = Number.parseInt(`${ms1}`);
  ms2 = Number.parseInt(`${ms2}`);
  if (ms1 === 0 || ms2 === 0) {
    return true;
  }

  return !(
    new Date(ms1).toString().substr(4, 11) ===
    new Date(ms2).toString().substr(4, 11)
  );
}

export function getPlaceholderAnswer() {
  return isAQuestion()
    ? getCurrentQuestion().answeredCount === 0
      ? `Type: ${getCurrentQuestion().answer}` //Show them the answer since they're learning
      : "Answer"
    : "Congrats!";
}

export function getQuestionAnswer() {
  return isAQuestion()
    ? getCurrentQuestion().answer
    : "There is no answer, since there is no question!";
}

export function isLessonInputCorrect(
  input = store.getState().lessonInput,
  answer = getQuestionAnswer()
) {
  answer = `${answer}`.replace(/( )*$/, ""); // Remove any trailing spaces on the answer...
  return new RegExp(`^${answer}( )*$`).test(input);
}

export function saveLearnInDB() {
  function writeLearnToDB(songpath) {
    const answeredCount = getCurrentQuestion().answeredCount + 1; //Db write takes time, so make sure we get the original
    updateUserDBObject(`${songpath}/answers/${getCurrentQuestion().id}`, {
      answeredCount,
      answeredTime: Date.now(),
    });

    const learnedToday = {
      wordsLearnedToday: store.getState().lessonNewWordsLearnedToday,
      whenTodayWas: store.getState().lessonLastSessionStartTime,
    };
    updateUserDBObject(`learning/learnedToday/`, {
      ...learnedToday,
    });
  }

  if (!store.getState().user.nick) {
    return;
  }

  if (!store.getState().lessonAuthor) {
    writeLearnToDB(
      `learning/songs/official/${store.getState().lessonLessonName}`
    );
  } else {
    getUidFromNick(store.getState().lessonAuthor, (uid) => {
      writeLearnToDB(
        `learning/songs/unofficial/${uid}/${store.getState().lessonLessonName}`
      );
    });
  }
}

export const spacedRepTimesInSec = [
  0,
  0,
  30 * 60,
  2 * 3600,
  6 * 3600,
  24 * 3600,
  72 * 3600,
  240 * 3600,
];

export function getTimeUntilNextQuestion() {
  let min = 9999999;
  const now = Date.now();

  store.getState().questions.forEach((q) => {
    if (q.answeredCount > 0) {
      //You don't have to wait for new words
      if (
        spacedRepTimesInSec[q.answeredCount] - (now - q.answeredTime) / 1000 <
        min
      ) {
        min =
          spacedRepTimesInSec[q.answeredCount] - (now - q.answeredTime) / 1000;
      }
    }
  });

  return min < 0 ? 0 : min;
}

function isNotPreviousQuestion(id) {
  return store.getState().questionIndex !== id;
}
function isLessThanMaxAnswers(answeredCount) {
  return answeredCount <= MAX_ANSWERS;
}
function questionWithinSpacedRep(question) {
  if (!question.answeredTime) {
    return true; //They've never answered before
  }

  const secsSince = Math.floor((Date.now() - question.answeredTime) / 1000);

  if (secsSince >= spacedRepTimesInSec[question.answeredCount]) {
    return true;
  }

  return false;
}
function newQsOnlyIfNotMaxLearned(answeredCount) {
  return !(
    (
      answeredCount === 0 &&
      store.getState().lessonNewWordsLearnedToday >= MAX_LEARN_WORDS_PER_DAY && //At max words/day
      !isDifferentDate(Date.now(), store.getState().lessonLastSessionStartTime)
    ) //Same day
  );
}

/**
 * Get list of questions
 * Filter out previous question
 * Filter out all questions >= MAX_ANSWERS
 * Filter out questions that aren't ready for spaced rep
 * Filter out questions with 0 answers if you've learned > MAX_WORDS_PER_DAY words today
 *
 * If there's a question answered 1 time, give a 50% chance of returning it
 * Select a random question in list
 * If it's an unseen question, reselect the first unseen question in the list
 * Return the selected question
 */
export function getNewQuestion() {
  const candidateQuestions = store
    .getState()
    .questions.filter(
      (question) =>
        isNotPreviousQuestion(question.id) &&
        isLessThanMaxAnswers(question.answeredCount) &&
        questionWithinSpacedRep(question) &&
        newQsOnlyIfNotMaxLearned(question.answeredCount)
    );

  if (candidateQuestions.length === 0) {
    return null;
  }

  let indexInCandidate = null;

  // If there's a question answered 1 time, give a 50% chance of returning it
  candidateQuestions.forEach((q, index) => {
    if (q.answeredCount === 1 && Math.random() > 0.5) {
      indexInCandidate = index;
    }
  });

  indexInCandidate = indexInCandidate
    ? indexInCandidate
    : Math.floor(Math.random() * candidateQuestions.length);

  // If it's an unseen question, reselect the first unseen question in the list
  if (candidateQuestions[indexInCandidate].answeredCount === 0) {
    for (let i = 0; i < candidateQuestions.length; i++) {
      if (candidateQuestions[i].answeredCount === 0) {
        indexInCandidate = i;
        break;
      }
    }
  }

  //Match the indexInCandidate to the index in the unfiltered question list
  for (const q of store.getState().questions) {
    if (q.answer === candidateQuestions[indexInCandidate].answer) {
      return q.id;
    }
  }
}

export function getLevel() {
  const learnedQuestions = store
    .getState()
    .questions.filter((question) => question.answeredCount >= MIN_ANSWERS);

  return Math.floor(learnedQuestions.length / QUESTIONS_PER_LEVEL) + 1;
}

export function containsRom(string) {
  return /[A-z]/.test(string);
}

export function getError() {
  let input = store.getState().lessonInput;

  if (!input || input.length === 0) {
    store.dispatch({
      type: "LESSON_UPDATE_ERROR",
      error: "An answer is required!",
    });
  } else if (containsRom(input)) {
    store.dispatch({
      type: "LESSON_UPDATE_ERROR",
      error: "KEYBOARD",
    });
  } else if (!isLessonInputCorrect()) {
    if (store.getState().lessonNumberOfTimesWrong >= MAX_TRIES) {
      store.dispatch({ type: "LESSON_UPDATE_REVIEW", review: true });
    } else {
      store.dispatch({
        type: "LESSON_UPDATE_ERROR",
        error: "Not quite - Delete it and try again!",
      });
      store.dispatch({ type: "LESSON_INC_NUM_TIMES_WRONG" });
    }
  }
}

export function displayError(error) {
  if (error === "KEYBOARD") {
    return (
      <>
        {"Use a Korean keyboard! "}
        <Link to="/help/keyboard">How?</Link>
      </>
    );
  }

  return <>{error}</>;
}

export function submitAnswer() {
  if (store.getState().lessonReview) {
    if (isLessonInputCorrect()) {
      store.dispatch({
        type: "LESSON_ANSWER_QUESTION",
        answer: store.getState().lessonInput,
        time: Date.now(),
      });
    }
    store.dispatch({ type: "LESSON_UPDATE_REVIEW", review: false });
    store.dispatch({ type: "LESSON_UPDATE_INPUT", input: "" });
    store.dispatch({ type: "LESSON_RESET_NUM_TIMES_WRONG" });
    store.dispatch({ type: "LESSON_CONTINUE_BTN_TXT", text: "Submit" });
    store.dispatch({
      type: "LESSON_CHANGE_QUESTION_INDEX",
      id: getNewQuestion(),
    });
    store.dispatch({ type: "LESSON_UPDATE_ERROR", error: "" });
  } else {
    getError();

    if (
      isLessonInputCorrect() ||
      store.getState().numberOfTimesWrong >= MAX_TRIES
    ) {
      store.dispatch({ type: "LESSON_UPDATE_REVIEW", review: true });
    }
    if (isLessonInputCorrect() && getCurrentQuestion()) {
      if (getCurrentQuestion().answeredCount === 0) {
        store.dispatch({ type: "LESSON_INC_NEW_WORDS_LEARNED_TODAY" });
      }
      saveLearnInDB();
    }
  }
}
