import axios from "axios";
import history from "../history";

//Fetch user
export const fetchUser = () => async (dispatch) => {
  const response = await axios.get("/api/current_user");

  dispatch({ type: "FETCH_USER", payload: response.data });
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
