import React from 'react'
import './carousel.styles.css'
//import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-elastic-carousel'
import Item from './item.js'
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const CarouselComponent = () => (

    <Carousel itemsToShow={3} focusOnSelect={true} pagination={false}
    onChange={(currentItem)=>alert({currentItem})}>
    <Item vehicle="scooter" > <img alt='scooter' src='../scooter.png' /></Item>
    <Item vehicle="car"><img alt='scooter' src='../car.png' /></Item>
    <Item vehicle="minitruck"><img alt='scooter' src='../minitruck.png' /></Item>
    <Item vehicle="truck"><img alt='scooter' src='../truck.png' /></Item>
    </Carousel>

)

