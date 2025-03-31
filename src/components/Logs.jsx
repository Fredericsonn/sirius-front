import React, { useState, useEffect } from 'react';
import { spring } from '../util';

const Logs = () => {
  const [collections, setCollections] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const [impactData, setImpactData] = useState({
    impact: null,
    recyclability: null,
    score: null
  });
  const [machineDetails, setMachineDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedMachines, setExpandedMachines] = useState([]);

  const toggleMachineDetails = (machineId) => {
    setExpandedMachines(prev => 
      prev.includes(machineId) 
        ? prev.filter(id => id !== machineId) 
        : [...prev, machineId]
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await spring.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError('Erreur de chargement des utilisateurs');
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const params = selectedUserId ? { params: { user: selectedUserId } } : {};
        const response = await spring.get('/users/collections', params);
        setCollections(response.data);
        setSelectedCollectionId('');
      } catch (err) {
        setError('Erreur de chargement des collections');
      }
    };
    fetchCollections();
  }, [selectedUserId]);

  useEffect(() => {
    const fetchImpactData = async () => {
      if (!selectedCollectionId) return;

      setLoading(true);
      try {
        const impact = await spring.get(`/api/collection/${selectedCollectionId}/impact`);
        const recyclability = await spring.get(`/api/collection/${selectedCollectionId}/recyclable`);
        const score = await spring.get(`/api/collection/${selectedCollectionId}/score`);
        const machineResponse = await spring.get(`/api/collection/${selectedCollectionId}/machines/details`);

        setImpactData({
          impact: impact.data,
          recyclability: recyclability.data.recyclabilityPercentage,
          score: score.data
        });
        
        setMachineDetails(machineResponse.data);
      } catch (err) {
        setError('Erreur de chargement des données d\'impact');
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, [selectedCollectionId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Analyse d'Impact Environnemental</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Utilisateur :</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous les utilisateurs</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.type})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Collection :</label>
        <select
          value={selectedCollectionId}
          onChange={(e) => setSelectedCollectionId(e.target.value)}
          disabled={!collections.length}
          className="w-full mt-2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionnez une collection</option>
          {collections.map(collection => (
            <option key={collection.id} value={collection.id}>
              {collection.name} (Créée le: {new Date(collection.creationDate).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="text-center text-blue-500">Chargement...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {impactData.score !== null && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Empreinte Carbone</h3>
            <p>{impactData.impact?.toFixed(2)} kg CO₂e</p>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Taux de Recyclabilité</h3>
            <div className="w-1/2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${impactData.recyclability}%` }}
              ></div>
            </div>
            <span>{impactData.recyclability?.toFixed(1)}%</span>
          </div>

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Score Global</h3>
            <div className="flex items-center">
              <span className="text-2xl font-bold">{impactData.score?.toFixed(1)}</span>
              <span className={`ml-4 ${getRatingClass(impactData.score)} font-semibold`}>
                {getRatingLabel(impactData.score)}
              </span>
            </div>
          </div>
        </div>
      )}

      {machineDetails.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Détail des machines</h2>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-left">Machine</th>
                <th className="px-4 py-2 border text-left">Empreinte (kg CO₂e)</th>
                <th className="px-4 py-2 border text-left">Recyclabilité (%)</th>
                <th className="px-4 py-2 border text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {machineDetails.map((machine) => (
                <React.Fragment key={machine.id}>
                  <tr className="border-t">
                    <td className="px-4 py-2">{machine.name}</td>
                    <td className="px-4 py-2">{machine.footprint.toFixed(2)}</td>
                    <td className="px-4 py-2">{machine.recyclability.toFixed(1)}%</td>
                    <td className="px-4 py-2">
                      <button 
                        onClick={() => toggleMachineDetails(machine.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        {expandedMachines.includes(machine.id) ? 'Masquer' : 'Détails'}
                      </button>
                    </td>
                  </tr>
                  <tr className={expandedMachines.includes(machine.id) ? '' : 'hidden'}>
                    <td colSpan="6" className="px-4 py-4">
                      <div className="space-y-4">
                        <h4 className="text-xl font-semibold">Composants et Matériaux</h4>
                        {machine.components.map((component) => (
                          <div key={component.id} className="space-y-2">
                            <h5 className="font-semibold">{component.name}</h5>
                            <table className="w-full table-auto">
                              <thead>
                                <tr>
                                  <th className="px-4 py-2 border">Matériau</th>
                                  <th className="px-4 py-2 border">Volume (g)</th>
                                  <th className="px-4 py-2 border">Facteur d'émission</th>
                                  <th className="px-4 py-2 border">Empreinte</th>
                                </tr>
                              </thead>
                              <tbody>
                                {component.materials.map((material) => (
                                  <tr key={material.id}>
                                    <td className="px-4 py-2">{material.name}</td>
                                    <td className="px-4 py-2">{material.volume}</td>
                                    <td className="px-4 py-2">{material.emissionFactor}</td>
                                    <td className="px-4 py-2">{material.footprint}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const getRatingClass = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

const getRatingLabel = (score) => {
  if (score >= 80) return 'Excellent';
  if (score >= 50) return 'Moyenne';
  return 'Mauvais';
};

export default Logs;