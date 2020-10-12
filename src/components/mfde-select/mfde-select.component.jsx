import React from 'react'

import Select from 'react-select'

import './mfde-select.styles.css'

export const MFDESelect = ({optionsData,onChange,defaultLabel,defaultValue}) => {
    return (
        <div className='mfdeselect'>
            <Select 
            options={optionsData.map(optionData => ({ label: optionData.label, value: optionData.value }))} 
            placeholder="Select..."
            onChange={onChange}
            defaultValue={{ label: defaultLabel, value: defaultValue }}
            />
        </div>
    )
}