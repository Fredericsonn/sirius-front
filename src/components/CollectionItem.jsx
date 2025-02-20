import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CollectionItem = ({ id, name, img, machines, machinesNumber, isSelection, setMachines, selectedMachines }) => {
  const [add, setAdd] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const processMachine = () => {
    setMachines((prevMachines) => {
      if (isSelected) {
        const ids = machines.map((m) => m.id);
        return prevMachines.filter((m) => !ids.includes(m.id));
      }
      
      else {
        const ids = selectedMachines.map((m) => m.id);
        const newMachines = machines.filter((m) => !ids.includes(m.id));
        return [...prevMachines,...newMachines]
      }
    })
    
    setAdd(!add);
    setIsSelected(!isSelected);
  }

  return (
    isSelection ? (
      <div
        onClick={processMachine}
        className="flex-col justify-center gap-3 bg-base-300 rounded-box p-4 cursor-pointer hover:scale-110 duration-300 relative"
      >
        <img src={img} alt={name} className="w-40 object-cover rounded-box" />
        <p className="text-center text-md font-bold capitalize tracking-wide whitespace-nowrap 
          overflow-hidden text-ellipsis w-full max-sm:text-xs text-info">
          {name}
        </p>
        <p className="text-center font-semibold tracking-wider text-accent">
          {machinesNumber} machines
        </p>
        {isSelected && (<img src="/images/check.png" className='w-10 h-10 absolute right-2 top-2' />)}
        <img src="/images/circle.png" className={`w-10 h-10 absolute right-2 top-2 ${isSelected ? 'hidden' : ''}`} />
      </div>
    ) :  
      (
        <Link to={`/tracer/collections/${name}`} className='flex-col justify-center gap-3 bg-base-300 rounded-box p-4 cursor-pointer hover:scale-110 duration-300'>
          <img src={img} alt={name} className='w-40 object-cover rounded-box' />
          <p className='text-center text-md font-bold capitalize tracking-wide whitespace-nowrap 
      overflow-hidden text-ellipsis w-full max-sm:text-xs text-info'>{name}</p>
          <p className='text-center font-semibold tracking-wider text-accent'>{machinesNumber} machines</p>
        </Link>)
  )
}

export default CollectionItem;