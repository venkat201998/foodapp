import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BottomNav from '../../Components/BottomNav';
import SideNav from './SideNav';
import './index.css';

const SignUpType = ({ route }) => {
    const { signup, restaurant } = useSelector((state) => ({...state}));
    const [establishmentType, setEstablishmentType] = useState(signup?.establishmentType || '');
    const [outletType, setOutletType] = useState(signup?.outletType || []);
    const [cuisineType, setCuisineTyoe] = useState(signup?.cuisineType || []);
    const [opensAt, setOpensAt] = useState(signup?.opensAt || '');
    const [closesAt, setClosesAt] = useState(signup?.closesAt || '');
    const [weekDays, setWeekDays] = useState(signup?.weekDays || []);

    useEffect(() => {
        if (restaurant) {
            setEstablishmentType(restaurant?.establishmentType);
            setOutletType(restaurant?.outletType);
            setCuisineTyoe(restaurant?.cuisineType);
            setOpensAt(restaurant?.opensAt);
            setClosesAt(restaurant?.closesAt);
            setWeekDays(restaurant?.weekDays);
        }
    }, [restaurant])

    const handleOutletType = (e) => {
        if (e.target.checked) {
            outletType.push(e.target.id)
            setOutletType([...outletType]);
        } else {
            setOutletType([...outletType.filter(outlet => outlet !== e.target.id)]);
        }
    }

    const handleCuisines = (e) => {
        if (e.target.checked) {
            cuisineType.push(e.target.id);
            setCuisineTyoe([...cuisineType]);
        } else {
            setCuisineTyoe([...cuisineType.filter(cuisine => cuisine !== e.target.id)]);
        }
        
    }

    const handleWeekDays = (e) => {
        if (e.target.checked) {
            weekDays.push(e.target.id);
            setWeekDays([...weekDays]);
        } else {
            setWeekDays([...weekDays.filter(day => day !== e.target.id)]);
        }
        
    }

    const validateStates = () => {
        let bool;
        if (!establishmentType || !outletType?.length > 0 || !cuisineType?.length > 0 || !opensAt || !closesAt || !weekDays?.length > 0) {
            bool = true;
        } else {
            bool = false;
        }
        return bool;
    }

    return (
        <div className='partner-signup container mt-5'>
            <div className='row mt-5 pt-5'>
                <SideNav />
                <div className='col-lg-6 col-md-8 col-10 ms-2'>
                    <h2 className='d-flex justify-content-start fw-light lh-lg'>Restaurant Type & Timings</h2>
                    <div className='my-3'>
                        <form onSubmit={''} className='container'>
                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Establishment type</h6>
                                <p className='fw-light text-start m-0'>Select most relevant category for your restaurant type</p>
                                <div className='col-12 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='radio' name='establishment-type' id='delivery-and-dine' onChange={(e) => setEstablishmentType(e.target.id)} checked={establishmentType === 'delivery-and-dine'} />
                                    <label className='form-check-label d-inline' for='delivery-and-dine'>
                                        <h6 className='text-start d-inline-block mb-0'>Both, delivery and dine-in available</h6>
                                        <p className='fw-light text-start checkbox-content'>Select this option when you have a place for customers to dine-in and also want to activate online ordering for your restaurant</p>
                                    </label>
                                </div>
                                <div className='col-12 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='radio' name='establishment-type' id='dine' onChange={(e) => setEstablishmentType(e.target.id)} checked={establishmentType === 'dine'} />
                                    <label className='form-check-label d-inline' for='dine'>
                                        <h6 className='text-start d-inline-block mb-0'>Dine-in only</h6>
                                        <p className='fw-light text-start checkbox-content'>Select when you don't want to register for online ordering</p>
                                    </label>
                                </div>
                                <div className='col-12 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='radio' name='establishment-type' id='delivery' onChange={(e) => setEstablishmentType(e.target.id)} checked={establishmentType === 'delivery'} />
                                    <label className='form-check-label d-inline' for='delivery'>
                                        <h6 className='text-start d-inline-block mb-0'>Delivery only</h6>
                                        <p className='fw-light text-start checkbox-content'>Select when you don't have a facility for customers to dine-in (like delivery kitchens)</p>
                                    </label>
                                </div>
                                <div className='col-12 my-3 mb-md-1 px-3 text-start row'>
                                    <h6 className='text-start'>Select options which best describe your outlet</h6>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='bakery' onChange={(e) => handleOutletType(e)} checked={outletType?.includes('bakery')} />
                                        <label className='form-check-label' for='bakery'>
                                            Bakery
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='beverage-shop' onChange={(e) => handleOutletType(e)} checked={outletType?.includes('beverage-shop')} />
                                        <label className='form-check-label' for='beverage-shop'>
                                            Beverage Shop
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='café' onChange={(e) => handleOutletType(e)} checked={outletType?.includes('café')} />
                                        <label className='form-check-label' for='café'>
                                            Café
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='casual-dining' onChange={(e) => handleOutletType(e)} checked={outletType?.includes('casual-dining')} />
                                        <label className='form-check-label' for='casual-dining'>
                                            Casual Dining
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='club' onChange={(e) => handleOutletType(e)} checked={outletType?.includes('club')} />
                                        <label className='form-check-label' for='club'>
                                            Club
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='cocktail-bar' onChange={(e) => handleOutletType(e)} checked={outletType?.includes('cocktail-bar')} />
                                        <label className='form-check-label' for='cocktail-bar'>
                                            Cocktail Bar
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Type of cuisines</h6>
                                <p className='fw-light text-start m-0'>Select options which best describe food your serve</p>
                                <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='checkbox' value='afghan' id='afghan' onChange={(e) => handleCuisines(e)} checked={cuisineType?.includes('afghan')} />
                                    <label className='form-check-label' for='afghan'>
                                        Afghan
                                    </label>
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='checkbox' value='african' id='african' onChange={(e) => handleCuisines(e)} checked={cuisineType?.includes('african')} />
                                    <label className='form-check-label' for='african'>
                                        African
                                    </label>
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='checkbox' value='' id='american' onChange={(e) => handleCuisines(e)} checked={cuisineType?.includes('american')} />
                                    <label className='form-check-label' for='american'>
                                        American
                                    </label>
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='checkbox' value='' id='andhra' onChange={(e) => handleCuisines(e)} checked={cuisineType?.includes('andhra')} />
                                    <label className='form-check-label' for='andhra'>
                                        Andhra
                                    </label>
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='checkbox' value='' id='arabian' onChange={(e) => handleCuisines(e)} checked={cuisineType?.includes('arabian')} />
                                    <label className='form-check-label' for='arabian'>
                                        Arabian
                                    </label>
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                    <input className='form-check-input me-3' type='checkbox' value='' id='armenian' onChange={(e) => handleCuisines(e)} checked={cuisineType?.includes('armenian')} />
                                    <label className='form-check-label' for='armenian'>
                                        Armenian
                                    </label>
                                </div>
                            </div>

                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Restaurant operational hours</h6>
                                <p className='fw-light text-start m-0'>Mark restaurant opening and closing hours</p>
                                <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                    <label className='form-input-label d-flex justify-content-center py-2' for='opens-at'>
                                        Opens at
                                    </label>
                                    <input
                                        id='opens-at'
                                        type='text'
                                        className='form-control w-100'
                                        value={opensAt}
                                        onChange={(e) => setOpensAt(e.target.value)}
                                        placeholder='--:-- --'
                                    />
                                </div>
                                <div className='col-1 mb-md-1 px-3 text-start d-flex align-items-center justify-content-center'>
                                    <span className='mt-5'>to</span>
                                </div>
                                <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                    <label className='form-input-label d-flex justify-content-center py-2' for='closes-at'>
                                        Closes at
                                    </label>
                                    <input
                                        id='closes-at'
                                        type='text'
                                        className='form-control w-100'
                                        value={closesAt}
                                        onChange={(e) => setClosesAt(e.target.value)}
                                        placeholder='--:-- --'
                                    />
                                </div>
                                <div className='my-4 row'>
                                    <h6 className='text-start'>Mark open days</h6>
                                    <p className='fw-light text-start m-0'>Don't forget to uncheck your off-day</p>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='sunday' onChange={(e) => handleWeekDays(e)} checked={weekDays?.includes('sunday')} />
                                        <label className='form-check-label' for='sunday'>
                                            Sunday
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='monday' onChange={(e) => handleWeekDays(e)} checked={weekDays?.includes('monday')} />
                                        <label className='form-check-label' for='monday'>
                                            Monday
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='tuesday' onChange={(e) => handleWeekDays(e)} checked={weekDays?.includes('tuesday')} />
                                        <label className='form-check-label' for='tuesday'>
                                            Tuesday
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='wednesday' onChange={(e) => handleWeekDays(e)} checked={weekDays?.includes('wednesday')} />
                                        <label className='form-check-label' for='wednesday'>
                                            Wednesday
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='thursday' onChange={(e) => handleWeekDays(e)} checked={weekDays?.includes('thursday')} />
                                        <label className='form-check-label' for='thursday'>
                                            Thursday
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='friday' onChange={(e) => handleWeekDays(e)} checked={weekDays?.includes('friday')} />
                                        <label className='form-check-label' for='friday'>
                                            Friday
                                        </label>
                                    </div>
                                    <div className='col-4 my-3 mb-md-1 px-3 text-start'>
                                        <input className='form-check-input me-3' type='checkbox' value='' id='saturday' onChange={(e) => handleWeekDays(e)} checked={weekDays?.includes('saturday')} />
                                        <label className='form-check-label' for='saturday'>
                                            Saturday
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <BottomNav 
                    validateStates={validateStates()}
                    obj={{ establishmentType, outletType, cuisineType, opensAt, closesAt, weekDays }}
                    nextRoute={`${route}/upload-images`}
                    prevRoute={-1}
                />
            </div>
        </div>
    )
}

export default SignUpType;
