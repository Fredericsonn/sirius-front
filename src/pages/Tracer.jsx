import React from 'react'
import { Link } from 'react-router-dom';

const Tracer = () => {
  return (
    <main className='flex justify-between px-52 py-16 w-full'>
      <Link to="/tracer/collections" className='flex flex-col items-center justify-center gap-6 hover:scale-110 duration-200'>
        <img src="/images/list.png" alt="collections" className='w-24 h-24 object-cover' />
        <p className='uppercase text-lg tracking-wider font-mono font-semibold'>Collections</p>
      </Link>
      <Link to="/tracer/consumptions" className='flex flex-col items-center justify-center gap-6 hover:scale-110 duration-200'>
        <img src="/images/consumption.png" alt="consumptions" className='w-28 h-28 object-cover' />
        <p className='uppercase text-lg tracking-wider font-mono font-semibold'>Consumptions</p>
      </Link>
    </main>
  )
}

export default Tracer;