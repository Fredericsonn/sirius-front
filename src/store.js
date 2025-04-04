import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import collectionReducer from "./features/collection/collectionSlice";
import consumptionReducer from "./features/consumption/consumptionSlice";
import optimizationReducer from "./features/optimization/optimizationSlice";

export const store = configureStore({
    reducer: {
        userState: userReducer,
        collectionState: collectionReducer,
        consumptionState: consumptionReducer,
        optimizationState: optimizationReducer
    }
});