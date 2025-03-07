import React from 'react'

const CarbonReportModal = ({consumption}) => {
    return (
        <div className='flex w-full justify-center'>
            <dialog id="CarbonReportModal" className="fixed inset-0 z-50 w-[70%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <h3 className="font-semibold tracking-widest italic text-lg mb-4">Carbon Report</h3>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        document.getElementById('CarbonReportModal').close();
                    }}>✕
                </button>
                <section className='flex flex-col justify-center items-center w-full'>
                    <h1 className='text-2xl'>Your consumptions produces:</h1>
                    <p className='font-bold text-2xl italic text-center text-secondary underline'>
                        {consumption ? consumption.totalCarbonEmitted : 570} KgCO2</p>
                </section> 
            </dialog>
        </div>
    )
}

export default CarbonReportModal;