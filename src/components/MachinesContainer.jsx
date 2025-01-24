import React from 'react'
import Machine from './Machine';
import AddNew from './AddNew';

const MachinesContainer = ({machines, isAdd, isSelection, isInCollection, selectedMachines, setMachines}) => {
  
  return (
    <section className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 items-center gap-8 mt-6'>
        {machines.map((machine) => {
            return <Machine key={machine.name} machine={machine} isSelection={isSelection} 
                            isInCollection={isInCollection} selectedMachines={selectedMachines} setMachines={setMachines}/>
        })}
        {isAdd ? (<AddNew text="machine" id="addMachineModal"/>) : ''}
    </section>
  )
};

export default MachinesContainer;