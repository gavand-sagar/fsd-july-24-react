import axios from "axios";
import { getToken } from "./utils";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        token: getToken()
    }
})