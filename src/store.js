import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import collectionReducer from "./features/collection/collectionSlice";
import consumptionReducer from "./features/consumption/consumptionSlice";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        collectionState: collectionReducer,
        consumptionState: consumptionReducer
    }
});