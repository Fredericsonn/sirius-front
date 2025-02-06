import React, { useState } from 'react';
import MachineItem from '../components/MachineItem';

const MachineList = () => {
  const [id, setId] = useState('');
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');

  const handleFetchMachines = async () => {
    setError(''); // Reset errors
    try {
      const response = await fetch(`http://localhost:8080/comsumptions/${id}/items`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ID: ${id}`);
      }
      const data = await response.json();

      // Mapper les données du back pour les adapter au component MachineItem
      const formattedMachines = data.map((item) => {
        const intensiteCarbone = item.carbonFootprint / item.quatity;

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
          nom: item.nom || 'Nom non disponible', // Si "nom" n'existe pas
          empreinteCarbone: item.carbonFootprint,
          quantite: item.quatity,
          urgence: urgence,
          categorie: categorie,
          substitutions: item.substitutions || [], // Si "substitutions" n'existe pas
        };
      });

      setMachines(formattedMachines);
    } catch (error) {
      setError(error.message);
      setMachines([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Liste des machines ordonnées</h1>

      {/* Champ pour entrer l'ID */}
      <div className="mb-6">
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Entrez l'ID de consommation"
          className="border border-gray-400 rounded px-4 py-2 mr-4"
        />
        <button
          onClick={handleFetchMachines}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Charger les machines
        </button>
      </div>

      {/* Affichage des erreurs */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Affichage des machines */}
      {machines.length > 0 ? (
        machines.map((machine, index) => (
          <MachineItem
            key={index}
            nom={machine.nom}
            empreinteCarbone={machine.empreinteCarbone}
            quantite={machine.quantite}
            urgence={machine.urgence}
            categorie={machine.categorie}
            substitutions={machine.substitutions}
          />
        ))
      ) : (
        !error && <p className="text-gray-500">Aucune machine à afficher.</p>
      )}
    </div>
  );
};

export default MachineList;

