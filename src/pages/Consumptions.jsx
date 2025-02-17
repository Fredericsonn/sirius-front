import React from 'react'
import { InitializeConsumptionModal } from '../components';
import { spring } from '../util';
import { useLoaderData } from 'react-router-dom';

export const loader = (store) => async () => {
  const userId = store.getState().userState.user.id;
  const response = await spring.get('/consumptions', { params: { userId } });
  const consumptions = response.data;
  return consumptions;
}
const Consumptions = () => {
  const consumptions = useLoaderData();

  return (
    <main>
      <div className='flex justify-between items-center w-full sectionTitle'>
        <h1 className='font-semibold tracking-wider capitalize'>your comsumptions </h1>
        <button onClick={() => document.getElementById('initializeConsumption').showModal()} className='flex items-center gap-2 bg-orange-600 p-2 rounded-box hover:scale-105 duration-200'>
          <img src="/images/add.png" alt="add" className='w-6 h-6 object-cover' />
          <span className='text-sm text-white'>create a new consumption</span>
        </button>
      </div>
      <table>
        <th>rank</th>
        <th>name</th>
        <th>CO2 emitted</th>
        <tbody>
          {consumptions.map((consumption) => {
            const { id, name, totalCarbonEmitted } = consumption;
            return (
              <tr>
                <td>
                  {id}
                </td>
                <td>
                  {name}
                </td>
                <td>
                  {totalCarbonEmitted}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <InitializeConsumptionModal />
    </main>
  )
};

export default Consumptions;