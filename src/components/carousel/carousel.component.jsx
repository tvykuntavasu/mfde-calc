import React from "react";
import Slider from "react-slick";
import './carousel.styles.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export const CarouselComponent = ({settings,imageClick}) => {
    return (
        <div >
            <Slider {...settings} onClick={imageClick}>
                <div>
                    <img alt='scooter' src='../scooter.png' />
                </div>
                <div>
                <img alt='car' src='../car.png' />
                </div>
                <div>
                <img alt='trcuk' src='../minitruck.png' />
                </div>
                <div>
                <img alt='minitruck' src='../truck.png' />
                </div>
                
            </Slider>
        </div >
    );
}

/* import './carousel.styles.css'
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

) */

