import rootReducer from "./index";
import { createStore } from "redux";

const store = createStore(rootReducer);

export default store;