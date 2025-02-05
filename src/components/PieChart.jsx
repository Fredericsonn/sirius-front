import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { spring } from '../util';

// Catégories des matériaux
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
        const resources = response.data;
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

  // Fonction pour traiter les données et regrouper par catégories
  const processData = (resources) => {
    const categorySums = {};

    resources.forEach(machine => {
      machine.resources.forEach(resource => {
        resource.matters.forEach(matter => {
          const { value, volume } = matter;
          // Trouver la catégorie du matériau
          for (const [category, materials] of Object.entries(categories)) {
            if (materials.includes(value)) {
              categorySums[category] = (categorySums[category] || 0) + volume;
              break;
            }
          }
        });
      });
    });

    // Convertir en format adapté pour le PieChart
    return Object.entries(categorySums).map(([name, value]) => ({
      name,
      value
    }));
  };

  // Couleurs pour chaque catégorie
  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'
  ];

  // Fonction pour afficher les étiquettes personnalisées
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, value
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
        {`${value.toFixed(1)}`}
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