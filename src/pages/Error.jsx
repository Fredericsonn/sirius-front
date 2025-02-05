import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center gap-4'>
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">page not found</h1>
          <p className="mt-6 text-lg leading-7">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10">
            <Link to="/" className="btn btn-secondary">GO BACK HOME</Link>
          </div>
    </div>
  )
}

export default Error;