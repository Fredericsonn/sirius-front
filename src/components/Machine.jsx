import React from 'react'

const Machine = ({machine,size}) => {
    const {img, name} = machine;
    
    return (
        <div className='card w-52 justify-center items-center bg-base-300 shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer'>
            <div>
                <figure className="px-4 pt-4">
                    <img src={img ? img : "/images/machine.png"} alt={name} className={`rounded-xl h-64 md:h-48 w-full object-contain ${size}`}></img>
                </figure>
            </div>
            <div className="card-body items-center text-center">
                <h2 className="text-center text-md font-bold capitalize tracking-wider whitespace-nowrap 
      overflow-hidden text-ellipsis w-full max-sm:text-xs">{name}</h2>
            </div>
        </div>
    )
}

export default Machine;