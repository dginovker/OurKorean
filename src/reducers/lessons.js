export function lessonsCardInfos(state = [], action) {
  switch (action.type) {
    case "ADD_SPLASH_CARD_INFO":
      return [...state, ...action.lessonsCardInfos];
    default:
      return state;
  }
};

export function lessonsShowUnofficial(state = false, action) {
  switch (action.type) {
    case "SPLASH_UNOFFICIAL_TOGGLE":
      return action.value;
    default:
      return state;
  };
}

export function lessonsSearchFilter(state = "", action) {
  switch (action.type) {
    case "SPLASH_SEARCH_UPDATE":
      return action.value;
    default:
      return state;
  }
};

export function lessonsWarningBox(state = true, action) {
  switch (action.type) {
    case "LESSONS_DISABLE_WARNING_BOX":
      return false;
    default:
      return state;
  }
}
