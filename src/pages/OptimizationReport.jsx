import React from 'react';

const OptimizationReport = ({ optimization }) => {
    if (!optimization) return null;

    const {
        message,
        optimizedItems = [],
        originalTotalCarbon,
        targetTotalCarbon,
        achievedTotalCarbon,
        originalTotalCost,
        targetMaxCost,
        achievedTotalCost,
        solutionFound
    } = optimization;

    return (
        <div className='flex w-full justify-center'>
            <dialog id="optimizationReport" className="fixed inset-0 z-50 w-[75%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                <div className='flex w-full justify-center'>
                    <h3 className={`font-semibold tracking-widest italic text-lg mb-4 ${solutionFound ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </h3>
                </div>

                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => {
                        document.getElementById('optimizationReport').close();
                    }}>✕
                </button>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm'>
                    <div className='bg-base-200 p-4 rounded-box'>
                        <h4 className='font-bold mb-2'>Carbon Footprint (kg CO₂e)</h4>
                        <p><b>Original:</b> {originalTotalCarbon}</p>
                        <p><b>Target:</b> {targetTotalCarbon}</p>
                        <p><b>Achieved:</b> {achievedTotalCarbon}</p>
                    </div>
                    <div className='bg-base-200 p-4 rounded-box'>
                        <h4 className='font-bold mb-2'>Cost (€)</h4>
                        <p><b>Original:</b> {originalTotalCost.toFixed(2)}</p>
                        <p><b>Budget (Max):</b> {targetMaxCost.toFixed(2)}</p>
                        <p><b>Achieved:</b> {achievedTotalCost.toFixed(2)}</p>
                    </div>
                </div>

                {optimizedItems.length > 0 && (
                    <div className='overflow-x-auto mt-6'>
                        <h4 className='text-md font-semibold mb-2'>Optimized Items</h4>
                        <table className="table table-zebra table-sm w-full text-sm">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Original Freq</th>
                                    <th>Optimized Freq</th>
                                    <th>Energy Input (W)</th>
                                    <th>Resulting CO₂</th>
                                </tr>
                            </thead>
                            <tbody>
                                {optimizedItems.map((item, index) => (
                                    <tr key={item.consumptionItemId || index}>
                                        <td>{item.itemName}</td>
                                        <td>{item.originalFrequency}</td>
                                        <td>{item.optimizedFrequency.toFixed(3)}</td>
                                        <td>{item.energyInput}</td>
                                        <td>{item.resultingCarbonFootprint}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {optimizedItems.length === 0 && (
                    <div className='mt-4 text-center text-warning'>
                        No optimization data available.
                    </div>
                )}
            </dialog>
        </div>
    );
};

export default OptimizationReport;
