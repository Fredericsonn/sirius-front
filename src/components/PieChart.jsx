import React, { useState, useEffect } from 'react';
import { DonutChart } from '@tremor/react';
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

export const DonutChartHero = () => {
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
        <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-gray-700 dark:text-gray-300">Variant: `donut`</p>
                <DonutChart
                    data={data}
                    category="name"
                    value="Sum of Volumes"
                    valueFormatter={(number) =>
                        `$${Intl.NumberFormat("us").format(number).toString()}`
                    }
                />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-gray-700 dark:text-gray-300">Variant: `pie`</p>
                <DonutChart
                    data={data}
                    variant="pie"
                    category="name"
                    value="Sum of Volumes"
                    valueFormatter={(number) =>
                        `$${Intl.NumberFormat("us").format(number).toString()}`
                    }
                />
            </div>
        </div>
    );
};

export default DonutChartHero;