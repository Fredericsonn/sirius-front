import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { spring } from '../util';
import MachineParamsItem from '../components/MachineParamsItem';
import { useDispatch, useSelector } from 'react-redux';
import { saveItem } from '../features/optimization/optimizationSlice';
import { OptimizationModal } from '../components';

const AdvancedOptimization = () => {
  const { consumptionId } = useParams();
  const [items, setItems] = useState([]);
  const [machine, setMachine] = useState(null);
  const [carbonEmitted, setCarbonEmitted] = useState(0);

  const initialOptimizationState = {
    minFrequency: 0,
    maxFrequency: 24
  }
  const [optimizationState, setOptimizationState] = useState(initialOptimizationState);

  const savedItems = useSelector((state) => state.optimizationState).frequencyConstraints;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConsumption = async () => {
      const response = await spring.get('/consumptions/' + consumptionId);
      const consumption = response.data;
      setItems(consumption.items);
      setCarbonEmitted(consumption.totalCarbonEmitted);
    };

    fetchConsumption();
  }, []);

  useEffect(() => {

    setOptimizationState(initialOptimizationState);

  }, [machine]);

  const handleChange = (e) => {
    const input = e.target.id;
    const value = Number(e.target.value)

    if (input === 'min') setOptimizationState({ ...optimizationState, minFrequency: value })
    else setOptimizationState({ ...optimizationState, maxFrequency: value })
  }

  const saveConstraint = () => {
    const consumptionItemId = items.find((item) => item.machine.id === machine.id).id;

    const frequencies = {
      minFrequency: optimizationState.minFrequency,
      maxFrequency: optimizationState.maxFrequency,
    }

    const payload = { ...frequencies, consumptionItemId };

    dispatch(saveItem(payload));

    setMachine((prev) => ({ ...prev, isSet: true }));

    setItems((prev) =>
      prev.map((item) => {
        if (item.machine.id === machine.id) {
          return {
            ...item,
            machine: {
              ...item.machine,
              isSet: true
            }
          };
        }
        return item;
      })
    );

  }

  return (
    <>
      <main className='flex w-full items-center'>
        <section className='flex flex-wrap gap-4 w-[40%] h-screen border-r-4 border-secondary'>
          {items.map((i) => {
            const m = i.machine;
            return (<MachineParamsItem key={m.id} machine={(machine != null && machine.id === m.id) ? machine : m} size='w-32 h-48' selectMachine={() => setMachine(m)} />)
          }
          )}
        </section>
        {machine != null ? (
          <section className='flex flex-col items-center gap-4 w-[60%] h-screen mt-8'>
            <div className="flex flex-col justify-center items-center w-48 h-48 p-2">
              <img src={machine.img} alt={machine.name} className="rounded-xl object-contain"></img>
              <p className='text-center font-bold capitalize tracking-wider'>{machine.name}</p>
            </div>
            <div className='flex flex-col w-full gap-4 p-8'>
              <label className='flex flex-col gap-2'>
                <span>What's your minimum usage duration ?</span>
                <div className='flex w-full justify-between items-center'>
                  <input id='min' type="number" value={optimizationState.minFrequency} onChange={(e) => handleChange(e)}
                    className='input input-bordered input-md' />
                  <button className='btn btn-primary btn-sm tracking-wide px-4 py-2' onClick={() => setOptimizationState(initialOptimizationState)}>I don't really use it</button>
                </div>
              </label>
              <label className='flex flex-col gap-2'>
                <span>What's your maximum usage duration ?</span>
                <div className='flex w-full justify-between items-center'>
                  <input id='max' type="number" value={optimizationState.maxFrequency} onChange={(e) => handleChange(e)}
                    className='input input-bordered input-md' />
                  <button className='btn btn-primary btn-sm tracking-wide px-4 py-2' onClick={() => setOptimizationState(initialOptimizationState)}>I use it all the time</button>
                </div>
              </label>
              <div className='flex flex-col items-center w-full'>
                <button className='btn btn-success w-44 p-4 mt-4' onClick={saveConstraint}>save</button>
                <button className='btn btn-primary w-44 p-4 mt-4' disabled={savedItems.length == items.length ? false : true}
                  onClick={() => document.getElementById('optimisationModal').showModal()}>
                  next
                </button>
              </div>
            </div>
          </section>
        ) :
          <h1 className='sectionTitle mx-auto'>Select an item to start entering your constraints</h1>}
      </main>
      <OptimizationModal consumptionId={consumptionId} carbonEmitted={carbonEmitted} />
    </>
  )
}

export default AdvancedOptimization;