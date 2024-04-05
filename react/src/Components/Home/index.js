import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Footer from '../Footer';
import pin from '../../Assets/pin-map-fill.svg'
import banner from '../../Assets/banner.png';
import delivery_boy from '../../Assets/delivery-boy-02.avif';
import restaurant from '../../Assets/restaurant-02.avif';
import './index.css';

const Home = () => {
    const [zipCode, setZipCode] = useState('');
    const navigate = useNavigate();

    const handleFetchRestaurants = () => {
        navigate(`/restaurants/${zipCode}`);
    }

    return (
        <div className='home'>
            <div className='banner d-flex align-items-center justify-content-center'>
                <img src={banner} alt='food-app' />
                <div className='input-group w-10'>
                    <span className='input-group-text border-0' id='basic-addon1'><img src={pin} /></span>
                    <input
                        id='zipCode'
                        type='text'
                        className='form-control no-border-input'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder='Zip Code'
                    />
                    <button className={`input-group-text border-0 ${(zipCode && zipCode.length === 5) ? 'pointer-cursor' : 'pointer-none'}`} disabled={!(zipCode && zipCode.length === 5)} id='basic-addon1' onClick={handleFetchRestaurants}><i className='bi bi-arrow-right-circle-fill'></i></button>
                </div>
            </div>
            <div className='row d-flex justify-content-center my-5'>
                <div className='card card-width m-3 p-0'>
                    <img src={delivery_boy} class='card-img-top' alt='delivery-boy' />
                    <div class='card-body'>
                        <h5 class='card-title'>Become a delivery partner</h5>
                        <p class='card-text'>As a delivery driver, you'll make reliable money—working anytime, anywhere.</p>
                        <Link to='/drive-with-us' className='text-decoration-none text-blue'>Start earning <i class="bi bi-arrow-right"></i></Link>
                    </div>
                </div>
                <div className='card card-width m-3 p-0'>
                    <img src={restaurant} class='card-img-top' alt='restaurant' />
                    <div class='card-body'>
                        <h5 class='card-title'>Become a partner</h5>
                        <p class='card-text'>Grow your business and reach new customers by partnering with us.</p>
                        <Link to='/partner-with-us' className='text-decoration-none text-blue'>Start earning <i class="bi bi-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;
