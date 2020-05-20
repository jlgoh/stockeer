export default (state = null, action) => {
  switch (action.type) {
    case "FETCH_USER":
      return action.payload || false; //Return false if user is logged out
    default:
      return state; //Return null if booting up
  }
};
