import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRestaurants } from '../../Functions/Auth';
import { toast } from 'react-toastify';

const AdminDashboard = ({ statusModify }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [restaurantsDet, setRestaurantsDet] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (user) {
            getRestaurants(user?.token)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch({
                            type: 'REGISTERED_RESTAURANTS',
                            payload: res.data.restaurants
                        })
                        if (statusModify) {
                            setRestaurantsDet(res.data.restaurants.filter(restaurant => restaurant?.status === 'requested'));
                            setTitle('Dashboard');
                        } else {
                            setRestaurantsDet(res.data.restaurants);
                            setTitle('Manage Restaurants');
                        }
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    toast.error(error);
                    setLoading(false);
                })
        }
    }, [user, statusModify])

    return (
        <div className='row mt-5 pt-5 mx-md-2 d-flex justify-content-center'>
            <div className='col-lg-8 col-10 px-md-4 px-3 shadow'>
                {
                    loading ? <h3 className='text-center m-3'>Loading...</h3> :
                        <form className='row px-lg-3 py-lg-3 d-flex justify-content-center'>
                            <h3 className='text-center mb-3'>{title || 'Admin Dashboard'}</h3>
                            <div className='row p-3'>
                                {restaurantsDet?.length > 0 && restaurantsDet?.map(restaurant =>
                                    <ul className='list-group p-3 my-2 d-flex flex-row shadow'>
                                        <li className='list-group-item bg-transparent border-0 p-0 m-0 w-100'>
                                            <ul className='list-group p-0 m-0'>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-5'>{restaurant?.restaurantName}</label>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Contact:</label>
                                                    <span className='ps-2'>
                                                        {restaurant?.restaurantContact}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Email:</label>
                                                    <span className='ps-2'>
                                                        {restaurant?.email}
                                                    </span>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='list-group-item bg-transparent border-0 p-0 m-0 w-100'>
                                            <ul className='list-group p-0 m-0'>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Address:</label>
                                                    <span className='ps-2'>
                                                        {restaurant?.address?.concat(', ', restaurant?.city, ', ', restaurant?.state, ', ', restaurant?.zipCode)}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Cuisines:</label>
                                                    <span className='ps-2'>
                                                        {restaurant?.cuisineType?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Status:</label>
                                                    <span className='ps-2'>
                                                        {restaurant?.status}
                                                    </span>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='list-group-item bg-transparent border-0 m-0 w-50 d-flex text-align-center justify-content-center py-5'>
                                            <Link to={`/${user?.role.concat('-', title?.split(' ').map((word) => word.toLowerCase()).join('-'))}/${restaurant?.restaurantName.trim().split(' ').map((word) => word.toLowerCase()).join('-')}`}>
                                                <button className='btn btn-filled fw-bold'>View</button>
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}

export default AdminDashboard;
