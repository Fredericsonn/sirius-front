import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addItem } from '../features/consumption/consumptionSlice';
import { MachineParamsInsertionContext } from './MachineParamsInsertionModal';

const MachineParamsForm = ({ machine }) => {
    const { id, img, name, type } = machine;
    const dispatch = useDispatch();
    const {setMachines}  = useContext(MachineParamsInsertionContext);
    
    const [energyType, setEnergyType] = useState('ELECTRICITY');

    const units = {
        'ELECTRICITY': 'watts',
        'NATURAL_GAS': 'm\u00B3'
    }

    const energyDefaultValues = {
        'ELECTRICITY': 100,
        'NATURAL_GAS': 1
    }

    const handleRadioButtons = (e) => {
        setEnergyType(e.target.value);
        document.getElementById('energyTypeInput').value = '';
    }

    const resetValues = (id) => {
        document.getElementById(id).value = '';
    }

    const saveItem = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        let data = Object.fromEntries(formData);

        const usageDurationHours = parseFloat(data.usageDurationHours) || 0;
        const usageDurationMinutes = parseFloat(data.usageDurationMinutes) || 0;

        const { usageDurationHours: _, usageDurationMinutes: __, ...rest } = data;

        const item = {
            ...rest,
            machine: { id, type },
            usageFrequency: usageDurationHours + usageDurationMinutes / 60
        };

        // we save the item to the redux slice
        dispatch(addItem(item));

        // we reset the input fields
        resetValues('itemName');
        resetValues('energyTypeInput');
        resetValues('usageDurationHours');
        resetValues('usageDurationMinutes');
        resetValues('quantityInput');

        // we change the icon to selected
        setMachines((prevMachines) => prevMachines.map((m) => {
            if (m.id == id) m = {...m, isSet: true}
        }))
    };





    return img ? (
        <main className='flex flex-col w-full'>
            <section className='flex w-full justify-center mt-10 pt-6'>
                <div className="flex flex-col justify-center items-center w-64 h-64 p-2">
                    <img src={img} alt={name} className="rounded-xl object-contain"></img>
                    <p className='text-center font-bold capitalize tracking-wider'>{name}</p>
                </div>
            </section>
            <form onSubmit={(e) => saveItem(e)} className='flex flex-col w-full py-4 px-10 gap-8'>

                {/* ITEM NAME */}
                <label className='flex items-center mt-6 w-full'>
                    <span className='font-semibold capitalize tracking-wider w-1/4'>item name:</span>
                    <input type="text" name="name" id='itemName' className='input input-bordered text-sm w-96' placeholder={name + '-1' + ', Main ' + name + ',...'} />
                </label>

                {/* ENERGY TYPE SELECTION*/}
                <label className='flex items-center w-full'>
                    <span className='font-semibold capitalize tracking-wider w-1/4'>energy type:</span>
                    <div className='flex gap-8 flex-1'>
                        <div className='flex gap-2 items-center'>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <img src="/images/flash.png" alt="electricity" className='w-10 h-10 object-contain' />
                                <p className='capitalize tracking-wider font-semibold italic'>electricity</p>
                            </div>
                            <input type="radio" name="energyType" value={'ELECTRICITY'} className="radio radio-info" onChange={(e) => handleRadioButtons(e)} defaultChecked />
                        </div>
                        <div className='flex gap-2 items-center'>
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <img src="/images/natural-gas.png" alt="electricity" className='w-10 h-10 object-contain' />
                                <p className='capitalize tracking-wider font-semibold italic'>natural gas</p>
                            </div>
                            <input type="radio" name="energyType" value={'NATURAL_GAS'} className="radio radio-info" onChange={(e) => handleRadioButtons(e)} />
                        </div>
                    </div>
                </label>

                {/* ENERGY INPUT*/}
                <label className='flex items-center mt-6 w-full'>
                    <span className='font-semibold capitalize tracking-wider w-1/4'>energy input:</span>
                    <div className='flex items-center gap-4 flex-1'>
                        <input type="number" name="energyInput" id='energyTypeInput' className='input input-bordered' min={1} max={3000} placeholder={energyDefaultValues[energyType]} required />
                        <p className='font-semibold tracking-wider'>{units[energyType]}/h</p>
                    </div>
                </label>

                {/* USAGE FREQUENCY */}
                <label className='flex items-center mt-6 w-full'>
                    <span className='font-semibold capitalize tracking-wider w-1/4'>usage duration:</span>
                    <div className='flex items-center gap-8 flex-1'>
                        <div className='flex items-center w-36 gap-4'>
                            <input type="number" name="usageDurationHours" id='usageDurationHours' placeholder='1' className='input input-bordered text-sm w-24' min={0} max={24} defaultValue={0} required />
                            <p className='font-semibold tracking-wider'>hours</p>
                        </div>
                        <div className='flex items-center w-36 gap-4'>
                            <input type="number" name="usageDurationMinutes" id='usageDurationMinutes' placeholder='0' className='input input-bordered text-sm w-24' min={0} max={60} defaultValue={0} required />
                            <p className='font-semibold tracking-wider'>minutes</p>
                        </div>
                    </div>
                </label>

                {/* QUANTITY */}
                <label className='flex items-center mt-6 w-full'>
                    <span className='font-semibold capitalize tracking-wider w-1/4'>quantity:</span>
                    <input type="number" name="quantity" id='quantityInput' placeholder='1' className='input input-bordered' min={1} defaultValue={1} required />

                </label>

                <button type='submit' className='btn btn-secondary capitalize font-semibold'>save item</button>
            </form>

        </main>
    ) : (
        <div className='flex justify-center w-full mt-64'>
            <h1 className='sectionTitle h-fit'>Select a machine to start filling the parameters</h1>
        </div>
    )
}

export default MachineParamsForm;
