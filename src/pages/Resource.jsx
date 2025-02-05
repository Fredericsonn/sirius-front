import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { spring } from '../util';
import 'react-toastify/dist/ReactToastify.css';
import Example from '../components/BarChart';

// Loader pour récupérer les données
export const loader = (store) => async () => {
    const user = store.getState().userState.user;
    console.log(user); // Affiche l'utilisateur actuel dans la console
    const response = await spring.get('/machines'); // Récupère les données des machines
    const resources = response.data; // Extrait les données de la réponse
    return resources; // Retourne les données pour le composant
};

// Composant Resources
const Resources = () => {
    const resources = useLoaderData(); // Récupère les données passées par le loader

    return (
       <Example />
    );
};

export default Resources;