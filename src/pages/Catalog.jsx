import React, { createContext, useState } from "react";
import { CatalogHeader, MachinesContainer } from "../components";
import { spring } from "../util";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
    const response = await spring.get('/machines');
    const data = response.data;
    const machines = data.vehicles.concat(data.devices);
       
    return machines;
}

export const CatalogContext = createContext();

const Catalog = ({backup}) => {
    const data = useLoaderData() ? useLoaderData() : backup;
    const [machines, setMachines] = useState(data);
    
    return (
        <CatalogContext.Provider value={setMachines}>
            <main className="flex flex-col gap-6 relative">
                <CatalogHeader />
                <MachinesContainer machines={machines} />
                <button onClick={() => setMachines(data)} className='w-6 h-6 right-0 top-0 absolute hover:scale-150 duration-200'>
                    <img src="/images/reset.png" alt="reset" />
                </button>
            </main>
        </CatalogContext.Provider>
    )
};

export default Catalog;