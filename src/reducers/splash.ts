export function splashNumberOfLessons(state = null, action) {
  switch (action.type) {
    case "SPLASH_UPDATE_LESSONS":
      return action.lessons;
    default:
      return state;
  }
};

