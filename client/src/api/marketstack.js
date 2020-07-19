import axios from "axios";

export const marketstack = axios.create({
  baseURL: "/api/proxy",
});
