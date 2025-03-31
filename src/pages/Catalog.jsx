import React, { createContext, useState } from "react";
import { CatalogHeader, MachinesContainer } from "../components";
import { spring } from "../util";
import { useLoaderData } from "react-router-dom";

const machinesQuery = () => ({
    queryKey: ['machines'],
    queryFn: async () => {
        const response = await spring.get('/machines');
        const data = response.data;
        return data.vehicles.concat(data.devices);
    },
});


export const loader = (queryClient) => async () => {
    const machines = await queryClient.ensureQueryData(machinesQuery());
    return machines;
};


export const CatalogContext = createContext();

const Catalog = ({ backup }) => {
    const data = useLoaderData() ? useLoaderData() : backup;
    const [machines, setMachines] = useState(data);

    return (
        <CatalogContext.Provider value={setMachines}>
            <main className="flex flex-col gap-6 relative">
                <CatalogHeader />
                <MachinesContainer machines={machines} />
                <button onClick={() => setMachines(data)} className='w-6 h-6 right-0 top-0 absolute hover:scale-150 duration-200'>
                    <img src="/images/reset.png" alt="reset" loading="lazy" />
                </button>
            </main>
        </CatalogContext.Provider>
    )
};

export default Catalog;