import React, { useState } from 'react';
import MachineItem from './MachineItem';

const MachineList = ({machines}) => {
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">List of items ordered by intensity</h1>

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
          />
        ))
      ) : (
        <p className="text-gray-500">Aucune machine à afficher.</p>
      )}
    </div>
  );
};

export default MachineList;

