import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
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
=======
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { spring } from '../util';

const categories = {
  "Métaux précieux": ["Or"],
  "Métaux de base": ["Cuivre", "Aluminium", "Nickel"],
  "Alliages et métaux industriels": ["Acier", "Néodyme", "Terres rares", "Cobalt", "Lithium"],
  "Polymères": ["Plastique"],
  "Matériaux vitreux": ["Verre", "Silicium"],
  "Encres": ["Encre"],
};
const MaterialGroupChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await spring.get('/machines');
        const resources = response.data.devices.concat(response.data.vehicles);
        const processedData = processData(resources);
        setChartData(processedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (resources) => {
    const categorySums = {};

    resources.forEach(machine => {
      machine.resources.forEach(resource => {
        resource.matters.forEach(matter => {
          const { value, volume } = matter;
          for (const [category, materials] of Object.entries(categories)) {
            if (materials.includes(value)) {
              categorySums[category] = (categorySums[category] || 0) + volume;
              break;
            }
          }
        });
      });
    });

    return Object.entries(categorySums).map(([name, value]) => ({
      name,
      value
    }));
  };

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'
  ];

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return <div className="text-center p-4">Chargement des données...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Erreur: {error}</div>;
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value.toFixed(1)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MaterialGroupChart;
>>>>>>> 3aa184544ff5a491259109f97ea9275cb9ddae5a
