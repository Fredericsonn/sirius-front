import React from 'react';
import CollectionItem from './CollectionItem';
import AddNew from './AddNew';

const CollectionsContainer = ({collections}) => {
    return (
        <div className='flex gap-6 items-center flex-wrap gap-y-5 mt-6'>
            {collections.map((collection) => {        
                const {id, name, machines} = collection;
                return <CollectionItem key={id} id={id} img="/images/machine.png" name={name} machinesNumber={machines.length}/>;
            })}
            <AddNew text="collection"/>
        </div>
    )
}

export default CollectionsContainer;