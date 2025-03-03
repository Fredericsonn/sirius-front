import React, { createContext, useContext, useState } from 'react'
import { InitializedConsumptionContext } from './InitializeConsumptionModal';
import MachineParamsItem from './MachineParamsItem';
import MachineParamsForm from './MachineParamsForm';

export const MachineParamsInsertionContext = createContext();

const MachineParamsInsertionModal = ({ consumption }) => {
    const { setSelectedMachines, selectedMachines } = useContext(InitializedConsumptionContext);
    const [machines, setMachines] = useState(selectedMachines);
    const [machine, setMachine] = useState({});
    const selectMachine = (machine) => {
        setMachine(machine);
    }

    console.log(machines);
    
    return (
        <MachineParamsInsertionContext.Provider value={{setMachine, setMachines}}>
            <div className='flex w-full justify-center'>
                <dialog id="MachineParamsInsertionModal" className="fixed inset-0 z-50 w-[90%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                    <h3 className="font-semibold tracking-widest italic text-lg mb-4">Machine Parameters Insertion</h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => {
                            document.getElementById('MachineParamsInsertionModal').close();
                        }}>✕
                    </button>
                    {/* <section className='flex flex-col justify-center items-center w-full'>
                    <h1 className='text-2xl'>Your consumptions produces:</h1>
                    <p className='font-bold text-2xl italic text-center text-secondary underline'>
                        {consumption ? consumption.totalCarbonEmitted : 570} KgCO2</p>
                </section> */}
                    <div className='flex justify-center w-full'>
                        <div className='flex w-[55%] justify-center mt-10'>
                            <div className='border-r-4 border-secondary pr-4'>
                                <h1 className='sectionTitle'>Your Selected Machines :</h1>
                                <section className='flex flex-wrap justify-start items-start gap-4 w-fit'>
                                    {machines.map((m) => {
                                        return (<MachineParamsItem key={m.id} machine={m} selectMachine={selectMachine}/>)
                                    }
                                    )}
                                </section>
                            </div>
                        </div>
                        <MachineParamsForm machine={machine} />
                    </div>

                </dialog>
            </div>
        </MachineParamsInsertionContext.Provider>
    )
}

export default MachineParamsInsertionModal;