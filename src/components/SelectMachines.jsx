import React, { useContext } from 'react'
import MachinesContainer from './MachinesContainer';
import { InitializedConsumptionContext } from './InitializeConsumptionModal';

const SelectMachines = ({machines}) => {
    
    const {setSelectedMachines, selectedMachines} = useContext(InitializedConsumptionContext);
    return (
        <div className='flex w-full justify-center'>
            <dialog id="selectMachinesModal" className="fixed inset-0 z-50 w-[75%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <h3 className="font-semibold tracking-wider text-lg mb-4">Select Machines</h3>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        document.getElementById('selectMachinesModal').close();
                    }}>✕
                </button>
                <MachinesContainer machines={machines} isSelection={true} selectedMachines={selectedMachines} setMachines={setSelectedMachines}/>
            </dialog>
        </div>
    )
}

export default SelectMachines;