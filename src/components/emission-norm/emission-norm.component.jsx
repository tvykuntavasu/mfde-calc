import React from 'react'

import Select from 'react-select'

import './emission-norm.styles.css'

export const EmissionNorm = ({norms,placeholder,handleNormChange}) => {
    return (
        <div className='citydropdown'>
            <Select 
            options={norms.map(norm => ({ label: norm.label, value: norm.value }))} 
            placeholder={placeholder}
            onChange={handleNormChange}
            />
        </div>
    )
}