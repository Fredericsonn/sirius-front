import React, { useState } from 'react';

const PopupButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (action) => {
    console.log(`Button clicked: ${action}`);
    // Ajoutez ici la logique pour chaque bouton
  };

  return (
    <div className="flex flex-col items-center">
      {/* Bouton Start */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4"
      >
        Start
      </button>

      {/* Modal/Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Sélectionnez une option</h2>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleButtonClick('collection')}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Collection
              </button>
              
              <button
                onClick={() => handleButtonClick('consommation')}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Consommation
              </button>
              
              <button
                onClick={() => handleButtonClick('machine')}
                className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Machine
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-2 px-4 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupButtons;