import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmailLink, updatePassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

import { auth } from '../../firebase';
import './index.css';
import { registerRestaurant } from '../../Functions/Auth';

const BottomNav = ({ validateStates, obj, nextRoute, prevRoute, register = false }) => {
    const { signup, restaurant } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBack = () => {
        navigate(prevRoute);
    }

    const handleNext = async () => {
        if (!validateStates) {
            dispatch({
                type: 'SIGN_UP',
                payload: { ...signup, ...obj }
            })
            navigate(nextRoute);
        }

        if (register === 'signup') {
            try {
                const result = await signInWithEmailLink(auth, signup?.email, signup?.href);
                const user = auth.currentUser;
                const idTokenResult = await user.getIdTokenResult();
                if (result.user.emailVerified) {
                    updatePassword(user, signup?.password);
                    await registerRestaurant(idTokenResult.token, { ...signup, ...obj })
                        .then(res => {
                            if (res.status === 200) {
                                toast.success(res.data.message);
                                dispatch({
                                    type: 'SIGN_UP',
                                    payload: null
                                })
                            } else {
                                toast.error(res.data.message)
                            }
                            navigate('/partner-home');
                        })
                        .catch(e => toast.error(e))
                }
            } catch (error) {
                toast.error(error);
            }
        } else if (register === 'update') {
            await registerRestaurant(restaurant?.token, { ...restaurant, ...signup, ...obj })
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.data.message);
                        dispatch({
                            type: 'SIGN_UP',
                            payload: null
                        });
                        dispatch({
                            type: 'LOGGED_IN_RESTAURANT',
                            payload: {...restaurant, ...res.data.restaurant}
                        })
                    } else {
                        toast.error(res.data.message)
                    }
                    navigate('/partner-manage-profile');
                })
                .catch(e => toast.error(e))
        } else if (register === 'admin-signup') {
            try {
                const result = await createUserWithEmailAndPassword(auth, signup?.email, signup?.password);
                const user = auth.currentUser;
                const idTokenResult = await user.getIdTokenResult();
                if (!result.user.emailVerified) {
                    await registerRestaurant(idTokenResult.token, { ...signup, ...obj, status: 'approved' })
                        .then(res => {
                            if (res.status === 200) {
                                toast.success(res.data.message);
                                dispatch({
                                    type: 'SIGN_UP',
                                    payload: null
                                })
                            } else {
                                toast.error(res.data.message)
                            }
                            navigate('/admin-manage-restaurants');
                        })
                        .catch(e => toast.error(e))
                }
            } catch (error) {
                toast.error(error);
            }
        }
    }

    return (
        <nav className={`navbar navbar-light shadow-lg fixed-bottom navbar-bottom`}>
            <div className='container'>
                <button className={`btn btn-pat-auth-filled ml-20`} onClick={handleBack}>Go Back</button>
                <button className={`btn btn-pat-auth-hollow mr-20`} disabled={validateStates} onClick={handleNext}>Next</button>
            </div>
        </nav>
    )
}

export default BottomNav;
