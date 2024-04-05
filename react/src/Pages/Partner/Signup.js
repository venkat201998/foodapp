import React, { useEffect, useState } from 'react';

import BottomNav from '../../Components/BottomNav';
import SideNav from './SideNav';
import { useSelector } from 'react-redux';

const SignUp = ({ route, disable, profileUpdate=false }) => {
    const { signup, restaurant } = useSelector((state) => ({ ...state }));
    const [restaurantName, setRestaurantName] = useState(signup?.restaurantName || '');
    const [address, setAddress] = useState(signup?.address || '');
    const [state, setState] = useState(signup?.state || '');
    const [city, setCity] = useState(signup?.city || '');
    const [zipCode, setZipCode] = useState(signup?.zipCode || '');
    const [restaurantContact, setRestaurantContact] = useState(signup?.restaurantContact || '');
    const [ownerContact, setOwnerContact] = useState(signup?.ownerContact || '');
    const [firstName, setFirstName] = useState(signup?.firstName || '');
    const [lastName, setLastName] = useState(signup?.lastName || '');
    const [email, setEmail] = useState(signup?.email || '');
    const [password, setPassword] = useState(signup?.password || '');
    const [confirmPassword, setConfirmPassword] = useState(signup?.confirmPassword || '');
    const [href, setHref] = useState('');
    const [updatePassword, setUpdatePassword] = useState(false);

    useEffect(() => {
        setEmail(window.localStorage.getItem('email') || '');
        setHref(window.location.href || '');
        if (profileUpdate && restaurant) {
            setRestaurantName(restaurant?.restaurantName);
            setAddress(restaurant?.address);
            setState(restaurant?.state);
            setCity(restaurant?.city);
            setZipCode(restaurant?.zipCode);
            setRestaurantContact(restaurant?.restaurantContact);
            setOwnerContact(restaurant?.ownerContact);
            setFirstName(restaurant?.firstName);
            setLastName(restaurant?.lastName);
            setEmail(restaurant?.email);
        }
    }, [profileUpdate && restaurant])

    const validateStates = () => {
        let bool;
        if (!restaurantName || !address || !state || !city || !zipCode || !restaurantContact || !ownerContact || !firstName || !lastName || !email || (updatePassword && password.length < 6 || !(password === confirmPassword))) {
            bool = true;
        } else {
            bool = false
        }
        return bool;
    }

    const handleCheck = () => {
        setUpdatePassword(!updatePassword);
        setPassword('');
        setConfirmPassword('');
    }

    return (
        <div className='partner-signup container mt-5'>
            <div className='row mt-5 pt-5'>
                <SideNav />
                <div className='col-lg-6 col-md-8 col-10 ms-2'>
                    <h2 className='d-flex justify-content-start fw-light lh-lg'>Restaurant Information</h2>
                    <div className='my-3'>
                        <form onSubmit={''} className='container'>
                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Restaurant details</h6>
                                <p className='fw-light text-start m-0'>Name, address and location</p>
                                <div className='col-12 my-3 mb-md-1 px-3'>
                                    <input
                                        id='restaurant-name'
                                        type='text'
                                        className='form-control w-100'
                                        value={restaurantName}
                                        onChange={(e) => setRestaurantName(e.target.value)}
                                        placeholder='Restaurant Name'
                                    />
                                </div>
                                <div className='col-12 my-3 mb-md-1 px-3'>
                                    <input
                                        id='restaurant-address'
                                        type='text'
                                        className='form-control w-100'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder='Restaurant Street Address'
                                    />
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3'>
                                    <input
                                        id='restaurant-state'
                                        type='text'
                                        className='form-control w-100'
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        placeholder='State'
                                    />
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3'>
                                    <input
                                        id='restaurant-city'
                                        type='text'
                                        className='form-control w-100'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder='City'
                                    />
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3'>
                                    <input
                                        id='restaurant-zip-code'
                                        type='text'
                                        className='form-control w-100'
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        placeholder='Zip Code'
                                    />
                                </div>
                            </div>

                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Contact details</h6>
                                <p className='fw-light text-start m-0'>Your customers will call on this number for general enquiries</p>
                                <div className='col-12 input-group my-3 mb-md-1 px-3'>
                                    <span class='input-group-text' id='basic-addon1'>+1</span>
                                    <input
                                        id='restaurant-number'
                                        type='text'
                                        className='form-control'
                                        value={restaurantContact}
                                        onChange={(e) => setRestaurantContact(e.target.value)}
                                        placeholder='Restaurant Contact Number'
                                    />
                                </div>
                            </div>

                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Restaurant owner details</h6>
                                <p className='fw-light text-start m-0'>These will be used to share revenue related communications</p>
                                <div className='col-12 input-group my-3 mb-md-1 px-3'>
                                    <span class='input-group-text' id='basic-addon1'>+1</span>
                                    <input
                                        id='onwer-contact-number'
                                        type='text'
                                        className='form-control'
                                        value={ownerContact}
                                        onChange={(e) => setOwnerContact(e.target.value)}
                                        placeholder='Owner Contact Number'
                                    />
                                </div>
                                <div className='col-6 my-3 mb-md-1 px-3'>
                                    <input
                                        id='owner-firstname'
                                        type='text'
                                        className='form-control w-100'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder='Owner FisrtName'
                                    />
                                </div>
                                <div className='col-6 my-3 mb-md-1 px-3'>
                                    <input
                                        id='onwer-lastname'
                                        type='text'
                                        className='form-control w-100'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder='Owner LastName'
                                    />
                                </div>
                                <div className='col-12 input-group my-3 mb-md-1 px-3'>
                                    <span class='input-group-text' id='basic-addon2'>@</span>
                                    <input
                                        id='onwer-email-address'
                                        type='email'
                                        className='form-control'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={disable}
                                        placeholder='Owner Email Address'
                                    />
                                </div>
                                {profileUpdate && <div class='form-switch col-12 input-group my-3 mb-md-1 px-3'>
                                    <label htmlFor='update-password' className='fs-6 pe-2 h6'>Update Password</label>
                                    <input class='form-check-input margin-left-zero px-2 rounded' type='checkbox' role='switch' id='update-password' onChange={() => handleCheck()} />
                                </div>}
                                {(!profileUpdate || updatePassword) && <>
                                    <div className='col-6 my-3 mb-md-1 px-3'>
                                        <input
                                            id='password'
                                            type='password'
                                            className='form-control w-100'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Password'
                                            required
                                        />
                                    </div>
                                    <div className='col-6 my-3 mb-md-1 px-3'>
                                        <input
                                            id='confirm-password'
                                            type='password'
                                            className='form-control w-100'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder='Confirm Password'
                                            required
                                        />
                                    </div> </>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                <BottomNav
                    validateStates={validateStates()}
                    obj={{ restaurantName, address, state, city, zipCode, restaurantContact, ownerContact, firstName, lastName, email, password, confirmPassword, href, route }}
                    nextRoute={`${route}/restaurant-type`}
                    prevRoute={''}
                />
            </div>
        </div>
    )
}

export default SignUp;
