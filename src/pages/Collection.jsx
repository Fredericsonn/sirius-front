import React from 'react';
import { spring } from '../util'
import { useLoaderData } from 'react-router-dom';
import { CatalogHeader, AddNewMachine, MachinesContainer } from '../components';
import { useState } from 'react';

export const loader = (store) => async ({params}) => {
  const name = params.name;
  const userId = store.getState().userState.user.id;
  
  const response = await spring.get('/users/collections/' + name, {params: {userId}});
  const machines = response.data.machines;
  machines.map((m) => m.img = '/' + m.img);

  return {name, machines};
}
const Collection = () => {
  const {name, machines} = useLoaderData();
  const [data, setData] = useState(machines);
  
  return (
    <main>
      <h1 className='sectionTitle'>{name} collection</h1>
      <CatalogHeader />
      <MachinesContainer machines={data}/>
      <AddNewMachine />
    </main>
  )
}

export default Collection;