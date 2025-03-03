import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearMachines } from '../features/collection/collectionSlice';
import { spring } from '../util';
import { SelectMachines, SelectCollections, MachinesContainer, FormInput, MachineParamsInsertionModal } from '../components';
import { saveMachines } from '../features/consumption/consumptionSlice';

export const InitializedConsumptionContext = createContext();

const InitializeConsumptionModal = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userState);
    const [collections, setCollections] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [selectedMachines, setSelectedMachines] = useState([]);
    const [consumtpionName, setConsumtpionName] = useState('')

    useEffect(() => {
        const fetchCollections = async () => {
            const response = await spring.get('/users/collections', { params: { userId: user.id } });
            const collections = response.data;
            setCollections(collections);
        };
        const fetchCatalog = async () => {
            const response = await spring.get('/machines');
            let machines = response.data.devices.concat(response.data.vehicles);
            const ids = selectedMachines.map((m) => m.id);
            machines = machines.filter((m) => !ids.includes(m.id));
            setCatalog(machines);
        }

        fetchCollections();
        fetchCatalog();
    }, []);

    return (
        <InitializedConsumptionContext.Provider value={{ setSelectedMachines, selectedMachines, consumtpionName }}>
            <div className='flex w-full justify-center'>
                <dialog id="initializeConsumption" className="fixed inset-0 z-50 w-[75%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                    <h3 className="font-semibold tracking-widest italic text-lg mb-4">Consumption Initialization</h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => {
                            dispatch(clearMachines());
                            document.getElementById('initializeConsumption').close();
                        }}>✕
                    </button>
                    <section className='flex flex-col w-full mb-4'>
                        <h1 className='text-2xl font-semibold italic tracking-wide capitalize'>1- consumption name</h1>
                        <FormInput type="text" placeholder={`"Kitchen", "Bedroom 1", "Living Room", ....`} size="lg" id="nameField"/>
                    </section>
                    <h1 className='sectionTitle'>2- Machines Selection</h1>
                    <section className='flex w-full justify-around mt-6 mb-6'>
                        <div className='flex flex-col items-center cursor-pointer hover:scale-110 duration-200'
                            onClick={() => document.getElementById('selectCollectionsModal').showModal()}>
                            <img src="/images/list.png" alt="collection" className='w-32 h-32' />
                            <p className='font-mono italic tracking-wide'>select from collections</p>
                        </div>
                        <div className='flex flex-col items-center cursor-pointer hover:scale-110 duration-200'
                            onClick={() => document.getElementById('selectMachinesModal').showModal()}>
                            <img src="/images/catalog.png" alt="catalog" className='w-32 h-32' />
                            <p className='font-mono italic tracking-wide'>select from catalog</p>
                        </div>
                    </section>
                    <div className='flex w-full justify-between'>
                        <h1 className='sectionTitle'>Selected Machines :</h1>
                        <button onClick={() => {
                            setSelectedMachines([]);
                            dispatch(clearMachines());
                        }} className='btn btn-secondary'>clear</button>
                    </div>
                    <MachinesContainer machines={selectedMachines} />
                    <div className='w-full flex justify-center'>
                        <button className='btn btn-primary uppercase mt-4'
                                onClick={() => {
                                    document.getElementById('MachineParamsInsertionModal').showModal();
                                    document.getElementById('initializeConsumption').close();
                                    setConsumtpionName(document.getElementById('nameField').value)
                                }}>next</button>
                    </div>
                </dialog>
                <SelectCollections collections={collections} />
                <SelectMachines machines={catalog} />
                <MachineParamsInsertionModal />
            </div>
        </InitializedConsumptionContext.Provider>
    )
}

export default InitializeConsumptionModal;