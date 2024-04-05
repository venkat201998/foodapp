import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { getUsers } from '../../Functions/Auth';

const ManageUsers = ({ role, title }) => {
    const { user } = useSelector(state => ({ ...state }));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [usersDet, setUsersDet] = useState('');

    useEffect(() => {
        if (user) {
            getUsers(user.token)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: 'REGISTERED_USERS',
                        payload: res.data.users
                    })
                    setUsersDet(res.data.users.filter(user => role.includes(user.role)));
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error);
                setLoading(false);
            })
        }
    }, [user, role])

    return (
        <div className='row mt-5 pt-5 mx-md-2 d-flex justify-content-center'>
            <div className='col-lg-8 col-10 px-md-4 px-3 shadow'>
                {
                    loading ? <h3 className='text-center m-3'>Loading...</h3> :
                        <form className='row px-lg-3 py-lg-3 d-flex justify-content-center'>
                            <h3 className='text-center mb-3'>{title}</h3>
                            <div className='row p-3'>
                                {usersDet?.length > 0 && usersDet?.map(user =>
                                    <ul className='list-group p-4 my-2 d-flex flex-row shadow'>
                                        <li className='list-group-item bg-transparent border-0 p-0 m-0 w-100'>
                                            <ul className='list-group p-0 m-0'>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-5'>{user?.firstName?.concat(' ', user?.lastName)}</label>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Contact:</label>
                                                    <span className='ps-2'>
                                                        {user?.contact}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Email:</label>
                                                    <span className='ps-2'>
                                                        {user?.email}
                                                    </span>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='list-group-item bg-transparent border-0 p-0 m-0 w-100'>
                                            <ul className='list-group p-0 m-0'>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Date of Birth:</label>
                                                    <span className='ps-2'>
                                                        {user?.dob}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Role:</label>
                                                    <span className='ps-2'>
                                                        {user?.role}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Address:</label>
                                                    <span className='ps-2'>
                                                        {user?.address?.concat(', ', user?.city, ', ', user?.state, ', ', user?.zipCode)}
                                                    </span>
                                                </li>
                                            </ul>
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

export default ManageUsers;
