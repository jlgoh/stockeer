import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import stockReducer from "./stockReducer";

export default combineReducers({
  auth: authReducer,
  stocks: stockReducer,
  form: reduxForm,
});
