export default (res, dispatch) => {
  if (res.data["Error Message"]) {
    dispatch({
      type: "ERROR",
      payload: "Please enter a valid symbol.",
    });
    return false;
  }

  if (res.data["Note"]) {
    dispatch({
      type: "ERROR",
      payload: "You are making too many requests. Try again in a minute.",
    });
    return false;
  }

  return true;
};
