import React, { useContext, useEffect, useState } from 'react'
import { spring } from '../util';
import { CatalogContext } from '../pages/Catalog';

const CatalogHeader = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await spring.get('/usageCategories');
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error('Error getting categories:', error);
      }
    };

    getCategories(); 
  }, []); 
  return (
    <header className='flex justify-between w-full items-center'>
      {categories.map((category) => {
        return <CatalogElement key={category} element={category} />
      })}
    </header>
  )
};

const CatalogElement = ({ element }) => {
  const img = header_details.find((category) => category.name === element).img;

  const setMachines = useContext(CatalogContext);

  const getMachinesByCategory = async (category) => {
    
    const response = await spring.get('/machines/' + category);
    const machines = response.data;
    setMachines(machines);
  }

  const name_rectifier = (name) => {
    if (name === "HOME_APPLIANCES") {
      return "HOME APPLIANCES";
    }

    if (name === "ENTERPRISE_INFRASTRUCTURE") {
      return "ENTERPRISE INFRASTRUCTURE";
    }

    else return name;
  }

  return (
    <button onClick={() => getMachinesByCategory(element)} className='flex gap-2 justify-center items-center w-36 hover:scale-110 duration-200'>
      <img src={img} alt={element} className='object-cover w-12 h-12' />
      <p className='text-lg tracking-wide font-mono font-semibold'>{name_rectifier(element)}</p>
    </button>
  )
}
const header_details = [
  { name: 'IT', img: '/images/usage category/IT.png' },
  { name: 'HOME_APPLIANCES', img: '/images/usage category/home appliances.png' },
  { name: 'TRANSPORT', img: '/images/usage category/transport.png' },
  { name: 'OUTDOOR', img: '/images/usage category/outdoor.png' },
  { name: 'ENTERPRISE_INFRASTRUCTURE', img: '/images/usage category/server.png' },
  { name: 'OTHER', img: '/images/usage category/more.png' }
]
export default CatalogHeader;