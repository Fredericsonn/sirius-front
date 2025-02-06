import React, { useContext } from 'react'
import CollectionsContainer from './CollectionsContainer';
import { InitializedConsumptionContext } from './InitializeConsumptionModal';

export const SelectCollections = ({collections}) => {
    const {setSelectedMachines, selectedMachines} = useContext(InitializedConsumptionContext);
    return (
        <div className='flex w-full justify-center'>
            <dialog id="selectCollectionsModal" className="fixed inset-0 z-50 w-[75%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <h3 className="font-semibold tracking-wider text-lg mb-4">Your Collections</h3>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        document.getElementById('selectCollectionsModal').close();
                    }}>✕
                </button>
                <CollectionsContainer collections={collections} isAdd={false} isSelection={true} setMachines={setSelectedMachines} selectedMachines={selectedMachines}/>
            </dialog>
        </div>
    )
};

export default SelectCollections;
