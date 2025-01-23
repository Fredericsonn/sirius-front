import React from 'react';
import { spring } from '../util'
import { useLoaderData } from 'react-router-dom';
import { CatalogHeader, AddNewMachine, MachinesContainer } from '../components';
import { useState } from 'react';

export const loader = (store) => async ({params}) => {
  const name = params.name;
  const userId = store.getState().userState.user.id;
  
  const response = await spring.get('/users/collections/' + name, {params: {userId}});
  const {machines, id} = response.data;
  machines.map((m) => m.img = '/' + m.img);

  return {id, name, machines};
}
const Collection = () => {
  const {id, name, machines} = useLoaderData();
  const [data, setData] = useState(machines);

  return (
    <main>
      <h1 className='sectionTitle mb-8'>{name} collection</h1>
      <MachinesContainer machines={data} isAdd={true} />
      <AddNewMachine collectionId={id} existingMachines={data} collectionName={name}  />
    </main>
  )
}

export default Collection;