import _ from "lodash";

//null to differentiate between loading and empty bookamrks list
export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_BOOKMARKS":
      return state ? { ...state, ...action.payload } : { ...action.payload }; //On first load, null state return payload only
    case "DELETE_BOOKMARK":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
