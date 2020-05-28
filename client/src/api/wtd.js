import axios from "axios";

export default axios.create({
  baseURL: "https://api.worldtradingdata.com/api/v1",
});
