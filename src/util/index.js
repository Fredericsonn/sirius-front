import axios from "axios";

export const spring = axios.create({
    baseURL: import.meta.env.VITE_API
});