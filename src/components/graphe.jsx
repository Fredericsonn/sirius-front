"use client";
import React, { useState, useEffect } from "react";
import { BarChart } from "@tremor/react";
import { spring } from '../util';

// Loader function to fetch data
export const loader = async () => {
    try {
        const response = await spring.get('/machines');
        const data = response.data;
        console.log('Data received:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Function to transform the data
export const transformData = (data) => {
    const materialMap = new Map();

    data.forEach((machine) => {
        machine.resources.forEach((resource) => {
            resource.matters.forEach((matter) => {
                const { value, volume } = matter;
                materialMap.set(value, (materialMap.get(value) || 0) + volume);
            });
        });
    });

    return Array.from(materialMap).map(([name, sumVolumes]) => ({
        name: name,
        "Sum of Volumes": sumVolumes,
    }));
};

export const BarChartOnValueChangeExample = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const machinesData = await loader();
                const transformedData = transformData(machinesData);
                setData(transformedData);
            } catch (error) {
                console.error('Error in fetching or transforming data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <BarChart
                className="h-72"
                data={data}
                index="name"
                categories={["Sum of Volumes"]}
                yAxisWidth={45}
                onValueChange={(v) => setValue(v)}
            />
            <pre className="mt-8 rounded-md bg-gray-950 p-3 text-sm text-white dark:bg-gray-800">
                {JSON.stringify(value, null, 2)}
            </pre>
        </>
    );
};

export default BarChartOnValueChangeExample;