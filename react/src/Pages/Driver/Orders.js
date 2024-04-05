import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import CuisineModal from '../../Components/Cards/CuisineModal';
import { getOrdersByDriver, modifyOrderStatus } from '../../Functions/Auth';

const Orders = ({ title, driverStatus }) => {
    const { user } = useSelector(state => ({ ...state }));
    const [loading, setLoading] = useState(true);
    const [ordersDet, setOrdersDet] = useState('');
    const [status, setStatus] = useState({});
    const [updateStatus, setUpdateStatus] = useState({});
    const [str, setStr] = useState({});
    const [tit, setTit] = useState('');
    const [btnTitle, setBtnTitle] = useState('');

    useEffect(() => {
        if (user) {
            const { email, token } = user;
            getOrdersByDriver(token, email, driverStatus)
                .then(res => {
                    if (res.status === 200) {
                        toast.success(res.data.message);
                        setOrdersDet(res.data.orders);
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

    const handleDeleteProduct = (order, status) => {
        let assignObj = {};
        let statusObj = {};
        const { orderdBy, _id, orderStatus, assignedTo } = order;
        switch (status) {
            case 'Order Confirmed':
                assignObj = { ...assignedTo };
                statusObj = { ...orderStatus, driver: status };
                break;
            case 'Order Declined':
                assignObj = { name: '', email: '' }
                statusObj = { ...orderStatus, driver: status };
                break;
            case 'Order Delivered':
                assignObj = { ...assignedTo };
                statusObj = { restaurant: status, driver: status };
                break;
            default:
                assignObj = { ...assignedTo };
                statusObj = { ...orderStatus, driver: status };
                break;
        }
        setLoading(true);
        modifyOrderStatus(user?.token, { orderdBy, itemId: _id, orderStatus: statusObj, assignedTo: assignObj, email: assignedTo?.email }, user.role)
            .then(res => {
                if (res.status === 200) {
                    setOrdersDet(res.data.items);
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                toast.error(error);
            })
    }

    const handleModifyStatus = (order, status) => {
        handleDeleteProduct(order, status);
        setUpdateStatus({});
    }

    const handleOrderStatus = (e, st) => {
        e.preventDefault();
        setStr(st);
        if (st === 'Order Confirmed') {
            setBtnTitle('Approve');
            setTit('Do you want to approve the order?');
        } else {
            setBtnTitle('Decline');
            setTit('Do you want to delete the order?');
        }
    }

    return (
        <div className='row mt-5 pt-5 mx-md-2 d-flex justify-content-center'>
            <div className='col-lg-8 col-10 px-md-4 px-3 shadow'>
                {
                    loading ? <h3 className='text-center m-3'>Loading...</h3> :
                        <form className='row px-lg-3 py-lg-3 d-flex justify-content-center'>
                            <h3 className='text-center mb-3'>{title}</h3>
                            <div className='row p-3'>
                                {ordersDet?.length > 0 && ordersDet?.map((order, index) =>
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
                                                    <label className='col-form-label text-start fw-bold fs-6'>Customer:</label>
                                                    <span className='ps-2'>
                                                        {order?.orderdBy?.name}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Order Value:</label>
                                                    <span className='ps-2'>
                                                        {order?.value}
                                                    </span>
                                                </li>
                                                {(order?.orderStatus?.driver === 'Order Placed') ? <li className='list-group-item bg-transparent border-0 py-2 px-0 m-0 text-center'>
                                                    <button className='btn btn-filled fw-bold mx-2' onClick={(e) => handleOrderStatus(e, 'Order Confirmed')} data-bs-toggle='modal' data-bs-target={`#static-backdrop-${order._id}`}>Approve</button>
                                                    <button className='btn btn-hollow fw-bold mx-2' onClick={(e) => handleOrderStatus(e, 'Order Declined')} data-bs-toggle='modal' data-bs-target={`#static-backdrop-${order._id}`}>Decline</button>
                                                </li> : order?.assignedTo?.name !== '' && <>
                                                    <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                        <label className='col-form-label text-start fw-bold fs-6'>Order Status:</label>
                                                        <span className='ps-2'>
                                                            {order?.orderStatus?.driver}
                                                        </span>
                                                    </li>
                                                    {(order?.orderStatus?.driver !== 'Order Delivered') && (order?.orderStatus?.restaurant === 'Order Dispatched') && <li className='form-switch list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start d-flex align-items-center'>
                                                        <label htmlFor='update-order-status' className='col-form-label text-start fw-bold fs-6'>Update Order Status</label>
                                                        <input class='form-check-input mx-2 rounded' type='checkbox' role='switch' id='update-order-status' onChange={() => setUpdateStatus({ ...updateStatus, [index]: !updateStatus[index] })} />
                                                    </li>}
                                                    {updateStatus[index] && <li className='list-group-item bg-transparent p-0 mx-0 my-2 border-0 w-50 text-start d-flex flex-row'>
                                                        <select
                                                            className='form-select rounded'
                                                            id={`quantity-dropdown-${order._id}`}
                                                            aria-label='Default select example'
                                                            value={status[index]}
                                                            onChange={(e) => setStatus({ ...status, [index]: e.target.value })}
                                                        >
                                                            {['Order Confirmed', 'Order Delivered']?.map(option => <option key={option} value={option} selected={option === order?.orderStatus?.driver}>{option}</option>)}
                                                        </select>
                                                        <button className='btn btn-filled mx-2 my-0' disabled={status[index] === order?.orderStatus?.driver} onClick={() => handleModifyStatus(order, status[index])}>{'Update'}</button>
                                                    </li>}
                                                </>}
                                            </ul>
                                        </li>
                                        <CuisineModal
                                            onClickEvent={handleDeleteProduct}
                                            status={str}
                                            product={order}
                                            title={tit}
                                            btnTitle={btnTitle}
                                        />
                                    </ul>
                                )}
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}

export default Orders;
