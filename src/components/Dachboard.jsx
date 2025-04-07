import React from 'react';
import NavBar from './Navbar';
import { BarChartOnValueChangeExample } from './graphe';
import { DonutChartOnValueChangeExample } from './PieTest';

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <BarChartOnValueChangeExample />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <DonutChartOnValueChangeExample />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;