import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getRestaurantsByZip, getCuisines, createOrUpdateCart } from '../../Functions/Auth';
import { useHandleCart } from '../../Functions/useHandleCart';
import CuisineCard from '../../Components/Cards/CuisineCard';

const RestaurantHome = () => {
    const { restaurantsByZip, user, cart } = useSelector(state => ({ ...state }));
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [restaurantDet, setRestaurantDet] = useState('');
    const [cuisinesDet, setCuisinesDet] = useState('');
    const [loading, setLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState('');

    let item;

    useEffect(() => {
        if (restaurantsByZip === null) {
            getRestaurantsByZip(params?.zipcode)
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.data.message);
                        item = res.data.restaurants.find(restaurant => restaurant.restaurantName === params?.slug?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '));
                        setRestaurantDet(item);
                        dispatch({
                            type: 'RESTAURANTS_BY_ZIP',
                            payload: res.data.restaurants
                        });
                        handleCommon(item?.email);
                    } else {
                        toast.error(res.data.message);
                        setLoading(false);
                    }
                })
                .catch(error => {
                    toast.error(error);
                    setLoading(false);
                })

        } else {
            item = restaurantsByZip.find(restaurant => restaurant.restaurantName === params?.slug?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '));
            setRestaurantDet(item);
            handleCommon(item?.email);
        }
    }, [restaurantsByZip])

    useEffect(() => {
        if (cart) {
            setCartProducts(cart.items);
        }
    }, [cart])

    const {
        handleAddProduct
    } = useHandleCart({
        setLoading,
        navigate,
        user,
        createOrUpdateCart,
        cartProducts,
        toast,
        dispatch
    });

    const handleCommon = (email) => {
        getCuisines(email)
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    setCuisinesDet(res.data.products);
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

    return (
        <div className='row mt-5 pt-5 mx-md-2 d-flex justify-content-center'>
            <div className='col-10 px-md-4 px-3 shadow'>
                {
                    loading ? <h3 className='text-center m-3'>Loading...</h3> :
                        <div className='row'>
                            <div className='col-4 p-2'>
                                <img src={restaurantDet?.restaurantImages[0].urls[0].url} className='w-100' alt='restaurant-image' />
                            </div>
                            <div className='col-8'>
                                <ul className='list-group pt-4 pb-2 text-start'>
                                    <li className='list-group-item bg-transparent border-0 py-0 m-0 w-50 fw-semibold fs-4'>
                                        {restaurantDet?.restaurantName}
                                    </li>
                                </ul>
                                <ul className='list-group p-0 m-0 d-flex flex-row'>
                                    <ul className='list-group p-0 m-0 text-start w-100'>
                                        <li className='list-group-item bg-transparent border-0 py-0 m-0'>
                                            <label className='col-form-label text-start fw-bold fs-6'>Email:</label>
                                            <span className='ps-2'>
                                                {restaurantDet?.email}
                                            </span>
                                        </li>
                                        <li className='list-group-item bg-transparent border-0 py-0 m-0'>
                                            <label className='col-form-label text-start fw-bold fs-6'>Establishment Type:</label>
                                            <span className='ps-2'>
                                                {restaurantDet?.establishmentType?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                                            </span>
                                        </li>
                                    </ul>
                                    <ul className='list-group p-0 m-0 text-start w-75'>
                                        <li className='list-group-item bg-transparent border-0 py-0 m-0'>
                                            <label className='col-form-label text-start fw-bold fs-6'>Contact:</label>
                                            <span className='ps-2'>
                                                {restaurantDet?.restaurantContact}
                                            </span>
                                        </li>
                                        <li className='list-group-item bg-transparent border-0 py-0 m-0'>
                                            <label className='col-form-label text-start fw-bold fs-6'>Cuisines:</label>
                                            <span className='ps-2'>
                                                {restaurantDet?.cuisineType?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')}
                                            </span>
                                        </li>
                                    </ul>
                                </ul>
                                <ul className='list-group p-0 m-0 text-start'>
                                    <li className='list-group-item bg-transparent border-0 py-0 m-0'>
                                        <label className='col-form-label text-start fw-bold fs-6'>Outlet Type:</label>
                                        <span className='ps-2'>
                                            {restaurantDet?.outletType?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')}
                                        </span>
                                    </li>
                                    <li className='list-group-item bg-transparent border-0 py-0 m-0'>
                                        <label className='col-form-label text-start fw-bold fs-6'>Address:</label>
                                        <span className='ps-2'>
                                            {restaurantDet?.address?.concat(', ', restaurantDet?.city, ', ', restaurantDet?.state, ', ', restaurantDet?.zipCode)}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className='col m-4'>
                                <div className='row'>
                                    {
                                        cuisinesDet?.length > 0 ? <>
                                            <h5 className='text-start'>Food Menu</h5>
                                            {
                                                cuisinesDet.map(cuisine =>
                                                    <CuisineCard
                                                        restaurant={{ name: restaurantDet?.restaurantName, email: restaurantDet?.email }}
                                                        cuisine={cuisine}
                                                        handleAddProduct={handleAddProduct}
                                                    />)
                                            }
                                        </> :
                                            <h5>No Cuisines</h5>
                                    }
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>

    )
}

export default RestaurantHome;
