import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { CollectionsContainer, CreateNewCollection  } from '../components';
import { spring } from '../util';

export const loader = (store) => async () => {
    const user = store.getState().userState.user;
    const response = await spring.get('/users/collections', {params: {userId: user.id}} );
    const collections = response.data;
    return collections;
}

export const action = (store) => async ({request}) => {
    const user = store.getState().userState.user;
}
const Collections = () => {
    const collections = useLoaderData();
    return (
        <>
            <h1 className='sectionTitle'>{collections.length > 0 ? "your collections" : "you haven't created any collections yet"}</h1>
            <CollectionsContainer collections={collections}/>
            <CreateNewCollection />
        </>
    )
};

export default Collections;