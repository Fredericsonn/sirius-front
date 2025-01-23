import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import collectionReducer from "./features/collection/collectionSlice";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        collectionState: collectionReducer
    }
});