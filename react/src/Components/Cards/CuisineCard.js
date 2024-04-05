import React, { useEffect, useState } from 'react';

import Modal from './Modal';
import { useSelector } from 'react-redux';

const CuisineCard = ({ cuisine, handleAddProduct, restaurant }) => {
    const { cart } = useSelector(state => ({...state}));

    const [count, setCount] = useState('');
    const [selection, setSelection] = useState('');

    useEffect(() => {
        if (cart) {
            fetchCountFromCart();
        }
    }, [cart])

    const fetchCountFromCart = () => {
        let index = cart && cart?.items?.length > 0 && cart?.items?.findIndex(prod => prod.orderFrom.email === restaurant?.email);
        let item = cart?.items[index]?.cuisines?.find(item => item.cuisineId === cuisine._id)
        setCount(item && item.count || 0);
        setSelection(item && item.count || 0);
    }

    return (
        <div className='col-6 my-2 cursor-pointer'>
            <ul className='list-item shadow d-flex flex-row p-3 m-0'>
                <ul className='list-item p-1 m-0 w-100'>
                    <li className='list-group-item bg-transparent py-1 m-0 text-start fw-semibold'>
                        {cuisine?.title}
                    </li>
                    <li className='list-group-item bg-transparent py-1 m-0 text-start fs-8'>
                        Smash your hunger with the creamy taste of loaded mashed potatoes and our world famous KFC chicken
                    </li>
                    <li className='list-group-item bg-transparent py-1 text-start m-0'>
                        <label className='col-form-label text-start fw-semibold fs-6'>Cuisine:</label>
                        <span className='ps-2'>
                            {cuisine?.category?.charAt(0).toUpperCase() + cuisine?.category?.slice(1).toLowerCase()}
                        </span>
                    </li>
                    <li className='list-group-item bg-transparent py-1 text-start m-0'>
                        &#36;{cuisine?.price}
                    </li>
                </ul>
                <li className='list-group-item bg-transparent p-2 m-0 w-50'>
                    <img src={cuisine?.images[0]?.urls[0]?.url} className='card-img-top' alt='...' />
                    <span className='position-absoulte' data-bs-toggle='modal' data-bs-target={`#static-backdrop-${cuisine._id}`}><i className='bi bi-cart-plus-fill fs-2'></i></span>
                </li>
                <Modal
                    restaurant={restaurant}
                    onClickEvent={handleAddProduct}
                    onClickCancel={fetchCountFromCart}
                    product={cuisine}
                    count={count}
                    setCount={setCount}
                    setSelection={setSelection}
                    selection={selection}
                    title={`Select number of ${cuisine.title}`}
                    btnTitle={'Add to Cart'}
                />
            </ul>
        </div>
    )
}

export default CuisineCard;
