export function user (state = { uid: null, nick: null }, action) {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        uid: action.uid ? action.uid : state.uid,
        nick: action.nick ? action.nick : state.nick,
      };
    case "NEW_USER":
      return {
        ...state,
        newUser: true,
        nick: action.nick
      }
    default:
      return state;
  }
};