import axios from "axios";
import history from "../history";
import alphavantage from "../api/alphavantage";
import { processData } from "../components/charts/utils";

//Fetch user
export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/current_user");

  dispatch({ type: "FETCH_USER", payload: response.data });
};

//GET Request to AlphaVantage API for Stock Prices(Daily or Intra)
export const fetchStock = (queryType, symbol) => async (dispatch) => {
  const param =
    queryType === "DAILY" ? "TIME_SERIES_DAILY" : "TIME_SERIES_INTRADAY";

  //Fetch daily stock data of a company
  if (param === "TIME_SERIES_DAILY") {
    const res = await alphavantage.get(
      `/query?outputsize=compact&apikey=JK56BI96ZRSP0VQN&symbol=${symbol.toUpperCase()}&function=${param}`
    );
    dispatch({
      type: "FETCH_DAILY_STOCK",
      payload: { [`${symbol.toUpperCase()}_DAILY`]: processData(param, res) },
    });
  }

  //Fetch intraday stock data of a company
  else {
    const res = await alphavantage.get(
      `/query?interval=5min&apikey=JK56BI96ZRSP0VQN&symbol=${symbol.toUpperCase()}&function=${param}`
    );
    dispatch({
      type: "FETCH_INTRADAY_STOCK",
      payload: { [`${symbol.toUpperCase()}_INTRA`]: processData(param, res) },
    });
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

//Login (not sent to store)
export const logIn = async (formValues) => {
  try {
    const response = await axios.post("/api/login", formValues);
    history.push("/");
    return response;
  } catch (err) {
    return err.response;
  }
};
