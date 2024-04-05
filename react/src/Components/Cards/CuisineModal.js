import React from 'react';

const CuisineModal = ({ btnTitle, title, product, onClickEvent, status }) => {

    const handleClick = () => {
        onClickEvent(product, status);
    }

    return (
        <div className='modal fade' id={`static-backdrop-${product._id}`} data-bs-backdrop='static' data-bs-keyboard='false' tabIndex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='staticBackdropLabel'></h1>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body text-start'>{title}</div>
                    <div className='modal-footer jsutify-content-center'>
                        <button type='button' className='btn btn-filled' data-bs-dismiss='modal' aria-label='Close'>Cancel</button>
                        <button type='button' className='btn btn-hollow' data-bs-dismiss='modal' onClick={handleClick}>{btnTitle}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CuisineModal;
