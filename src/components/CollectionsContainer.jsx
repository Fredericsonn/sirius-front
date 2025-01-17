import React from 'react';
import CollectionItem from './CollectionItem';
import AddNew from './AddNew';

const CollectionsContainer = ({collections}) => {
    return (
        <div className='flex justify-around flex-wrap gap-y-5 mt-6'>
            {collections.map((collection) => <CollectionItem id={1} img="/images/machine.png" name="kicthen" machinesNumber={10}/>)}
            <AddNew text="collection"/>
        </div>
    )
}

export default CollectionsContainer;