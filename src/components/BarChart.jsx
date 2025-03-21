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
import { spring } from '../util';
export const loader = async () => {
    try {
        console.log("Début du loader");

        const response = await spring.get('/machines');
        console.log("Réponse de l'API :", response);

        const resources = response.data.devices.concat(response.data.vehicles); 
        console.log("Données brutes reçues :", resources);

        const matterVolumes = {};

        resources.forEach(machine => {
            machine.resources.forEach(resource => {
                resource.matters.forEach(matter => {
                    const matterName = matter.value; 
                    const volume = matter.volume; 

                    if (matterVolumes[matterName]) {
                        matterVolumes[matterName] += volume;
                    } else {
                        matterVolumes[matterName] = volume;
                    }
                });
            });
        });

        console.log("Volumes agrégés par matière :", matterVolumes);

        const formattedData = Object.keys(matterVolumes).map(matterName => ({
            name: matterName,
            value: matterVolumes[matterName]
        }));

        console.log("Données formatées :", formattedData); 
        return formattedData; 
    } catch (error) {
        console.error("Erreur dans le loader :", error);
        return []; 
    }
};const Example = () => {
    const [data, setData] = useState([]); 

    useEffect(() => {
        console.log("useEffect déclenché");

        const fetchData = async () => {
            try {
                console.log("Appel du loader...");
                const formattedData = await loader();
                console.log("Données récupérées :", formattedData);
                setData(formattedData); 
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data} 
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