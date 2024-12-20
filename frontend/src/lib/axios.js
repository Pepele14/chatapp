import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,  //sending cookies at every request
})