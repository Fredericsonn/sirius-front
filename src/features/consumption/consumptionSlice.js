import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    items: []
}

const consumptionSlice = createSlice({
    initialState,
    name: 'consumption',
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            state.items.push(item);
        },
        clearItems: (state) => {
            state.items = []
        }
    }
});

export const {addItem, clearItems, saveMachines} = consumptionSlice.actions;

export default consumptionSlice.reducer;