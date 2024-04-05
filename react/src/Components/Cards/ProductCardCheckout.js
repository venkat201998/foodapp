import React, { useState, useEffect } from 'react';

import './Card.css';

const ProductCheckoutCard = ({ product, deleteProductFromCart, handleUpdateQuantity, orderFrom }) => {
    const [quantity, setQuantity] = useState(product.count);
    const [productQuantity, setProductQuantity] = useState('');
    let range = [];

    useEffect(() => {
        fetchProductQunatity();
    }, [])

    const createRange = (end) => {
        range = [];
        for (let i = 1; i <= end; i++) {
            range.push(i);
        }
        setProductQuantity(range);
    }

    const updateQuantity = (e) => {
        setQuantity(e.target.value);
        handleUpdateQuantity({ product: {...product, _id: product.cuisineId }, count: e.target.value, orderFrom });
    }

    const fetchProductQunatity = () => {
        createRange((product && product.quantity) || 0);
    }

    const handleDelete = () => {
        deleteProductFromCart({product, orderFrom})
    }

    return (
        <div className='col-12'>
            <form className='container-fluid p-0'>
                <div className='card w-100 border-0'>
                    <div className='card-body row'>
                        <div className='card col-lg-5 col-12 p-0'>
                            <img src={product.images && product.images.length && product.images[0].urls[0].url} className='card-img-top' alt='...' />
                        </div>
                        <div className='col-lg-5 col-10 text-start px-lg-3 py-2'>
                            <h5 className='card-title'>{product.title}</h5>
                            <p className='card-text fs-6'>{product.description}</p>
                            <div className='input-group'>
                                <select
                                    className='form-select rounded w-25'
                                    id={`quantity-dropdown-${product._id}`}
                                    aria-label='Default select example'
                                    value={quantity}
                                    onChange={updateQuantity}
                                >
                                    {productQuantity && productQuantity.map(q => <option key={q} value={q}>{q}</option>)}
                                </select>
                                <span className='input-group-text border-0 bg-white m-0 px-1'>&#xd7;</span>
                                <span className='input-group-text border-0 bg-white m-0 px-1'>&#36;{product.price}</span>
                                <span className='input-group-text border-0 bg-white m-0 px-1'>&#61;</span>
                                <span className='input-group-text border-0 bg-white m-0 px-1'>&#36;{quantity * product.price}</span>
                            </div>
                        </div>
                        <div className='col-lg-2 col-2 d-flex align-items-center justify-content-center' onClick={handleDelete}>
                            <button type='button' className='btn rounded-0 border-0'>
                                <span><i className='bi bi-trash'></i></span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductCheckoutCard;
