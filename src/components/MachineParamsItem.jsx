import React, { useContext, useState } from 'react'

const MachineParamsItem = ({ machine, selectMachine }) => {
    const { img, name } = machine;
    console.log(machine.isSet);
    
    return (
        <div className="card justify-center items-center w-36 bg-base-300 shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer relative pt-6"
             onClick={() => selectMachine(machine)}>
            <div className="flex justify-center items-center w-24 h-24">
                <img src={img} alt={name} className="rounded-xl object-contain"></img>
            </div>
            <div className="card-body items-center text-center flex flex-col flex-grow min-h-[50px] px-5">
                <h2 className="text-center font-bold capitalize tracking-wider w-full text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {name}
                </h2>
            </div>
            <img src={machine.isSet ? '/images/check.png' : '/images/circle.png'} className='absolute top-2 right-0 w-10 h-10 object-contain' />
        </div>


    )
}

export default MachineParamsItem;
