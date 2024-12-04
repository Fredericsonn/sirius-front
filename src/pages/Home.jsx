import React from 'react'
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Home = () => {
    return (
        <div className="flex flex-col gap-6 w-screen h-screen items-center justify-center">
            <Logo />
            <div className='flex justify-center items-center gap-3'>
                <Link to="/register" className='btn btn-primary font-semibold'>Create a new Account</Link>
                <Link to="/users" className='btn btn-secondary font-semibold'>Users</Link>
            </div>
        </div>
    )
}

export default Home;