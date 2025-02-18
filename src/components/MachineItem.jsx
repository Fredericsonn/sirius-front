import React, { useState } from 'react';

const MachineItem = ({ img, nom, empreinteCarbone, quantite, urgence, categorie, substitutions }) => {
  const [afficherSubstitutions, setAfficherSubstitutions] = useState(false);
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
          <p>Intensité carbone : {intensiteCarbone} Kg CO₂</p>
          <p>Urgence : {urgence}</p>
          <p>Catégorie : {categorie}</p>
        </div>

        {/* Bouton pour afficher/cacher les substitutions */}
        <button 
          onClick={() => setAfficherSubstitutions(!afficherSubstitutions)} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {afficherSubstitutions ? 'Cacher les substitutions' : 'Voir les substitutions'}
        </button>
      </div>

      {/* Liste des produits de substitution */}
      {afficherSubstitutions && (
        <div className="mt-4 bg-gray-700 p-3 rounded">
          <h3 className="text-lg font-bold mb-2">Produits de substitution :</h3>
          <ul className="list-disc list-inside">
            {substitutions.map((produit, index) => (
              <li key={index} className="mb-1">
                {produit.nom} - {produit.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MachineItem;



