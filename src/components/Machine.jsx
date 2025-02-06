import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMachine } from '../features/collection/collectionSlice';
import { removeMachine } from '../features/collection/collectionSlice';

const Machine = ({ machine, size, isSelection, selectedMachines, setMachines }) => {
    const dispatch = useDispatch();
    const { img, name } = machine;
    const [add, setAdd] = useState(false);

    const processMachine = () => {
        dispatch(add ? removeMachine(machine.id) : addMachine(machine));
<<<<<<< HEAD

        if (selectedMachines) {
            if (add) {
                selectedMachines = selectedMachines.filter((m) => m.id != machine.id);
            }
            else {
                selectedMachines.push(machine);
            }
            setMachines(selectedMachines);
        }

        setAdd(!add);
=======
        if (add) {
            selectedMachines = selectedMachines.filter((m) => m.id != machine.id);
        }
        else {
            selectedMachines.push(machine);
        }
        setMachines(selectedMachines);
        setAdd(!add);     
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
    }

    return (
        <div onClick={processMachine}
<<<<<<< HEAD
            className='card w-52 justify-center items-center bg-base-300 shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer relative'>
=======
        className='card w-52 justify-center items-center bg-base-300 shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer relative'>
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
            <figure className="px-4 pt-4">
                <img src={img ? img : "/images/machine.png"} alt={name} className={`rounded-xl h-64 md:h-48 w-full object-contain ${size}`}></img>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="text-center text-md font-bold capitalize tracking-wider whitespace-nowrap 
      overflow-hidden text-ellipsis w-full max-sm:text-xs">{name}</h2>
            </div>
            {isSelection ? (<img src={add ? "/images/check.png" : "/images/circle.png"} alt="circle"
                className='absolute top-2 right-2 w-10 h-10 hover:scale-105 duration-150'
<<<<<<< HEAD
            />) : ''
=======
                />) : ''
>>>>>>> 22c8abde6f0ec29fe6b20e0b851b15039b9d511e
            }
        </div>
    )
}

export default Machine;