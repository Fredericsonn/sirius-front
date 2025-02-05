import axios from "axios";

export const spring = axios.create({
    baseURL: import.meta.env.VITE_API
});

export const removeDuplicates = (arr) => {
    return [...new Set(arr)];
  }