import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMachine } from '../features/collection/collectionSlice';
import { removeMachine } from '../features/collection/collectionSlice';

const Machine = ({ machine, size, isSelection, selectedMachines, setMachines }) => {
    
    const dispatch = useDispatch();
    const { img, name } = machine;
    const [add, setAdd] = useState(machine.isSelected ? machine.isSelected : false);

    const processMachine = () => {
        dispatch(add ? removeMachine(machine.id) : addMachine(machine));

        if (selectedMachines) {
            setMachines((prevMachines) => {
                if (add) {  
                    const newMachine = {...machine, isSelected: false};
                    return prevMachines.filter((m) => m.id != newMachine.id);
                }
                else {
                    const ids = prevMachines.map((m) => {
                        m = {...m, isSelected: true};
                        return m.id;
                    });
                    const newMachine = {...machine, isSelected: true};
                    if (!ids.includes(machine.id)) return [...prevMachines,newMachine];
                    else return prevMachines;
                }
            });
        }

        setAdd(!add);
    }

    return (
        <div onClick={processMachine}
            className={`card justify-center ${size ? size : 'w-52'} items-center bg-base-300 shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer relative`}>
            <figure className="px-4 pt-4">
                <img src={img != 'uri' ? img : "/images/machine.png"} alt={name} className={`rounded-xl ${size ? 'h-42' : 'h-64'} md:h-48 w-full object-contain`}></img>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className={`text-center ${size ? 'text-sm' : 'text-md'} font-bold capitalize tracking-wider whitespace-nowrap 
      overflow-hidden text-ellipsis w-full max-sm:text-xs`}>{name}</h2>
            </div>
            {isSelection ? (<img src={add ? "/images/check.png" : "/images/circle.png"} alt="circle"
                className='absolute top-2 right-2 w-10 h-10 hover:scale-105 duration-150'
            />) : ''
            }
        </div>
    )
}

export default Machine;