import axios from "axios";

// const baseURL = "https://localhost:8080";
const baseURL = "https://api.localhost";

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;