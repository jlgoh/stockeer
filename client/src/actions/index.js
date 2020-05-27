import axios from "axios";
import history from "../history";
import _ from "lodash";
import alphavantage from "../api/alphavantage";
import { processData } from "../components/charts/utils";
import validateRequests from "../utils/validateRequests";
const keys = require("../config/keys");

//Update user's bookmark (note)
export const updateBookmark = (symbolName, bookmarkId, note) => async (
  dispatch
) => {
  const res = await axios.patch(`/api/bookmarks/${bookmarkId}`, { note });
  dispatch({ type: "FETCH_BOOKMARKS", payload: { [symbolName]: res.data } });
  return res;
};

//Delete user's bookmark
export const deleteBookmark = (symbolName, bookmarkId) => async (dispatch) => {
  await axios.delete(`/api/bookmarks/${bookmarkId}`);
  dispatch({
    type: "DELETE_BOOKMARK",
    payload: symbolName,
  });
};

//Get all of user's bookmarks
export const getBookmarks = () => async (dispatch) => {
  const res = await axios.get("/api/bookmarks");
  dispatch({
    type: "FETCH_BOOKMARKS",
    payload: _.keyBy(res.data, "symbolName"),
  });
};

//Add bookmark
export const addBookmark = (symbolName) => async (dispatch) => {
  const res = await axios.post("/api/bookmarks", { symbolName });
  dispatch({
    type: "FETCH_BOOKMARKS",
    payload: { [symbolName]: res.data },
  });
};

//Sidebar toggler
export const toggleSideBar = (visible) => (dispatch) => {
  dispatch({ type: "TOGGLE_SIDEBAR", payload: visible });
};

//Fetch user
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: "FETCH_USER", payload: res.data });
};

//GET Request to AlphaVantage API for Stock Prices(Daily or Intra)
export const fetchStock = (queryType, symbol) => async (dispatch) => {
  const param =
    queryType === "DAILY" ? "TIME_SERIES_DAILY" : "TIME_SERIES_INTRADAY";

  //Fetch daily stock data of a company
  if (param === "TIME_SERIES_DAILY") {
    const res = await alphavantage.get(
      `/query?outputsize=compact&apikey=${
        keys.alphaVantageKey
      }&symbol=${symbol.toUpperCase()}&function=${param}`
    );

    if (!validateRequests(res, dispatch)) return;

    dispatch({
      type: "FETCH_DAILY_STOCK",
      payload: { [`${symbol.toUpperCase()}_DAILY`]: processData(param, res) },
    });
  }

  //Fetch intraday stock data of a company
  else {
    const res = await alphavantage.get(
      `/query?interval=5min&apikey=${
        keys.alphaVantageKey
      }&symbol=${symbol.toUpperCase()}&function=${param}`
    );

    if (!validateRequests(res, dispatch)) return;

    dispatch({
      type: "FETCH_INTRADAY_STOCK",
      payload: {
        [`${symbol.toUpperCase()}_INTRADAY`]: processData(param, res),
      },
    });
  }
};

//Login
export const logIn = (formValues) => async (dispatch) => {
  try {
    const response = await axios.post("/api/login", formValues);
    dispatch({ type: "FETCH_USER", payload: response.data });
    const res = await axios.get("/api/bookmarks"); //Fetch bookmarks when logged in too
    dispatch({
      type: "FETCH_BOOKMARKS",
      payload: _.keyBy(res.data, "symbolName"),
    });
    history.push("/");
    return response;
  } catch (err) {
    return err.response;
  }
};

//Signup (not sent to the store)
export const signUp = async (formValues) => {
  try {
    const response = await axios.post("/api/signup", formValues);
    history.push("/");
    return response;
  } catch (err) {
    return err.response;
  }
};
