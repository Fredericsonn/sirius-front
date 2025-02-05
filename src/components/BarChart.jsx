import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { spring } from '../util'; // Remplacez par votre client API
export const loader = async () => {
    try {
        console.log("Début du loader");

        // Récupère les données des machines depuis le backend
        const response = await spring.get('/machines');
        console.log("Réponse de l'API :", response);

        const resources = response.data; // Extrait les données de la réponse
        console.log("Données brutes reçues :", resources);

        // Objet pour stocker la somme des volumes par matière
        const matterVolumes = {};

        // Parcourir les machines et leurs ressources pour agréger les volumes
        resources.forEach(machine => {
            machine.resources.forEach(resource => {
                resource.matters.forEach(matter => {
                    const matterName = matter.value; // Nom de la matière (ex: "Plastique")
                    const volume = matter.volume; // Volume de la matière

                    // Ajouter le volume à la somme existante pour cette matière
                    if (matterVolumes[matterName]) {
                        matterVolumes[matterName] += volume;
                    } else {
                        matterVolumes[matterName] = volume;
                    }
                });
            });
        });

        console.log("Volumes agrégés par matière :", matterVolumes);

        // Transformer l'objet matterVolumes en un tableau d'objets { name, value }
        const formattedData = Object.keys(matterVolumes).map(matterName => ({
            name: matterName,
            value: matterVolumes[matterName]
        }));

        console.log("Données formatées :", formattedData); // Affiche les données formatées dans la console
        return formattedData; // Retourne les données formatées
    } catch (error) {
        console.error("Erreur dans le loader :", error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
};const Example = () => {
    const [data, setData] = useState([]); // État pour stocker les données

    // Utiliser useEffect pour appeler le loader et mettre à jour l'état
    useEffect(() => {
        console.log("useEffect déclenché");

        const fetchData = async () => {
            try {
                console.log("Appel du loader...");
                const formattedData = await loader();
                console.log("Données récupérées :", formattedData);
                setData(formattedData); // Mettre à jour l'état avec les données
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []); // Déclencher l'effet une seule fois au montage

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data} // Utiliser les données de l'état
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Example;