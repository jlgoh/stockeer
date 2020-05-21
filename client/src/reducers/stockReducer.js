export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_DAILY_STOCK":
      return { ...action.payload, ...state };
    case "FETCH_INTRADAY_STOCK":
      return { ...action.payload, ...state };
    default:
      return state;
  }
};
