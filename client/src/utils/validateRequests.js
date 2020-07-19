export default (res, dispatch) => {
  if (!res.data.data.length) {
    dispatch({
      type: "ERROR",
      payload: "Stock data not available in marketstack API.",
    });
    return false;
  }

  return true;
};
