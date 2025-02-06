import React from 'react';
import CollectionItem from './CollectionItem';
import AddNew from './AddNew';

const CollectionsContainer = ({collections, isAdd, isSelection, selectedMachines, setMachines}) => {
    return (
        <div className='flex gap-6 items-center flex-wrap gap-y-5 mt-6'>
            {collections.map((collection) => {        
                const {id, name, machines} = collection;
                return <CollectionItem key={id} id={id} img="/images/machine.png" name={name} machines={machines} 
                        machinesNumber={machines.length} isSelection={isSelection} 
                        selectedMachines={selectedMachines} setMachines={setMachines}/>;
            })}
            {isAdd ? (<AddNew text="collection" id='addNewCollectionModal'/>) : ''}
        </div>
    )
}

export default CollectionsContainer;