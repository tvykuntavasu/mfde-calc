import React from 'react'

import Select from 'react-select'

import './vehicle-dropdown.styles.css'

export const VehicleDropdown = ({vehicles,placeholder,handleVehicleChange}) => {
    return (
        <div className='citydropdown'>
            <Select 
            options={vehicles.map(vehicle => ({ label: vehicle.label, value: vehicle.value }))} 
            placeholder={placeholder}
            onChange={handleVehicleChange}
            />
        </div>
    )
}