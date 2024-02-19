import React from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss"
import './carousel.scss'
import {imgPath} from "../../config/config";


function Carousel({carousel}) {
    const handleDragStart = (e) => e.preventDefault();

    function test() {
        return carousel.map((item) => (
            <div id="item" key={item.id}>
                <img className="rounded" src={imgPath + item?.profile_path} alt={item.character}/>
                <h6>{item.name}</h6>
            </div>
        ))
    }

    const responsive = {
        0: {items: 2},
        568: {items: 4},
        1024: {items: 7},
    }

    return (
        <div>
            <AliceCarousel responsive={responsive}
                           items={test()}
                           mouseTracking
                           disableButtonsControls
                           disableDotsControls
                           autoPlay
                           autoPlayInterval={1000}
                           infinite
            />

        </div>
    );
}

export default Carousel;