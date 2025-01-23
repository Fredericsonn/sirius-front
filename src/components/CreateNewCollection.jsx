import React from 'react'
import { Form } from 'react-router-dom';

const CreateNewCollection = () => {
  return (
    <dialog id="addNewCollectionModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create New Collection</h3>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById('addCollectionModal').close()}>✕</button>
        <Form method="POST" className='mt-2'>
          <label className='flex-col items-center gap-3'>
            <span className='label-text capitalize'>name</span>
            <div className='pt-2 w-full'>
              <div className='flex justify-between gap-2'>
                <input type="text"
                  placeholder="collection..."
                  name="name"
                  className={`input input-bordered w-full`}
                  required={true}
                  maxLength={20}
                />
                <button type='submit' className='btn btn-secondary btn-md uppercase'>create</button>
              </div>
            </div>
          </label>
        </Form>
      </div>
    </dialog>

  )
}

export default CreateNewCollection;
