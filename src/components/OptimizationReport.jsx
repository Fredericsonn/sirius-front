import React from 'react';

const OptimizationReport = ({ 
  optimizedCarbonFootprint, 
  consumptionItems, 
  optimizedFrequencies, 
  initialAnswers, 
  savedCarbon 
}) => {
  // Calculate initial carbon footprint (sum of all initial frequencies)
  const initialCarbonFootprint = consumptionItems.reduce((sum, item) => {
    return sum + (initialAnswers[item.id] || 0);
  }, 0);

  return (
    <main className='flex flex-col items-center p-4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold text-primary mb-6'>Résultats de l'optimisation</h1>

      {/* Carbon Footprint Summary */}
      <div className='w-full bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-xl font-bold mb-4 text-gray-800'>Résumé de l'empreinte carbone</h2>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-blue-50 p-4 rounded-lg'>
            <h3 className='font-semibold text-gray-700'>Initiale</h3>
            <p className='text-2xl font-bold'>{initialCarbonFootprint.toFixed(2)} kgCO2</p>
          </div>
          
          <div className='bg-green-50 p-4 rounded-lg'>
            <h3 className='font-semibold text-gray-700'>Optimisée</h3>
            <p className='text-2xl font-bold text-green-600'>{optimizedCarbonFootprint.toFixed(2)} kgCO2</p>
          </div>
          
          <div className='bg-purple-50 p-4 rounded-lg'>
            <h3 className='font-semibold text-gray-700'>Économie</h3>
            <p className='text-2xl font-bold text-purple-600'>{savedCarbon.toFixed(2)} kgCO2</p>
            <p className='text-sm text-gray-500'>
              (Réduction de {((savedCarbon / initialCarbonFootprint) * 100).toFixed(1)}%)
            </p>
          </div>
        </div>
      </div>

      {/* Frequency Comparison Table */}
      <div className='w-full bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-xl font-bold mb-4 text-gray-800'>Détails par équipement</h2>
        
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Équipement</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fréquence initiale</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Fréquence optimisée</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Réduction</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {consumptionItems.map((item, index) => {
                const initial = initialAnswers[item.id] || 0;
                const optimized = optimizedFrequencies[index] || 0;
                const reduction = initial - optimized;
                
                return (
                  <tr key={item.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{initial.toFixed(2)}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <span className={optimized < initial ? 'text-green-600 font-medium' : ''}>
                        {optimized.toFixed(2)}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      {reduction > 0 ? (
                        <span className='text-green-600 font-medium'>-{reduction.toFixed(2)}</span>
                      ) : (
                        <span className='text-gray-500'>0.00</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className='text-center p-6 bg-blue-50 rounded-lg w-full'>
        <h2 className='text-2xl font-bold text-blue-800 mb-2'>Résumé</h2>
        <p className='text-lg'>
          Vous avez réduit votre empreinte carbone de{' '}
          <span className='font-bold text-blue-600'>{savedCarbon.toFixed(2)} kgCO2</span>, soit{' '}
          <span className='font-bold text-blue-600'>
            {((savedCarbon / initialCarbonFootprint) * 100).toFixed(1)}%
          </span>{' '}
          de réduction !
        </p>
      </div>
    </main>
  );
};

export default OptimizationReport;