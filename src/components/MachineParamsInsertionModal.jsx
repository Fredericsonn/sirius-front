import React, { createContext, useContext, useEffect, useState } from 'react'
import { InitializedConsumptionContext } from './InitializeConsumptionModal';
import MachineParamsItem from './MachineParamsItem';
import MachineParamsForm from './MachineParamsForm';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MachineParamsInsertionContext = createContext();

const MachineParamsInsertionModal = ({ consumption }) => {
    const { selectedMachines } = useContext(InitializedConsumptionContext);
    const [machines, setMachines] = useState(selectedMachines);
    const [machine, setMachine] = useState({});
    const [error, setError] = useState(false);
    const selectMachine = (machine) => {
        setMachine(machine);
    }
    useEffect(() => {
        setMachines(selectedMachines.map((m) => { return { ...m, isSet: false } }))
    }, [selectedMachines]);

    const itemsAllSet = () => {
        return machines.every((m) => m.isSet);
    }

    const createConsumption = () => {
        if (!itemsAllSet()) setError(!error);
    }
    return (
        <MachineParamsInsertionContext.Provider value={{ setMachine, setMachines, machines }}>
            <ToastContainer position="top-center" autoClose={3000} />
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
                        <div className='flex flex-col w-[55%] justify-center mt-10 border-r-4 border-secondary pr-4'>
                            <h1 className='sectionTitle'>Your Selected Machines :</h1>
                            <section className='flex flex-wrap justify-start items-start gap-4 w-fit'>
                                {machines.map((m) => {
                                    return (<MachineParamsItem key={m.id} machine={m} selectMachine={selectMachine} />)
                                }
                                )}
                            </section>
                            {error && (
                                <div className='flex justify-center items-center w-full gap-2 mt-2'>
                                    <img src="/images/error.png" alt="error" className='w-6 h-6 object-contain' />
                                    <p className='font-semibold text-sm tracking-wider italic'>you haven't set all the selected machines</p>
                                </div>
                            )}
                            <button type='button' className='btn btn-primary capitalize mt-4' onClick={createConsumption}>done</button>
                        </div>
                        <MachineParamsForm machine={machine} />
                    </div>

                </dialog>
            </div>
        </MachineParamsInsertionContext.Provider>
    )
}

export default MachineParamsInsertionModal;