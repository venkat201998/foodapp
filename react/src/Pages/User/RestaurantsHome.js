import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getRestaurantsByZip } from '../../Functions/Auth';

const RestauarntsHome = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [transit, setTransit] = useState('delivery');
    const [restaurantsDet, setRestaurantsDet] = useState('');
    let outletArr = ['Bakery', 'Beverage Shop', 'Café', 'Casual Dining', 'Club', 'Cocktail Bar'];
    let cuisineArr = ['Afghan', 'African', 'American', 'Andhra', 'Arabian', 'Armenian'];

    useEffect(() => {
        if (params?.slug) {
            getRestaurantsByZip(params?.slug)
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.data.message);
                        dispatch({
                            type: 'RESTAURANTS_BY_ZIP',
                            payload: res.data.restaurants
                        })
                        setRestaurantsDet(res.data.restaurants);
                    } else {
                        toast.error(res.data.message);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    toast.error(error);
                    setLoading(false);
                })
        }
    }, [params?.slug])

    const handleClick = (e, str) => {
        e.preventDefault();
        setTransit(str);
    }

    const handleRestaurant = (name) => {
        navigate(`/restaurants/${params?.slug}/${name?.split(' ').map((word) => word.toLowerCase()).join('-')}`);
    }

    return (
        <div className='row mt-5 pt-5 mx-md-2 d-flex justify-content-center'>
            <div className='col-9 px-md-4 px-3 shadow'>
                {
                    loading ? <h3 className='text-center m-3'>Loading...</h3> :
                        <form className='row d-flex justify-content-center'>
                            <div class='row my-3 mx-md-2'>
                                <ul className='list-group p-0 m-0 w-25'>
                                    <li className='list-group-item bg-transparent border border-blue rounded-pill d-flex flex-row p-0 m-0'>
                                        <button id='pickup' className={`btn border-none rounded-pill w-100 fs-6 ${transit === 'pickup' && 'btn-active'}`} onClick={(e) => handleClick(e, 'pickup')}>
                                            Pickup
                                        </button>
                                        <button id='delivery' className={`btn border-none rounded-pill w-100 fs-6 ${transit === 'delivery' && 'btn-active'}`} onClick={(e) => handleClick(e, 'delivery')}>
                                            Delivery
                                        </button>
                                    </li>
                                </ul>
                                <div className='row mt-4'>
                                    <p className='text-start fs-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                                <div className='row mt-4'>
                                    <h5 className='text-start'>Outlet Type</h5>
                                    <ul className='list-group p-0 d-flex flex-row'>
                                        {
                                            outletArr?.map(outlet => <li className='list-group-item bg-transparent border rounded m-2'>
                                                {outlet}
                                            </li>)
                                        }
                                    </ul>
                                </div>
                                <div className='row mt-4'>
                                    <h5 className='text-start'>Cuisine</h5>
                                    <ul className='list-group p-0 d-flex flex-row'>
                                        {
                                            cuisineArr?.map(cuisine => <li className='list-group-item bg-transparent border rounded m-2'>
                                                {cuisine}
                                            </li>)
                                        }
                                    </ul>
                                </div>
                                <div className='row mt-4'>
                                    {
                                        restaurantsDet?.length > 0 ? <>
                                            <h5 className='text-start'>Restaurants</h5>
                                            {
                                                restaurantsDet.map(restaurant => <div className='col-6 my-2 cursor-pointer' onClick={() => handleRestaurant(restaurant?.restaurantName)}>
                                                    <ul className='list-item shadow d-flex flex-row p-0 m-0'>
                                                        <li className='list-group-item bg-transparent p-2 m-0 w-50'>
                                                            <img src={restaurant?.restaurantImages[0]?.urls[0]?.url} className='card-img-top' alt='...' />
                                                        </li>
                                                        <ul className='list-item p-0 m-0'>
                                                            <li className='list-group-item bg-transparent p-2 m-0 text-start fw-semibold'>
                                                                {restaurant?.restaurantName}
                                                            </li>
                                                            <li className='list-group-item bg-transparent p-2 text-start m-0'>
                                                                {restaurant?.cuisineType.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                                            </li>
                                                            <li className='list-group-item bg-transparent p-2 text-start m-0'>
                                                                {restaurant?.address?.concat(', ', restaurant?.city)}
                                                            </li>
                                                        </ul>
                                                    </ul>
                                                </div>)
                                            }
                                        </>
                                            : <h5 className='text-center my-3'>No Restaurants Found</h5>
                                    }
                                </div>
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}

export default RestauarntsHome;
