import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_BOOKMARKS":
      return { ...state, ...action.payload };
    case "DELETE_BOOKMARK":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
