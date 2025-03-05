import React, { createContext, useContext, useEffect, useState } from 'react'
import { InitializedConsumptionContext } from './InitializeConsumptionModal';
import MachineParamsItem from './MachineParamsItem';
import MachineParamsForm from './MachineParamsForm';
import CarbonReportModal from './CarbonReportModal';
import { useSelector } from 'react-redux';
import { spring } from '../util';

export const MachineParamsInsertionContext = createContext();

const MachineParamsInsertionModal = () => {
    const { selectedMachines } = useContext(InitializedConsumptionContext);
    const [machines, setMachines] = useState(selectedMachines);
    const [machine, setMachine] = useState({});
    const [error, setError] = useState(false);
    const user = useSelector((state) => state.userState.user);
    const {name, items} = useSelector((state) => state.consumptionState);
    const selectMachine = (machine) => {
        setMachine(machine);
    }
    useEffect(() => {
        setMachines(selectedMachines.map((m) => { return { ...m, isSet: false } }))
    }, [selectedMachines]);

    const itemsAllSet = () => {
        return machines.every((m) => m.isSet);
    }

    const doneSettingMachines = () => {
    const doneSettingMachines = () => {
        if (!itemsAllSet()) setError(!error);

        else document.getElementById('ConfirmationModal').showModal();
    }

    const createConsumption = async () => {
        const data = {
            name: name,
            user,
            items
        }

        try {
            const response = await spring.post('/consumptions/post', data);
        } catch (error) {
            console.log(error);    
        }
        
        return response?.data?.consumption;
    }


    return (
        <MachineParamsInsertionContext.Provider value={{ setMachine, setMachines, machines }}>
            <div className='flex w-full justify-center'>
                <dialog id="MachineParamsInsertionModal" className="fixed inset-0 z-50 w-[90%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                    <h3 className="font-semibold tracking-widest italic text-lg mb-4">Machine Parameters Insertion</h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => {
                            document.getElementById('MachineParamsInsertionModal').close();
                        }}>✕
                    </button>


                    <div className='flex justify-center w-full'>
                        <div className='flex flex-col w-[35%] justify-center mt-10 border-r-4 border-secondary pr-4'>
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
                                    <p className='font-semibold text-sm tracking-wider italic'>You haven't set all the selected machines</p>
                                </div>
                            )}
                            <button type='button' className='btn btn-primary capitalize mt-4' onClick={doneSettingMachines}>done</button>
                        </div>
                        <MachineParamsForm machine={machine} />
                    </div>
                </dialog>
                <ConfirmationModal  createConsumption={createConsumption}/>
                <CarbonReportModal />
            </div>
        </MachineParamsInsertionContext.Provider>
    )
};

const ConfirmationModal = ({createConsumption}) => {

    return (
        <dialog id="ConfirmationModal" className="fixed inset-0 z-50 w-[38%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
            <section className='flex flex-col w-full items-center gap-10'>
                <h1 className='text-xl font-semibold tracking-wider'>Are you sure you're done setting your machines ?</h1>
                <div className='flex justify-between w-64'>
                    <button className='w-12 h-12 hover:scale-110 duration-200' title='yes'
                            onClick={() => {
                                createConsumption();
                                document.getElementById('ConfirmationModal').close();
                            }}>
                        <img src="/images/confirm.png" alt="confirm" className='object-cover' />
                    </button>
                    <button className='w-12 h-12 hover:scale-110 duration-200' title='no' onClick={() => document.getElementById('ConfirmationModal').close()}>
                        <img src="/images/cancel.png" alt="confirm" className='object-cover' />
                    </button>
                </div>
            </section>
        </dialog>
    )
}

export default MachineParamsInsertionModal;