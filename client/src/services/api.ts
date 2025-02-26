import axios from "axios";

const API_URL =
    "http://ec2-3-35-11-25.ap-northeast-2.compute.amazonaws.com:4000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
