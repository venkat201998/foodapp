import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import StatusModal from '../../Components/Cards/StatusModal';
import { getOrdersByRestaurant, getUsersByRole, modifyOrderStatus } from '../../Functions/Auth';

const ManageOrders = ({ restaurantStatus, title }) => {
    const { restaurant } = useSelector(state => ({ ...state }));
    const [loading, setLoading] = useState(true);
    const [ordersDet, setOrdersDet] = useState('');
    const [drivers, setDrivers] = useState('');
    const [driver, setDriver] = useState('-None-');
    const [status, setStatus] = useState({});
    const [updateStatus, setUpdateStatus] = useState({});
    const [obj, setObj] = useState({});

    useEffect(() => {
        if (restaurant) {
            getOrdersByRestaurant(restaurant?.token, restaurant?.email, restaurantStatus)
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
                    toast.error(error);
                    setLoading(false)
                })

            getUsersByRole(restaurant?.token, 'driver')
                .then(res => {
                    if (res.status === 200) {
                        setDrivers([{ _id: 0, email: '', firstName: 'None', lastName: '' }, ...res.data.users]);
                        toast.success(res.data.message);
                    } else {
                        toast.error(res.data.message);
                    }
                })
                .catch(error => {
                    toast.error(error);
                })
        }
    }, [restaurant, title])

    const handleOrderStatus = (e, str) => {
        e.preventDefault();
        if (str === 'Order Confirmed') {
            setObj({
                click: 'Order Confirmed',
                title: 'Assign',
                disabled: true
            })
        } else {
            setObj({
                click: 'Order Declined',
                title: 'Delete',
                disabled: false
            })
        }
    }

    const hanldeAssign = (obj) => {
        const { orderdBy, itemId, assignedTo, orderStatus } = obj;
        setLoading(true);
        modifyOrderStatus(restaurant?.token, { orderdBy, itemId, orderStatus, assignedTo, email: restaurant?.email }, 'partner')
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

    const handleAssignDriver = (order) => {
        let arr = driver?.split('-');
        hanldeAssign({ orderdBy: order.orderdBy, itemId: order._id, assignedTo: { name: arr[1].concat(' ', arr[2]), email: arr[0] }, orderStatus: { ...order.orderStatus, driver: 'Order Placed' } });
    }

    const handleModifyStatus = (order, status) => {
        hanldeAssign({ orderdBy: order.orderdBy, itemId: order._id, assignedTo: order.assignedTo, orderStatus: { ...order.orderStatus, restaurant: status } });
        setUpdateStatus({});
    }

    return (
        <div className='row mt-5 pt-5 mx-md-2'>
            <div className='col-lg-8 col-md-12 col-10 offset-lg-2 offset-md-0 offset-1 p-md-4 p-3 text-center shadow'>
                {loading ? <h3 className='text-center m-3'>Loading...</h3> :
                    <form onSubmit={''} className='row px-lg-5 py-lg-3 d-flex justify-content-center'>
                        <h3 className='text-center mb-3'>{title}</h3>
                        <div className='row p-2'>
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
                                                <label className='col-form-label text-start fw-bold fs-6'>Ordered By:</label>
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
                                            {(order?.orderStatus?.restaurant === 'Order Placed') ? <li className='list-group-item bg-transparent border-0 py-2 px-0 m-0 text-center'>
                                                <button className='btn btn-filled fw-bold mx-2' onClick={(e) => handleOrderStatus(e, 'Order Confirmed')} data-bs-toggle='modal' data-bs-target={`#static-backdrop-${order._id}`}>Approve</button>
                                                <button className='btn btn-hollow fw-bold mx-2' onClick={(e) => handleOrderStatus(e, 'Order Declined')} data-bs-toggle='modal' data-bs-target={`#static-backdrop-${order._id}`}>Decline</button>
                                            </li> : order?.assignedTo?.name !== '' ? <>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Restaurant Status:</label>
                                                    <span className='ps-2'>
                                                        {order?.orderStatus?.restaurant}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Assigned To:</label>
                                                    <span className='ps-2'>
                                                        {order?.assignedTo?.name}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Driver Status:</label>
                                                    <span className='ps-2'>
                                                        {order?.orderStatus?.driver}
                                                    </span>
                                                </li>
                                                {!(['Order Delivered', 'Order Declined'].includes(order?.orderStatus?.restaurant)) && (order?.orderStatus?.driver === 'Order Confirmed') &&
                                                    <>
                                                        <li className='form-switch list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start d-flex align-items-center'>
                                                            <label htmlFor='update-order-status' className='col-form-label text-start fw-bold fs-6'>Update Order Status</label>
                                                            <input class='form-check-input mx-2 rounded' type='checkbox' role='switch' id='update-order-status' onChange={() => setUpdateStatus({ ...updateStatus, [index]: !updateStatus[index] })} />
                                                        </li>
                                                        {updateStatus[index] && <li className='list-group-item bg-transparent p-0 mx-0 my-2 border-0 w-50 text-start d-flex flex-row'>
                                                            <select
                                                                className='form-select rounded'
                                                                id={`quantity-dropdown-${order._id}`}
                                                                aria-label='Default select example'
                                                                value={status[index]}
                                                                onChange={(e) => setStatus({ ...status, [index]: e.target.value })}
                                                            >
                                                                {['Order Confirmed', 'Order Dispatched', 'Order Declined']?.map(option => <option key={option} value={option} selected={option === order?.orderStatus?.restaurant}>{option}</option>)}
                                                            </select>
                                                            <button className='btn btn-filled mx-2 my-0' disabled={status[index] === order?.orderStatus?.restaurant} onClick={() => handleModifyStatus(order, status[index])}>{'Update'}</button>
                                                        </li>}
                                                    </>
                                                }
                                            </> : <>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Restaurant Status:</label>
                                                    <span className='ps-2'>
                                                        {order?.orderStatus?.restaurant}
                                                    </span>
                                                </li>
                                                <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Driver Status:</label>
                                                    <span className='ps-2'>
                                                        {order?.orderStatus?.driver}
                                                    </span>
                                                </li>
                                                {!(['Order Delivered', 'Order Declined'].includes(order?.orderStatus?.restaurant)) && <li className='list-group-item bg-transparent p-0 m-0 border-0 w-100 text-start d-flex flex-row'>
                                                    <label className='col-form-label text-start fw-bold fs-6'>Assign To:</label>
                                                    <div className='ps-2 d-flex flex-row'>
                                                        <select
                                                            className='form-select rounded'
                                                            id={`quantity-dropdown-${order._id}`}
                                                            aria-label='Default select example'
                                                            value={driver}
                                                            onChange={(e) => setDriver(e.target.value)}
                                                        >
                                                            {drivers && drivers?.map(driver => <option key={driver?._id} value={driver?.email.concat('-', driver?.firstName, '-', driver?.lastName)} selected>{driver?.firstName.concat(' ', driver?.lastName)}</option>)}
                                                        </select>
                                                        <button className='btn btn-filled mx-2 my-0' disabled={driver === '-None-'} onClick={() => handleAssignDriver(order)}>{'Assign'}</button>
                                                    </div>
                                                </li>}
                                            </>}
                                            <StatusModal
                                                order={order}
                                                drivers={drivers}
                                                obj={obj}
                                                onClickEvent={hanldeAssign}
                                            />
                                        </ul>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </form>}
            </div>
        </div>
    )
}

export default ManageOrders;
