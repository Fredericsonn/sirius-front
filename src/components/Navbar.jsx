import React, { useState } from 'react'
import { FaBarsStaggered } from 'react-icons/fa6';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'

const NavBar = () => {
    const isLoggedIn = true;

    return (
        <nav className="navbar bg-base-300 rounded-box mt-4 container-layout flex">
            <div className="navbar-start max-sm:hidden">
                <Link to='/'><Logo size="w-10" /></Link>
            </div>
            <div className='dropdown'>
                <label tabIndex={0} className='btn btn-ghost sm:hidden'>
                    <FaBarsStaggered className='h-6 w-6' />
                </label>
                <ul className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-200 drop-ver rounded-box w-40'><NavLinks /></ul>
            </div>
            <div className="navbar-center max-sm:hidden">
                <ul className='menu menu-horizontal flex justify-center gap-4'>
                    <NavLinks />
                </ul>
            </div>
            <div className="navbar-end ml-auto">
                {
                    isLoggedIn ? (
                        <div className='flex gap-x-7'>
                            <ThemeToggle />

                            {/* Profile Dropdown */}
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li><Link to='/profile'>Profile</Link></li>
                                    <li><button>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    )
                        : (
                            <div className='flex gap-x-4'>
                                <ThemeToggle />
                                <LoginNav />
                            </div>

                        )
                }
            </div>
        </nav>
    )
};

const LoginNav = () => {
    return (
        <div className='flex gap-x-4'>
            <Link to='/register' className='btn btn-outline btn-primary btn-sm uppercase'>register</Link>
            <Link to='/login' className='btn btn-outline btn-secondary btn-sm uppercase'>Log in</Link>
        </div>
    )
};

const ThemeToggle = () => {
    const [theme, setTheme] = useState('night');
    const handleTheme = () => {
        const newTheme = theme === 'night' ? 'dark' : 'night';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }
    return (
        <label title='change theme' className='swap swap-rotate'>
            <input type='checkbox' onChange={handleTheme} />
            <BsSunFill className='swap-on h-4 w-4' />
            <BsMoonFill className='swap-off h-4 w-4' />
        </label>
    )
};

const Logo = ({size}) => {
    return (
        <img src='/vite.svg' className={`${size} object-contain hover:scale-105 duration-200`} />
    )
}
export default NavBar;