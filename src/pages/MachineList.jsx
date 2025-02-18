import React, { useState } from 'react';
import MachineItem from '../components/MachineItem';
import { spring } from '../util';
import { useLoaderData } from 'react-router-dom';

export const loader = async ({params}) => {

  const response = await spring.get(`/consumptions/${params.id}/items`);
  const data = response.data;

  // Mapper les données du back pour les adapter au component MachineItem
  const formattedMachines = data.map((item) => {

    const intensiteCarbone = item.carbonFootprint / item.quantity;

    // Mapper urgence
    let urgence = 'Faible';
    if (intensiteCarbone > 100) {
      urgence = 'Critique';
    } else if (intensiteCarbone > 50) {
      urgence = 'Moyenne';
    }

    // Mapper catégorie
    let categorie = 'E';
    if (intensiteCarbone <= 20) categorie = 'A';
    else if (intensiteCarbone <= 40) categorie = 'B';
    else if (intensiteCarbone <= 60) categorie = 'C';
    else if (intensiteCarbone <= 100) categorie = 'D';

    return {
      img: item.machine.img,
      nom: item.name || 'Nom non disponible', // Si "nom" n'existe pas
      empreinteCarbone: item.carbonFootprint,
      quantite: item.quantity,
      urgence: urgence,
      categorie: categorie,
      substitutions: item.substitutions || [], // Si "substitutions" n'existe pas
    };
  });
  return formattedMachines;
}
const MachineList = () => {
  const machines = useLoaderData();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Liste des machines ordonnées</h1>

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

