export function startingPage(state = "/lessons", action) {
  switch (action.type) {
    case "UPDATE_STARTING_PAGE":
      return action.page;
    default:
      return state;
  }
}
