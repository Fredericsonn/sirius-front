import React from 'react'

const AddNew = ({text}) => {
  return (
    <button className='flex flex-col self-start justify-center items-center gap-3 bg-base-300 rounded-box p-4 cursor-pointer hover:scale-110 duration-300'>
        <img src="/images/add.png" alt={text} className='w-32 h-32'/>
        <p className='text-center font-semibold tracking-wider capitalize'>add new {text}</p>
    </button>
  )
};

export default AddNew;