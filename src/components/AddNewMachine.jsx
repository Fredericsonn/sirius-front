import React, { useEffect, useState } from 'react';
import MachinesContainer from './MachinesContainer';
import { spring } from '../util';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearMachines } from '../features/collection/collectionSlice';
import { redirect } from 'react-router-dom';

const AddNewMachine = ({ collectionId, existingMachines, collectionName }) => {
    let machinesToBeAdded = useSelector((state) => state.collectionState).machines;

    const user = useSelector((state) => state.userState).user;
    const [machines, setMachines] = useState([]);
    const dispatch = useDispatch();

    const saveMachines = async () => {
        dispatch(clearMachines());
        machinesToBeAdded = machinesToBeAdded.concat(existingMachines);
        machinesToBeAdded = machinesToBeAdded.map((machine) => {
           
            return {
                ...machine,
                type: machine.usage === 'TRANSPORT' ? 'Vehicle' : 'Device'
            };
        });

        const data = { id: collectionId, name: collectionName, user, machines: machinesToBeAdded };        
        try {
            const response = await spring.post('/users/collections/post', data);
            const { msg } = response.data;
            toast.success('machines added successfully', { autoClose: 2000 });
            dispatch(clearMachines());
            redirect('/tracer/collections/' + collectionName)
        } catch (error) {
            const errorMesssage = error?.response?.data?.error?.message || 'Server Error';
            toast.error(errorMesssage);
        }

        document.getElementById('addMachineModal').close();
    }
    useEffect(() => {
        const ids = existingMachines.map((m) => m.id);
        const getMachines = async () => {
            try {
                const response = await spring.get('/machines');
                let machines = response.data.vehicles.concat(response.data.devices);
                machines = machines.filter((machine) => !ids.includes(machine.id));
                setMachines(machines);
            } catch (error) {
                console.error("Error geting machines:", error);
            }
        };

        getMachines();
    }, []);

    return (
        <div className='flex w-full justify-center'>
            <dialog id="addMachineModal" className="fixed inset-0 z-50 w-[%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <h3 className="font-bold text-lg">Add Machines</h3>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        dispatch(clearMachines());
                        document.getElementById('addMachineModal').close();
                    }}>✕</button>
                <MachinesContainer machines={machines} isAdd={false} isSelection={true} />
                <div className='flex justify-center w-full'>
                    <button onClick={() => saveMachines()} className='btn btn-secondary btn-lg items-center mt-4'>DONE</button>
                </div>
            </dialog>
        </div>
    )
}

export default AddNewMachine;