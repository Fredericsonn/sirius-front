import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    items: []
}

const consumptionSlice = createSlice({
    initialState,
    name: 'consumption',
    reducers: {
        addName: (state,action) => {
            const name = action.payload;
            state.name = name;
        },
        addItem: (state, action) => {
            const item = action.payload;
            state.items.push(item);
        },
        clearItems: (state) => {
            state.items = []
        }
    }
});

export const {addName, addItem, clearItems, saveMachines} = consumptionSlice.actions;

export default consumptionSlice.reducer;