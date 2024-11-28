import React from 'react'

const SelectInput = (props) => {
    const { name, label, placeholder, options, size, defaultValue } = props;

    return (
        <div className="form-control">
            <label name={name} className="label">
                <span className="label-text capitalize">{label}</span>
            </label>
            <select name={name}
                id={label}
                defaultValue={defaultValue}
                className={`select select-bordered ${size}`}>
                    <option key={placeholder} value='' selected disabled>{placeholder}</option>
                {
                    options.map((option) => {
                        return <option key={option} value={option}>
                            {option}
                        </option>
                    })
                }
            </select>
        </div>
    )
}

export default SelectInput