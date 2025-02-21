import React from 'react'
import { InitializeConsumptionModal } from '../components';
import { spring } from '../util';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const loader = (store) => async () => {
  const userId = store.getState().userState.user.id;
  const response = await spring.get('/consumptions', { params: { userId } });
  const consumptions = response.data.consumptions;

  return consumptions;
}

const Consumptions = () => {
  const consumptions = useLoaderData();
  const navigate = useNavigate();

  return (
    <main>
      <div className='flex justify-between items-center w-full sectionTitle'>
        <h1 className='font-semibold tracking-wider capitalize'>your comsumptions </h1>
        <button onClick={() => document.getElementById('initializeConsumption').showModal()} className='flex items-center gap-2 bg-orange-600 p-2 rounded-box hover:scale-105 duration-200'>
          <img src="/images/add.png" alt="add" className='w-6 h-6 object-cover' />
          <span className='text-sm text-white'>create a new consumption</span>
        </button>
      </div>
      {consumptions.length > 0 ? (
        <table className='w-full bg-base-300 rounded-box p-6 table'>
          <tbody className='rounded-box p-10'>
            <tr>
              <th className='text-center'>number</th>
              <th className='text-center'>name</th>
              <th className='text-center'>created at</th>
              <th className='text-center'>CO2 emitted</th>
            </tr>
            {consumptions.map((consumption) => {
              const { id, name, createdAt, totalCarbonEmitted } = consumption;
              return (
                <tr key={id} className='hover:bg-base-200 rounded-box p-10 cursor-pointer'
                  onClick={() => navigate(`/tracer/consumptions/${id}`)}>
                  <td className='text-center'>
                    {id}
                  </td>
                  <td className='text-center'>
                    {name}
                  </td>
                  <td className='text-center'>
                    {createdAt}
                  </td>
                  <td className='text-center'>
                    {totalCarbonEmitted}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>) : (<h1 className='font-bold italic border-b-2 border-primary pb-[2px] text-xl w-fit m-auto capitalize'>you currently haven't created any consumptions</h1>)}
      <InitializeConsumptionModal />
    </main>
  )
};

export default Consumptions;