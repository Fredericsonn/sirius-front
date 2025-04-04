import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    consumptionId: 0,
    frequencyConstraints: [],
    budget: 0,
    carbonReductionPercentageCi: 0
}

const optimizationSlice = createSlice({
    initialState,
    name: 'optimization',
    reducers: {
        saveItem: (state, action) => {
            const payload = action.payload;

            state.frequencyConstraints.push(payload);
        },

        saveDetails: (state, action) => {
            const payload = action.payload;

            const {consumptionId, budget, carbonReductionPercentageCi} = payload;

            state.consumptionId = consumptionId;
            state.budget = budget;
            state.carbonReductionPercentageCi = carbonReductionPercentageCi;
        },

        clearItems: (state) => {
            state = initialState;
        }
    }
});

export const {saveItem, saveDetails, clearItems} = optimizationSlice.actions;

export default optimizationSlice.reducer;