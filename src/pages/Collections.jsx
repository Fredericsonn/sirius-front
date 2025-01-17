import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { CollectionsContainer } from '../components';

export const loader = async () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
const Collections = () => {
    const collections = useLoaderData();
    return (
        <>
            <h1 className='sectionTitle'>{collections.length > 0 ? "your collections" : "you haven't created any collections yet"}</h1>
            <CollectionsContainer collections={collections}/>
        </>
    )
};

export default Collections;