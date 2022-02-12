export default (state = "", action) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.error;
    case "WIPE_ERROR":
      return "";
    default:
      return state;
  }
};
