import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:`${import.meta.env.VITE_SOME_KEY}/routes`,
    withCredentials: true,
});