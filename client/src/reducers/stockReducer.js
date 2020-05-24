export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_DAILY_STOCK":
      return { ...state, ...action.payload, ERROR: false };
    case "FETCH_INTRADAY_STOCK":
      return { ...state, ...action.payload, ERROR: false };
    case "ERROR":
      return { ...state, ERROR: action.payload };
    default:
      return state;
  }
};
