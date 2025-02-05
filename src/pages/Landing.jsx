import React from 'react'
import { Link } from 'react-router-dom';

const paragraph = "Discover how your choices affect the planet and take steps toward a greener future. Use our tool to measure your impact and make a difference today!";

const func = () => {
    
}
const Landing = () => {
  return (
    <section className='flex w-full h-full justify-between gap-8'>
        <div className='pt-10'>
            <h1 className='text-5xl font-bold mb-4'>Learn your impact on the planet !!</h1>
            <p className='tracking-wider text-lg mb-8'>{paragraph}</p>
            <Link to="/tracer/consumptions" className='btn btn-primary btn-md uppercase font-bold'>Trace</Link>
        </div>
        <img src="/images/w-1.jpeg" alt="footprint" className='w-[32rem] rounded-box object-cover' />
        
    </section>
  )
}

export default Landing;