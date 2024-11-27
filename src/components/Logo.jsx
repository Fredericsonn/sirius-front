import React from 'react'

const Logo = () => {
    return (
        <div className='flex items-center'>
            <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">Eco</h1>
            <div className="stats bg-green-500 shadow ml-1">
                <div className="stat">
                    <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
                        Tracer
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logo;