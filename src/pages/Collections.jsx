import React from 'react'
import { useLoaderData } from 'react-router-dom';
import { CollectionsContainer, CreateNewCollection  } from '../components';
import { spring } from '../util';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const loader = (store) => async () => {
    const user = store.getState().userState.user;
    const response = await spring.get('/api/collection', {params: {userId: user.id}} );
    const collections = response.data;
    return collections;
}

export const action = (store) => async ({request}) => {
    const user = store.getState().userState.user;
    const formData = await request.formData();
    const name = Object.fromEntries(formData).name;

    const data = {name, user, machines:[]}

    try {
        const response = await spring.post('/users/collections/post', data);
        const {msg, collection} = response.data;
        toast.success('collection created successfully', {autoClose: 1500});
        return {msg, collection}
    } catch (error) {
        const errorMesssage = error?.response?.data?.error?.message || 'please double check your credentials';
        toast.error(errorMesssage);
        return null;
    }

}
const Collections = () => {
    const collections = useLoaderData();
    return (
        <>
            <h1 className='sectionTitle'>{collections.length > 0 ? "your collections" : "you haven't created any collections yet"}</h1>
            <CollectionsContainer collections={collections} isAdd={true}/>
            <CreateNewCollection />
        </>
    )
};

export default Collections;