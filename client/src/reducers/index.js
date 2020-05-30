import { combineReducers } from "redux";
import authReducer from "./authReducer";
import stockReducer from "./stockReducer";
import bookmarkReducer from "./bookmarkReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  sidebar: (state = false, action) => {
    if (action.type === "TOGGLE_SIDEBAR") return action.payload;
    return state;
  },
  stocks: stockReducer,
  bookmarks: bookmarkReducer,
  search: searchReducer,
});
