import React from 'react';

const OptimizationReport = ({ optimization }) => {
    const { message, optimizedItems, originalTotalCarbon,
        targetTotalCarbon, achievedTotalCarbon, originalTotalCost,
        targetMaxCost, achievedTotalCost } = optimization;
    return (
        <div className='flex w-full justify-center'>
            <dialog id="optimizationReport" className="fixed inset-0 z-50 w-[75%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <div className='flex w-full justify-center'>
                <h3 className="font-semibold tracking-widest italic text-lg mb-4">{message}</h3>
                </div>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        document.getElementById('optimizationReport').close();
                    }}>✕
                </button>
            </dialog>
        </div>
    )
}

export default OptimizationReport;