import React from 'react'
import { Link } from 'react-router-dom';

const CollectionItem = ({id, img, name, machinesNumber, user}) => {
  return (
    <Link to={`/tracer/collections/${name}`} className='flex-col justify-center gap-3 bg-base-300 rounded-box p-4 cursor-pointer hover:scale-110 duration-300'>
      <img src={img} alt={name} className='w-40 object-cover rounded-box'/>
      <p className='text-center text-md font-bold capitalize tracking-wide whitespace-nowrap 
      overflow-hidden text-ellipsis w-full max-sm:text-xs text-info'>{name}</p>
      <p className='text-center font-semibold tracking-wider text-accent'>{machinesNumber} machines</p>
    </Link>
  )
}

export default CollectionItem;