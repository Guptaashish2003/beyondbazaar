import axios from "axios";

// Server URL
const axiosBaseUrl = axios.create({baseURL: process.env.BASEURL});

export default axiosBaseUrl;
