import React from 'react';

const OptimizationReport = ({ optimization }) => {
    const {
        message,
        optimizedItems,
        originalTotalCarbon,
        targetTotalCarbon,
        achievedTotalCarbon,
        originalTotalCost,
        targetMaxCost,
        achievedTotalCost,
        solutionFound
    } = optimization;

    console.log(optimizedItems);

    return (
        optimizedItems && (
            <div className='flex w-full justify-center'>
            <dialog id="optimizationReport" className="fixed inset-0 z-50 w-[75%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <div className='flex flex-col w-full justify-center'>
                    <h3 className="font-semibold tracking-widest italic text-lg mb-4">{message}</h3>
                    <div className='flex w-full justify-center items-center gap-10'>
                        <p className='font-semibold tracking-widest italic text-lg mb-4'>original total footprint: </p>
                        <p className="font-semibold tracking-widest italic text-lg mb-4 text-secondary">{originalTotalCarbon.toFixed(2)}</p>
                    </div>
                    <div className='flex w-full justify-center items-center gap-10'>
                        <p className='font-semibold tracking-widest italic text-lg mb-4'>target footprint: </p>
                        <p className="font-semibold tracking-widest italic text-lg mb-4 text-secondary">{targetTotalCarbon.toFixed(2)}</p>
                    </div>
                    <div className='flex w-full justify-center items-center gap-10'>
                        <p className='font-semibold tracking-widest italic text-lg mb-4'>achieved footprint: </p>
                        <p className="font-semibold tracking-widest italic text-lg mb-4 text-secondary">{achievedTotalCarbon.toFixed(2)}</p>
                    </div>
                    <div className='flex w-full justify-center items-center gap-10'>
                        <p className='font-semibold tracking-widest italic text-lg mb-4'>original total cost: </p>
                        <p className="font-semibold tracking-widest italic text-lg mb-4 text-secondary">{originalTotalCost.toFixed(2)}</p>
                    </div>
                    <div className='flex w-full justify-center items-center gap-10'>
                        <p className='font-semibold tracking-widest italic text-lg mb-4'>target cost: </p>
                        <p className="font-semibold tracking-widest italic text-lg mb-4 text-secondary">{targetMaxCost.toFixed(2)}</p>
                    </div>
                    <div className='flex w-full justify-center items-center gap-10'>
                        <p className='font-semibold tracking-widest italic text-lg mb-4'>achieved cost: </p>
                        <p className="font-semibold tracking-widest italic text-lg mb-4 text-secondary">{achievedTotalCarbon.toFixed(2)}</p>
                    </div>

                    {solutionFound && (
                        <div className="overflow-x-auto p-4">
                            <table className="table w-full table-zebra border border-gray-300">
                                <thead className="text-sm uppercase">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Item Name</th>
                                        <th className="px-4 py-2 text-left">Original Frequency</th>
                                        <th className="px-4 py-2 text-left">Optimized Frequency</th>
                                        <th className="px-4 py-2 text-left">Energy Input</th>
                                        <th className="px-4 py-2 text-left">New Footprint</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {optimizedItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">{item.itemName}</td>
                                            <td className="px-4 py-2">{item.originalFrequency.toFixed(2)}</td>
                                            <td className="px-4 py-2">{item.optimizedFrequency.toFixed(2)}</td>
                                            <td className="px-4 py-2">{item.energyInput}</td>
                                            <td className="px-4 py-2">{item.resultingCarbonFootprint.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        document.getElementById('optimizationReport').close();
                    }}>✕
                </button>
            </dialog>
        </div>
        )
    )
}

export default OptimizationReport;