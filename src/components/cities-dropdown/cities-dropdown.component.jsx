import React from 'react'

import Select from 'react-select'

import './cities-dropdown.styles.css'

export const CitiesDropdown = ({cities,placeholder,handleChange}) => {
    return (
        <div className='citydropdown'>
            <Select 
            options={cities.map(city => ({ label: city.City, value: [city.City,city.AvgSpeed,city["PM2.5"],city.PM10] }))} 
            placeholder={placeholder}
            onChange={handleChange}
            />
        </div>
    )
}