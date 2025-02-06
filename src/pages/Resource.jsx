import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Example from '../components/BarChart';
import MaterialGroupChart from '../components/PieChart';
import TableComponent from '../components/Table';
import ImpactScoreCalculator from '../components/Jauge';
import 'react-toastify/dist/ReactToastify.css';

const Resources = () => {
    const resources = useLoaderData();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard des Ressources</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {/* Top Row */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Pie Chart */}
                        <div className="bg-white p-4 rounded-2xl shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Répartition des Matériaux par Catégorie</h2>
                            <MaterialGroupChart />
                        </div>
                        
                        {/* Impact Score Gauge */}
                        <div className="bg-white p-4 rounded-2xl shadow-md">
                            <ImpactScoreCalculator />
                        </div>
                    </div>
                </div>

                {/* Table on the right */}
                <div className="bg-white p-4 rounded-2xl shadow-md h-fit">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Fréquence des Composants</h2>
                    <div className="max-h-[300px] overflow-y-auto">
                        <TableComponent />
                    </div>
                </div>

                {/* Bottom Row - Bar Chart */}
                <div className="lg:col-span-3 bg-white p-4 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Volume des Matières par Type</h2>
                    <Example />
                </div>
            </div>
        </div>
    );
};

export default Resources;