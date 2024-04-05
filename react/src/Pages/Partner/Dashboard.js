import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getRestaurant, modifyRestaurantStatus } from '../../Functions/Auth';
import { toast } from 'react-toastify';

const Dashboard = ({ statusModify }) => {
    const { restaurant, user } = useSelector((state) => ({ ...state }));
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [restaurantDet, setRestaurantDet] = useState('');

    useEffect(() => {
        if (restaurant) {
            setRestaurantDet(restaurant);
            setLoading(false);
        } else if (user) {
            getRestaurant(user.token, params.slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' '))
                .then(res => {
                    if (res.status === 200) {
                        setRestaurantDet(res.data.restaurant);
                        toast.success(res.data.message);
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
    }, [statusModify, restaurant, user])

    const handleRestaurantStatus = (e, status) => {
        e.preventDefault();
        setLoading(true);
        modifyRestaurantStatus(user.token, restaurantDet?.email, status)
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
                navigate('/admin-dashboard');
            })
            .catch(error => {
                toast.error(error);
            })
        setLoading(false);
    }

    const sorter = {
        'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6,
    };

    return (
        <div className='row mt-5 pt-5 mx-md-2 d-flex justify-content-center'>
            <div className='col-lg-8 col-10 px-md-4 px-3 shadow'>
                {
                    loading ? <h3 className='text-center m-3'>Loading...</h3> :
                        <form className='row px-lg-5 py-lg-3 d-flex justify-content-center'>
                            <h3 className='text-center mb-3'>{restaurantDet?.restaurantName}</h3>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Contact:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.restaurantContact}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Email:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.email}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Outlet Type:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.outletType?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Cuisines:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.cuisineType?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Establishment Type:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.establishmentType?.split('-and-').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Timings:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.opensAt?.concat(' - ', restaurantDet?.closesAt)}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Days Open:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.weekDays?.sort((a, b) => sorter[a] - sorter[b])?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(', ')}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Status:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.status}
                                </span>
                            </div>
                            <div className='col-lg-12 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Address:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.address?.concat(', ', restaurantDet?.city, ', ', restaurantDet?.state, ', ', restaurantDet?.zipCode)}
                                </span>
                            </div>
                            <div className='col-12 border-top border-3 text-center my-3 pt-3'>
                                <h4 style={{ color: 'gray', borderColor: 'gray' }}>Owner Details</h4>
                            </div>

                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>First Name:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.firstName}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Last Name:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.lastName}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Email:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.email}
                                </span>
                            </div>
                            <div className='col-lg-6 col-md-10 col-12 text-start px-5'>
                                <label className='col-form-label text-start fw-bold fs-6'>Contact:</label>
                                <span className='ps-2'>
                                    {restaurantDet?.ownerContact}
                                </span>
                            </div>

                            {
                                (user?.role === 'admin' && statusModify) && <div className='col-lg-6 col-md-10 col-12 text-center p-5'>
                                    <button className='btn btn-filled fw-bold mx-2' onClick={(e) => handleRestaurantStatus(e, 'approved')}>Approve</button>
                                    <button className='btn btn-hollow fw-bold mx-2' onClick={(e) => handleRestaurantStatus(e, 'declined')}>Decline</button>
                                </div>
                            }

                        </form>
                }
            </div>
        </div>
    )
}

export default Dashboard;
