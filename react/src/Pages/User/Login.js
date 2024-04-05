import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { auth } from '../../firebase';
import { checkUser, currentUser, getCurrentRestaurant } from '../../Functions/Auth';

import './Auth.css';

const Login = ({ title, role }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginTitle, setLoginTitle] = useState('');
    
    useEffect(() => {
        setLoginTitle(title);
    }, [title])

    const rolebasedredirect = (role) => {
        if (role === 'driver') {
            navigate('/driver-home');
        } else if (role === 'partner') {
            navigate('/partner-home');
        } else {
            navigate('/');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        checkUser(email, role)
            .then(res => {
                if (res.status === 202) {
                    toast.error(res.data.message);
                    navigate(res.data.pathname);
                    setLoading(false);
                } else {
                    validateCredentials();
                }
            })
            .catch((err) => {
                toast.error(err);
                setLoading(false);
            })
    }

    const validateCredentials = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                const { user } = res;
                toast.success('Login Success!');
                location.pathname.includes('partner') ? dispatchRestaurantDetails(user) : dispatchUserDetails(user);
                setLoading(false);
            })
            .catch(e => {
                toast.error('Something went wrong...please try again');
                setLoading(false);
            })
    }

    const dispatchUserDetails = async (user) => {
        const idTokenResult = await user.getIdTokenResult();
        let options = [];
        let uaoptions = [];
        currentUser(user.email, idTokenResult.token)
            .then((res) => {
                if (res.status === 200) {
                    const { firstName, lastName, dob, gender, email, contact, address, state, city, zipCode, role, _id } = res.data.user;
                    toast.success(`Welcome ${firstName}! `);
                    const { idToken } = res.config.headers;
                    switch (role) {
                        case 'admin': options = ['Dashboard', 'Add Restaurant', 'Manage Restaurants', 'Manage Users', 'Manage Drivers', 'Manage Profile'];
                            break;
                        case 'driver': options = ['Dashboard', 'Current Order', 'Orders History', 'Manage Profile'];
                            break;
                        default: options = ['Dashboard', 'Current Order', 'Orders History', 'Manage Profile'];
                            break;
                    }
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: { firstName, lastName, dob, gender, email, contact, address, state, city, zipCode, role, _id, options, uaoptions, token: idToken }
                    });
                    rolebasedredirect(role);
                    // navigate(-1);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(() => toast.error('Something went wromg...please try again'))
    }

    const dispatchRestaurantDetails = async (user) => {
        const idTokenResult = await user.getIdTokenResult();
        let options = [];
        getCurrentRestaurant(idTokenResult.token, user.email)
            .then((res) => {
                if (res.status === 200) {
                    const { restaurantName, address, state, city, zipCode, restaurantContact, ownerContact, firstName, lastName, email, establishmentType, outletType, cuisineType, weekDays, opensAt, closesAt, menuImages, restaurantImages, foodImages, status, _id } = res.data.restaurant;
                    toast.success(`Welcome ${firstName}! `);
                    const { idToken } = res.config.headers;
                    options = ['Dashboard', 'Create Cuisine', 'Manage Cuisines', 'Manage Orders', 'Orders History', 'Manage Profile'];
                    dispatch({
                        type: 'LOGGED_IN_RESTAURANT',
                        payload: { restaurantName, address, state, city, zipCode, restaurantContact, ownerContact, firstName, lastName, email, establishmentType, outletType, cuisineType, weekDays, opensAt, closesAt, menuImages, restaurantImages, foodImages, status, _id, options, token: idToken }
                    });
                    // rolebasedredirect('partner');
                    navigate(-1);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(() => toast.error('Something went wromg...please try again'))
    }

    return (
        <div className='container mt-5 login-container'>
            <div className='row mt-5 pt-5'>
                <div className='col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-10 offset-1 shadow p-lg-5 p-md-4 p-3'>
                    <form onSubmit={handleSubmit} className='container-fluid'>
                        <div className='form-group mb-4 text-center'>
                            {loading ? <h3>Loading...</h3> : <h3>{loginTitle}</h3>}
                        </div>
                        <div className='form-group my-3 row p-0'>
                            <label htmlFor='email' className='col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6'>Email</label>
                            <div className='col-md-8 col-12 mb-3 mb-md-1 p-0'>
                                <input
                                    id='email'
                                    type='email'
                                    className='form-control w-100'
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='abc@example.com'
                                />
                            </div>
                        </div>
                        <div className='form-group my-3 row p-0'>
                            <label htmlFor='password' className='col-md-3 d-none d-md-block col-form-label text-xl-end fw-bold fs-6'>Password</label>
                            <div className='col-md-8 col-12 mb-3 mb-md-1 p-0'>
                                <input
                                    id='password'
                                    type='password'
                                    className='form-control w-100'
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password'
                                />
                            </div>
                        </div>


                        <div className='form-group row p-0'>
                            <div className='col-md-4 col-6 offset-md-3 text-start p-0'>
                                <button className='btn btn-raised btn-filled' type='submit' disabled={!email || password.length < 6}>
                                    Login
                                </button>
                            </div>
                        </div>
                        <div className='form-group row p-0 justify-content-end'>
                            <div className='col-md-4 col-10 text-md-start text-end'>
                                <Link to='/reset-password' className='text-danger text-decoration-none'>
                                    Forgot Password
                                </Link>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login;
