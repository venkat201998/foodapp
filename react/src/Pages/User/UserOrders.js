import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getOrdersByUser } from '../../Functions/Auth';

const UserOrders = ({ title, userOrderStatus }) => {
    const { user } = useSelector(state => ({ ...state }));
    const [loading, setLoading] = useState(true);
    const [ordersDet, setOrdersDet] = useState('');

    useEffect(() => {
        if (user) {
            const { email, token } = user;
            getOrdersByUser(token, email, userOrderStatus)
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.data.message);
                        setOrdersDet(res.data.items);
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
    }, [title, user])

    return (
        <div className='row mt-5 pt-5 mx-md-2 d-flex justify-content-center'>
            <div className='col-lg-8 col-10 px-md-4 px-3 shadow'>
                {
                    loading ? <h3 className='text-center m-3'>Loading...</h3> :
                        <form className='row px-lg-3 py-lg-3 d-flex justify-content-center'>
                            <h3 className='text-center mb-3'>{title}</h3>
                            <div className='row p-3'>
                                {ordersDet?.length > 0 && ordersDet?.map(order =>
                                    <ul className='list-group p-4 my-2 shadow'>
                                        <li className='border-0 p-0 m-0 row'>
                                            {order?.cuisines?.map(cuisine =>
                                                <ul className='list-group p-0 m-0 col-6'>
                                                    <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                        <label className='col-form-label text-start fw-bold fs-5'>{cuisine?.title}</label>
                                                    </li>
                                                    <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                        <label className='col-form-label text-start fw-bold fs-6'>Count:</label>
                                                        <span className='ps-2'>
                                                            {cuisine?.count}
                                                        </span>
                                                    </li>
                                                    <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                        <label className='col-form-label text-start fw-bold fs-6'>Price:</label>
                                                        <span className='ps-2'>
                                                            {cuisine?.price}
                                                        </span>
                                                    </li>
                                                    <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                        <label className='col-form-label text-start fw-bold fs-6'>Sub Total:</label>
                                                        <span className='ps-2'>
                                                            {cuisine?.price * cuisine?.count}
                                                        </span>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                        <hr />
                                        <li className='list-group-item bg-transparent border-0 py-2 px-0 m-0 w-100'>
                                            <ul className='list-group p-0 m-0'>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Restaurant:</label>
                                                    <span className='ps-2'>
                                                        {order?.orderFrom?.name}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Order Status:</label>
                                                    <span className='ps-2'>
                                                        {order?.orderStatus?.restaurant}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Order Value:</label>
                                                    <span className='ps-2'>
                                                        {order?.value}
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

export default UserOrders;
