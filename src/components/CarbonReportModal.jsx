import React, { useContext } from 'react'
import { InitializedConsumptionContext } from './InitializeConsumptionModal';
import MachinesContainer from './MachinesContainer';
import Machine from './Machine';

const CarbonReportModal = ({consumption}) => {
    const { setSelectedMachines, selectedMachines } = useContext(InitializedConsumptionContext);
    
    return (
        <div className='flex w-full justify-center'>
            <dialog id="CarbonReportModal" className="fixed inset-0 z-50 w-[80%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <h3 className="font-semibold tracking-widest italic text-lg mb-4">Carbon Footprint Report</h3>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        document.getElementById('CarbonReportModal').close();
                    }}>✕
                </button>
                <section className='flex flex-col justify-center items-center w-full'>
                    <h1 className='text-2xl'>Your consumptions produces:</h1>
                    <p className='font-bold text-2xl italic text-center text-secondary underline'>
                        {consumption ? consumption.totalCarbonEmitted: 570 } KgCO2</p>
                </section>
                <div className='flex w-full py-10'>
                    <section className='flex flex-wrap gap-4 items-center w-full'>
                        {selectedMachines.map((machine) => <Machine key={machine.id} machine={machine} size="w-42"/>)}
                    </section>
                </div>
            </dialog>
        </div>
    )
}

export default CarbonReportModal;