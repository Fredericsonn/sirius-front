import { createSlice } from "@reduxjs/toolkit"
import { spring } from "../../util";
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
            machine.type = machine.usage === 'TRANSPORT' ?  'Vehicle' : 'Device';
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