import React, { useState } from 'react';

const MachineItem = ({ img, nom, empreinteCarbone, quantite, urgence, categorie, mir}) => {
  console.log(mir);
  
  const intensiteCarbone = (empreinteCarbone / quantite).toFixed(2);

  return (
    <div className="flex flex-col bg-gray-800 text-white rounded-lg p-4 mb-4 shadow-md">
      <div className="flex items-center">
        {/* Image à gauche */}
        <div className="flex-shrink-0 mr-4">
          <img 
            src={img} 
            alt="Machine" 
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Description de la machine */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{nom}</h2>
          <p>Daily Carbon Footprint : {intensiteCarbone} Kg CO₂</p>
          <p>Manufacturing Footprint : {mir} Kg CO₂</p>
          {/* <p>Urgency : {urgence}</p>
          <p>Category : {categorie}</p> */}
        </div>

      </div>
    </div>
  );
};

export default MachineItem;



