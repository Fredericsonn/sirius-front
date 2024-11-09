import React from 'react'

const Home = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center">
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

export default Home;