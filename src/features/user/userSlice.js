import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const getLocalUser = () => {
    return JSON.parse(localStorage.getItem('user')) || null;
};

const initialState = {
    user: getLocalUser()
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state,action) => {
            const loggedUser = {...action.payload.user};
            
            state.user = loggedUser;
            toast.success('Logged in successfully !', {autoClose: 1000});
            localStorage.setItem('user', JSON.stringify(loggedUser));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            toast.success("Logged out", {autoClose: 1000});
            redirect('/');
        }
    }
});

export const {login, logout} = userSlice.actions;

export default userSlice.reducer;