import React, { useState } from 'react';
import MachineItem from './MachineItem';

const MachineList = ({machines}) => {
  
  return (
    <div className="p-4 mt-6">
      <h1 className="text-2xl font-bold text-white mb-6">Consumption Items :</h1>

      {/* Affichage des machines */}
      {machines.length > 0 ? (
        machines.map((machine, index) => (
          <MachineItem
            key={index}
            img={machine.img}
            nom={machine.nom}
            empreinteCarbone={machine.empreinteCarbone}
            quantite={machine.quantite}
            urgence={machine.urgence}
            categorie={machine.categorie}
            substitutions={machine.substitutions}
            mir={machine.mir}
          />
        ))
      ) : (
        <p className="text-gray-500">Aucune machine à afficher.</p>
      )}
    </div>
  );
};

export default MachineList;

