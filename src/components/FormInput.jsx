import React from 'react'

const FormInput = (props) => {
    const {id, label, name, type, placeholder, defaultValue, size, required, min, max, isError, errorText, onChange} = props;

    return (
        <label className="form-control w-full">
            <div className="label">
                <span className="label-text capitalize">{label}{required ? <span className='text-red-700'>*</span> : ''}</span>
            </div>
            <input type={type} 
                   id={id}
                   placeholder={placeholder} 
                   name={name} 
                   className={`input input-bordered ${size}`} 
                   defaultValue={defaultValue}
                   required={required}
                   min={min}
                   max={max}
                   onChange={(e) => onChange(e)}/>
            <p className={`text-red-700 m-0 ml-1 mt-1 text-sm tracking-wide ${isError ? '' : 'hidden'}`}>{errorText}</p>
        </label>
    )
}

export default FormInput;