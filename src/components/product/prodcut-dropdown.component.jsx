import React from 'react'
import Select from 'react-select'

export const ProductDropdown = ({products,placeholder, handleProductChange}) =>(
    <div className="citydropdown">
        <Select
            options={products.map(product =>({label:product.label,value:product.value}))}
            placeholder={placeholder}
            onChange={handleProductChange}
            ></Select>
    </div>
)