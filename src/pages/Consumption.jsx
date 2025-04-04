import React, { useEffect, useState } from 'react'
import { spring } from '../util'
import { useLoaderData } from 'react-router-dom';
import { MachineList, MIR } from '../components';

export const loader = async ({ params }) => {
    const response = await spring.get('/consumptions/' + params.id)
    let consumption = response.data;

    // Capitalize first letter of machine.type
    consumption.items = consumption.items.map((item) => {
        if (item.machine && item.machine.type) {
            item.machine.type = item.machine.type.charAt(0).toUpperCase() + item.machine.type.slice(1);
        }
        return item;
    });

    delete consumption.consumptionItems;

    return consumption;
}


/* PS (Ayoub): The code in the useEffect was the loader of a page created by ismail, I merged the 2 pages into one so I turned the old page into a component
                and I replaced the loader with a prop, which as you can I set as a sate varibale that gets set in the useEffect */
const Consumption = () => {
    const consumption = useLoaderData();
    const [orderedItems, setOrderedItems] = useState([]);
    const [mir, setMir] = useState({
        score: 0,
        report: []
    });

    useEffect(() => {
        const getItems = async () => {
            const response = await spring.get(`/consumptions/${consumption.id}/items`);
            const data = response.data;

            // Mapper les données du back pour les adapter au component MachineItem
            const formattedMachines = data.map((item) => {

                const intensiteCarbone = item.carbonFootprint / item.quantity;

                // Mapper urgence
                let urgence = 'Faible';
                if (intensiteCarbone > 100) {
                    urgence = 'Critique';
                } else if (intensiteCarbone > 50) {
                    urgence = 'Moyenne';
                }

                // Mapper catégorie
                let categorie = 'E';
                if (intensiteCarbone <= 20) categorie = 'A';
                else if (intensiteCarbone <= 40) categorie = 'B';
                else if (intensiteCarbone <= 60) categorie = 'C';
                else if (intensiteCarbone <= 100) categorie = 'D';

                return {
                    img: item.machine.img,
                    nom: item.name || 'Nom non disponible', // Si "nom" n'existe pas
                    empreinteCarbone: item.carbonFootprint,
                    quantite: item.quantity,
                    urgence: urgence,
                    categorie: categorie,
                };
            });

            setOrderedItems(formattedMachines);
        }

        getItems();
    }, []);

    useEffect(() => {
        const fetchMIR = async () => {
            const data = consumption;
            
            const response = await spring.post('/consumptions/mir', data);
            const { score, report } = response.data;

            setMir({
                score,
                report
            });
        }

        fetchMIR();
    }, [])

    return (
        <main className='flex flex-col w-full'>

            <div className='flex flex-col w-full justify-center items-center'>
                <h1 className='text-2xl'>Your consumptions produces daily:</h1>
                <p className='font-bold text-2xl italic text-center text-secondary underline'>
                    {consumption.totalCarbonEmitted.toFixed(2)} KgCO2</p>
            </div>
            <MIR consumption={consumption} mir={mir} />
            <OrderedItems consumption={consumption} orderedItems={orderedItems} />
        </main>
    )
}

const OrderedItems = ({ consumption, orderedItems }) => {
    return (
        <>
            <section className='flex flex-col justify-center items-center w-full'>
            </section>
            <MachineList machines={orderedItems} />
        </>
    )
}
export default Consumption;
