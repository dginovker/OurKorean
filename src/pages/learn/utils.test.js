import {
  getNewQuestion,
  MAX_LEARN_WORDS_PER_DAY,
  MAX_ANSWERS,
  spacedRepTimesInSec,
  isDifferentDate,
  isLessonInputCorrect
} from "./utils";
import store from "../../reducers/store";

function generateFakeQuestions(answeredCount = 0) {
  let qlist = [];
  for (let i = 0; i < 10; i++) {
    qlist.push({
      question: `${i}`,
      answer: `${i}`,
      hint: `${i}`,
      id: i,
      answeredCount,
      answeredTime: 0,
    });
  }
  return qlist;
}

function run10times(toRun) {
  for (let i = 0; i < 10; i++) {
    toRun();
  }
}

describe("Extensive test for getNewQuestion", () => {
  beforeEach(() => {
    store.dispatch({
      type: "LESSON_SET_QUESTIONS",
      questions: generateFakeQuestions(),
    });
    store.dispatch({ type: "LESSON_SET_NEW_WORDS_LEARNED_TODAY", words: 0 });
    store.dispatch({ type: "LESSON_CHANGE_QUESTION_INDEX", id: -1 });
    store.dispatch({ type: "LESSON_SET_LSST", lsst: 0 });
  });

  it("Returns id 0 if no questions have been seen yet", () => {
    run10times(() => {
      expect(store.getState().questions[getNewQuestion()].id).toBe(0);
    });
  });

  it("Will return only questions to review if we're at max words learned today", () => {
    run10times(() => {
      let qlist = [];
      for (let i = 0; i < 10; i++) {
        qlist.push({
          question: `${i}`,
          answer: `${i}`,
          hint: `${i}`,
          answeredCount: Math.floor(Math.random() * 2),
          id: i,
        });
      }

      store.dispatch({
        type: "LESSON_SET_QUESTIONS",
        questions: qlist,
      });
      store.dispatch({
        type: "LESSON_SET_NEW_WORDS_LEARNED_TODAY",
        words: MAX_LEARN_WORDS_PER_DAY,
      });
      store.dispatch({ type: "LESSON_SET_LSST", lsst: Date.now() });

      run10times(() => {
        const question = store.getState().questions[getNewQuestion()];

        expect(question.answeredCount).toBe(1);
      });
    });
  });

  it("Will return null if we're at max words learned today & there's no questions to review", () => {
    store.dispatch({
      type: "LESSON_SET_NEW_WORDS_LEARNED_TODAY",
      words: MAX_LEARN_WORDS_PER_DAY,
    });
    store.dispatch({ type: "LESSON_SET_LSST", lsst: Date.now() });

    run10times(() => {
      expect(getNewQuestion()).toBe(null);
    });
  });

  it("Will return 0 if we're at max words learned, but that was actually for a different day", () => {
    run10times(() => {
      store.dispatch({
        type: "LESSON_SET_NEW_WORDS_LEARNED_TODAY",
        words: MAX_LEARN_WORDS_PER_DAY,
      });
      expect(store.getState().questions[getNewQuestion()].id).toBe(0);
    });
  });

  it("Will return 1 if the previous question was 0 and no questions have been seen yet", () => {
    store.dispatch({ type: "LESSON_CHANGE_QUESTION_INDEX", id: 0 });
    run10times(() => {
      expect(store.getState().questions[getNewQuestion()].id).toBe(1);
    });
  });

  it("Will not return any questions outside their spaced rep time", () => {
    let qlist = [];
    for (let i = 0; i < 10; i++) {
      qlist.push({
        question: `${i}`,
        answer: `${i}`,
        hint: `${i}`,
        answeredCount: Math.floor(Math.random() * 8),
        id: i,
        answeredTime:
          Date.now() -
          Math.floor(
            Math.random() * spacedRepTimesInSec[MAX_ANSWERS - 1] * 1000
          ),
      });
    }

    store.dispatch({
      type: "LESSON_SET_QUESTIONS",
      questions: qlist,
    });

    run10times(() => {
      const question = store.getState().questions[getNewQuestion()];

      expect(
        spacedRepTimesInSec[question.answeredCount] * 1000 <
          Date.now() - question.answeredTime
      ).toBe(true);
    });
  });
});

describe("Tests isDifferentDate()", () => {
  it("Should say 1598409472042 and 1595542048517 are different dates", () => {
    expect(isDifferentDate(1598409472042, 1595542048517)).toBe(true);
    expect(isDifferentDate("1598409472042", "1595542048517")).toBe(true);
  });
  
  it("Should say 1598409472042 and 1598409473042 are the same dates", () => {
    expect(isDifferentDate(1598409472042, "1598409473042")).toBe(false);
  });
});

describe("Tests isLessonInputCorrect()", () => {
  it(`Golden answer`, () => {
    expect(isLessonInputCorrect("a", "a")).toBe(true);
  });
  it(`Extra space in input`, () => {
    expect(isLessonInputCorrect("a ", "a")).toBe(true);
  });
  it(`Extra space in answer`, () => {
    expect(isLessonInputCorrect("새됐지", "새됐지 ")).toBe(true);
  });
});