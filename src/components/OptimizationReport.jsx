import React from 'react';

const OptimizationReport = ({ optimizedCarbonFootprint, consumptionItems, optimizedFrequencies, initialAnswers, savedCarbon }) => {
  return (
    <main className='flex flex-col items-center p-4'>
      <h1 className='text-2xl font-bold text-primary mb-4'>Résultats de l'optimisation</h1>

      <p className='text-xl mb-4'>
        Empreinte carbone émise après l'optimisation :{' '}
        <span className='font-semibold text-green-500'>{savedCarbon.toFixed(2)} kgCO2</span>
      </p>

      <h2 className='text-lg font-semibold mb-2'>Détails de l'optimisation :</h2>
      <div className='overflow-x-auto w-full mb-8'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Nom de l'item</th>
              <th>Fréquence initiale</th>
              <th>Fréquence optimisée</th>
            </tr>
          </thead>
          <tbody>
            {consumptionItems.map((item, index) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{initialAnswers[item.id]?.toFixed(2) ?? 'N/A'}</td>
                <td className='text-green-500'>{optimizedFrequencies[index]?.toFixed(2) ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className='text-2xl font-bold mt-8'>
        Bravo, vous avez fait une optimisation de{' '}
        <span className='text-green-500'>{optimizedCarbonFootprint.toFixed(2)}</span> kgCO2 !
      </p>
    </main>
  );
};

export default OptimizationReport;