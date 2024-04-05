import React, { useState } from 'react';

const StatusModal = ({ order, obj, drivers, onClickEvent }) => {
    const [selection, setSelection] = useState('-None-');

    const handleClick = () => {
        let name = '';
        let email = '';
        let arr;
        if (selection !== '-None') {
            arr = selection?.split('-');
            name = arr[1].concat(' ', arr[2]);
            email = arr[0];
        }
        onClickEvent({ orderdBy: order.orderdBy, itemId: order._id, assignedTo: { name, email }, orderStatus: { ...order.orderStatus, restaurant: obj.click }});
    }

    const handleCancel = () => {
        setSelection('-None-');
    }

    return (
        <div className='modal fade' id={`static-backdrop-${order._id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='staticBackdropLabel'></h1>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    {obj.click === 'Order Confirmed' ? <div className='modal-body d-flex flex-row'>
                        <label htmlFor={`quantity-dropdown-${order._id}`} className='col-form-label text-start px-2'>{'Assign To'}</label>
                        <div className='input-group w-50 px-2'>
                            <select
                                className='form-select rounded'
                                id={`quantity-dropdown-${order._id}`}
                                aria-label='Default select example'
                                value={selection}
                                onChange={(e) => setSelection(e.target.value)}
                            >
                                {drivers && drivers?.map(driver => <option key={driver?._id} value={driver?.email.concat('-', driver?.firstName, '-', driver?.lastName)} selected>{driver?.firstName.concat(' ', driver?.lastName)}</option>)}
                            </select>
                        </div>
                    </div> : <div className='modal-body d-flex flex-row'>{'Are you sure declining the order?'}</div>}
                    <div className='modal-footer jsutify-content-center'>
                        <button type='button' className='btn btn-hollow' data-bs-dismiss='modal' aria-label='Close' onClick={handleCancel}>Cancel</button>
                        <button type='button' className='btn btn-filled' data-bs-dismiss='modal' disabled={ obj.disabled && selection === '-None-'} onClick={handleClick}>{obj.title}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatusModal;
