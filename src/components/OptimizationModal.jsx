import React, { useState } from 'react'
import { spring } from '../util';
import { useSelector } from 'react-redux';
import OptimizationReport from '../pages/OptimizationReport';

const OptimizationModal = ({ consumptionId, carbonEmitted }) => {

    const frequencyConstraints = useSelector((state) => state.optimizationState).frequencyConstraints;
    const [optimization, setOptimization] = useState({});
    const [electricityEquivalent, setElectricityEquivalent] = useState(0);
    const [carbonSaved, setCarbonSaved] = useState(0);

    const [goals, setGoals] = useState({
        budget: 0,
        emissionGoal: 0
    });

    const handleChange = (e) => {
        const input = e.target.id;
        const value = Number(e.target.value)

        if (input === 'budget') {
            setGoals({ ...goals, budget: value });
            setElectricityEquivalent((goals.budget / 0.2016).toFixed(2));
        }
        else {
            setGoals({ ...goals, emissionGoal: value });
            setCarbonSaved((carbonEmitted * (goals.emissionGoal / 100)).toFixed(2));
        }
    }

    const sendOptimization = async () => {

        const data = {
            consumptionId,
            frequencyConstraints,
            budgetT: goals.budget,
            carbonReductionPercentageCi: goals.emissionGoal / 100
        }

        console.log(data);
        
        const response = await spring.post("/optimize/advanced", data)
        const optimization = response.data;

        setOptimization(optimization);

        console.log(optimization);
        
        document.getElementById("optimizationReport").showModal();

    }
    return (
        <>
            <div className='flex w-full justify-center'>
                <dialog id="optimisationModal" className="fixed inset-0 z-50 w-[75%] rounded-box bg-base-100 p-4 backdrop:bg-black/60 backdrop-blur-sm animate-modal-pop">
                    <h3 className="font-semibold tracking-widest italic text-lg mb-4">Optimization Goals</h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() => {
                            document.getElementById('optimisationModal').close();
                        }}>✕
                    </button>
                    <div className='flex flex-col justify-center w-full p-10 gap-10'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='sectionTitle'>What's your power consumption financial goal?</h1>
                            <label className='flex flex-col gap-2 w-full'>
                                <span>I want to pay:</span>
                                <div className='flex gap-4 items-center'>
                                    <input id='budget' type="number" className='input input-bordered input-md w-full' value={goals.budget} onChange={(e) => handleChange(e)} />
                                    <span>€</span>
                                </div>
                                <div className='flex w-full justify-center'>
                                    <span className='tracking-widest text-error'>{electricityEquivalent} kWh</span>
                                </div>
                            </label>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h1 className='sectionTitle'>What's your carbon footprint emission reduction goal?</h1>
                            <label className='flex flex-col gap-2 w-full'>
                                <span>I want to reduce my carbon footprint by:</span>
                                <div className='flex gap-4 items-center'>
                                    <input type="number" min={0} max={100} className='input input-bordered input-md w-full' value={goals.emissionGoal} onChange={(e) => handleChange(e)} />
                                    <span>%</span>
                                </div>
                                <div className='flex w-full justify-center'>
                                    <span className='tracking-widest text-error'>{carbonSaved} kgCO2</span>
                                </div>
                            </label>
                        </div>

                        <div className='flex w-full justify-center'>
                            <button className='btn btn-primary w-fit tracking-wider font-bold uppercase' onClick={sendOptimization}>
                                get my new consumption plan
                            </button>
                        </div>
                    </div>

                </dialog>
            </div>
            <OptimizationReport optimization={optimization}/>
        </>
    )
}

export default OptimizationModal;