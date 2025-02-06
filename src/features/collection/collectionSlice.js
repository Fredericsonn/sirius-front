import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    name: '',
    user: localStorage.getItem('user'),
    machines: []
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addMachine: (state, action) => {
            const machine = action.payload;
            state.machines.push(machine);
            
        },
        removeMachine: (state, action) => {
            const id = action.payload.id;
            state.machines = state.machines.filter((m) => m.id != id);
        },
        clearMachines: (state) => {
            state.machines = [];
        }
    }
});

export const {addMachine, removeMachine, clearMachines} = collectionSlice.actions;

export default collectionSlice.reducer;