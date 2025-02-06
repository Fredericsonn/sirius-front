import React from 'react'
import { InitializeConsumptionModal } from '../components';

const Consumptions = () => {
  return (
    <main>
        <div className='flex justify-between items-center w-full sectionTitle'>
            <h1 className='font-semibold tracking-wider capitalize'>your comsumptions </h1>
            <button onClick={() => document.getElementById('initializeConsumption').showModal()} className='flex items-center gap-2 bg-orange-600 p-2 rounded-box hover:scale-105 duration-200'>
                <img src="/images/add.png" alt="add" className='w-6 h-6 object-cover' />
                <span className='text-sm text-white'>create a new consumption</span>
            </button>
        </div>
        <InitializeConsumptionModal />
    </main>
  )
};

export default Consumptions;