import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import machineLoader from '../components/TableLoader';

function Table({ machineLoader }) {
  const [resourceStats, setResourceStats] = useState({
    components: {},
    matters: {}
  });

  useEffect(() => {
    const analyzeData = (machines) => {
      if (!Array.isArray(machines)) {
        console.warn('Data provided is not an array:', machines);
        return { components: {}, matters: {} };
      }

      const stats = {
        components: {},  // Pour compter les composants
        matters: {}      // Pour sommer les volumes de matières
      };

      machines.forEach(machine => {
        if (machine?.resources && Array.isArray(machine.resources)) {
          machine.resources.forEach(resource => {
            // Compter les composants
            if (resource?.name) {
              stats.components[resource.name] = (stats.components[resource.name] || 0) + 1;
            }

            // Sommer les volumes des matières
            if (resource?.matters && Array.isArray(resource.matters)) {
              resource.matters.forEach(matter => {
                if (matter?.value && matter?.volume) {
                  if (!stats.matters[matter.value]) {
                    stats.matters[matter.value] = 0;
                  }
                  stats.matters[matter.value] += matter.volume;
                }
              });
            }
          });
        }
      });

      return stats;
    };

    if (data) {
      setResourceStats(analyzeData(data));
    }
  }, [data]);

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Chargement des données...
      </div>
    );
  }

  if (Object.keys(resourceStats.components).length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Aucune donnée trouvée.
      </div>
    );
  }

  return (
    <div>
      {/* Table des composants */}
      <h3 style={{ marginTop: '20px' }}>Composants</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Composant</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre d'occurrences</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(resourceStats.components)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([component, count]) => (
              <tr key={component}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{component}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{count}</td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Table des matières */}
      <h3 style={{ marginTop: '30px' }}>Matières</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Matière</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Volume total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(resourceStats.matters)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([matter, volume]) => (
              <tr key={matter}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{matter}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                  {volume.toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;