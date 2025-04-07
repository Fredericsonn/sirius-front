import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { spring } from '../util';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userState.user);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user);
        const response = await spring.get('/machines');
        setData(response.data.devices.concat(response.data.vehicles));
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    
    fetchData();
  }, [user]);
  
  const calculateFrequency = (data) => {
    const frequency = {};
    
    data.forEach(machine => {
      machine.resources.forEach(resource => {
        if (frequency[resource.name]) {
          frequency[resource.name]++;
        } else {
          frequency[resource.name] = 1;
        }
      });
    });
    
    return Object.entries(frequency)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const frequencyData = calculateFrequency(data);

  const tableStyles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '1rem',
    },
    th: {
      backgroundColor: '#f3f4f6',
      padding: '12px',
      textAlign: 'left',
      borderBottom: '2px solid #e5e7eb',
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #e5e7eb',
    },
    rightAlign: {
      textAlign: 'right',
    }
  };

  return (
    <div style={tableStyles.container}>
      <h2 style={tableStyles.title}>Fréquence des Composants</h2>
      <table style={tableStyles.table}>
        <thead>
          <tr>
            <th style={tableStyles.th}>Nom du Composant</th>
            <th style={{...tableStyles.th, ...tableStyles.rightAlign}}>Nombre d'Occurrences</th>
          </tr>
        </thead>
        <tbody>
          {frequencyData.map((item) => (
            <tr key={item.name}>
              <td style={tableStyles.td}>{item.name}</td>
              <td style={{...tableStyles.td, ...tableStyles.rightAlign}}>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;