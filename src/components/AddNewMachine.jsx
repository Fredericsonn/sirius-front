import React, { useEffect, useState } from 'react';
import CatalogHeader from './CatalogHeader';
import MachinesContainer from './MachinesContainer';
import { spring } from '../util';

const AddNewMachine = () => {
    const [machines, setMachines] = useState([]);
    useEffect(() => async () =>{
        const response = await spring.get('/machines');
        const data = response.data;
        setMachines(data.vehicles.concat(data.devices))
    }, [])
    return (
        <div className='flex w-full justify-center'>
            <dialog id="addMachineModal" className="fixed inset-0 z-50 w-[60%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <h3 className="font-bold text-lg">Add Machines</h3>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => document.getElementById('addMachineModal').close()}>✕</button>
                <CatalogHeader />
                <MachinesContainer machines={machines} />
            </dialog>
        </div>
    )
}

export default AddNewMachine;