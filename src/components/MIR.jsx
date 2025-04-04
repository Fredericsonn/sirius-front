import React, { useState } from 'react'

const MIR = ({ consumption }) => {

    const [duration, setDuration] = useState(1);

    return (
        <section className='mt-4'>
            <h1 className='sectionTitle'>Your <span className='text-secondary'>M</span>
                anufacturing <span className='text-secondary'>I</span>
                mpact <span className='text-secondary'>R</span>
                ratio Analysis :
                <span className='text-secondary'>{`  (MIR)`}</span>
            </h1>
            <div className='flex flex-col justify-center items-center w-full gap-4'>
                <input type="range" min={0} max={5} defaultValue={1} step={0.1} value={duration} onChange={(e) => setDuration(e.target.value)} className="range range-success" />
                <span className='font-semibold tracking-wide text-xl'>{duration} {`year${duration > 1 ? 's' : ''}`}</span>
            </div>
            <div className='flex w-full gap-10'>
                <h1 className='text-2xl tracking-wide font-semibold border-b-2 border-primary w-fit'>Your impact score is :</h1>
            </div>
        </section>
    )
}

export default MIR;
