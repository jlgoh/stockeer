import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import stockReducer from "./stockReducer";
import bookmarkReducer from "./bookmarkReducer";

export default combineReducers({
  auth: authReducer,
  sidebar: (state = false, action) => {
    if (action.type === "TOGGLE_SIDEBAR") return action.payload;
    return state;
  },
  stocks: stockReducer,
  bookmarks: bookmarkReducer,
  form: reduxForm,
});
