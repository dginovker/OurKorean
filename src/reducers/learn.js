import { isLessonInputCorrect } from "../pages/learn/utils";

export function lessonError(state = "", action) {
  switch (action.type) {
    case "LESSON_UPDATE_ERROR":
      return action.error;
    default:
      return state;
  }
}

export function lessonInput(state = "", action) {
  switch (action.type) {
    case "LESSON_UPDATE_INPUT":
      return action.input;
    default:
      return state;
  }
}

export function lessonReview(state = false, action) {
  if (action.type === "LESSON_UPDATE_REVIEW") {
    return action.review;
  }
  return state;
}

export function lessonNumberOfTimesWrong(state = 1, action) {
  switch (action.type) {
    case "LESSON_INC_NUM_TIMES_WRONG":
      return state + 1;
    case "LESSON_RESET_NUM_TIMES_WRONG":
      return 1;
    default:
      return state;
  }
}

export function lessonAuthor(state = null, action) {
  switch (action.type) {
    case "LESSON_SET_AUTHOR":
      return action.author;
    default:
      return state;
  }
}

export function lessonLessonName(state = "", action) {
  if (action.type === "LESSON_SET_LESSON_NAME") {
    return action.lessonName;
  }

  return state;
}

export function questions(state = [], action) {
  switch (action.type) {
    case "LESSON_SET_QUESTIONS":
      return action.questions;
    case "LESSON_UPDATE_ANSWERED_COUNTS_TIMES":
      if (!action.qstatus) {
        //db was empty
        return state;
      }
      return state.map((question, index) => {
        if (action.qstatus[index]) {
          return {
            ...question,
            answeredCount: action.qstatus[index].answeredCount,
            answeredTime: action.qstatus[index].answeredTime,
          };
        }
        return question;
      });
    case "LESSON_ANSWER_QUESTION":
      return state.map((question) => {
        if (isLessonInputCorrect(action.answer, question.answer)) {
          return {
            ...question,
            answeredCount: question.answeredCount + 1,
            answeredTime: action.time,
          };
        }
        return question;
      });
    case "LESSON_SET_ANSWERED_COUNT":
      const questionToSetAnsweredCount = action.question;
      questionToSetAnsweredCount.answeredCount = action.answeredCount;
      return [...state, questionToSetAnsweredCount];
    default:
      return state;
  }
}

export function questionIndex(state = null, action) {
  switch (action.type) {
    case "LESSON_CHANGE_QUESTION_INDEX":
      return action.id;
    default:
      return state;
  }
}

export function youtubeVideoId(state = null, action) {
  switch (action.type) {
    case "CHANGE_VIDEO_ID":
      return action.id;
    default:
      return state;
  }
}

export function lessonNewWordsLearnedToday(state = 0, action) {
  switch (action.type) {
    case "LESSON_SET_NEW_WORDS_LEARNED_TODAY":
      return action.words;
    case "LESSON_INC_NEW_WORDS_LEARNED_TODAY":
      return state + 1;
    default:
      return state;
  }
}

export function lessonLastSessionStartTime(state = 0, action) {
  if (action.type === "LESSON_SET_LSST") {
    return action.lsst;
  }
  return state;
}

export function lessonQuestionPrompt(state = "", action) {
  if (action.type === "LESSON_SET_QUESTION_PROMPT") {
    return action.prompt;
  }
  return state;
}
