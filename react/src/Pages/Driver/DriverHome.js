import React from 'react';

import banner from '../../Assets/delivery-home.webp';

import './index.css';

const DriverHome = () => {
    return(
        <div className='delivery-home'>
            <img src={banner} alt='food-delivery-app' className='delivery-img' />
        </div>
    )
}

export default DriverHome;
