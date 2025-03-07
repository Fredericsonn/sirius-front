import React, { useEffect, useState } from 'react'
import { spring } from '../util'
import { useLoaderData } from 'react-router-dom';
import {MachineList} from '../components';

export const loader = async ({ params }) => {
    const response = await spring.get('/consumptions/' + params.id)
    const consumption = response.data;

    return consumption;
}

/* PS (Ayoub): The code in the useEffect was the loader of a page created by ismail, I merged the 2 pages into one so I turned the old page into a component
                and I replaced the loader with a prop, which as you can I set as a sate varibale that gets set in the useEffect */
const Consumption = () => {
    const consumption = useLoaderData();
    const [orderedItems, setOrderedItems] = useState([]);

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

    return (
        <main className='flex flex-col w-full'>
            <section className='flex flex-col justify-center items-center w-full'>
                <h1 className='text-2xl'>Your consumptions produces:</h1>
                <p className='font-bold text-2xl italic text-center text-secondary underline'>
                    {consumption ? consumption.totalCarbonEmitted : 570} KgCO2</p>
            </section>
            <MachineList machines={orderedItems} />
        </main>
    )
}

export default Consumption;
