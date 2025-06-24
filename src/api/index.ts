import axios from "axios";

export const instanceProducts = axios.create({
  baseURL: "http://localhost:3001/products",
});
