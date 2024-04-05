import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './Card.css';
import CuisineModal from './CuisineModal';

const ProductCard = ({ product, handleClickEvent }) => {
    const location = useLocation();

    const handleRoute = (option) => {
        let routes = option.split(' ');
        return `${routes.length > 1 ? routes.map(route => route.toLowerCase()).join('-') : routes[0].toLowerCase()}`;
    }

    const handleDeleteProduct = (obj) => {
        handleClickEvent(obj);
    }

    return (
        <div className='card col-10 col-lg-3 my-3 mx-2 p-0'>
            <img src={product.images[0].urls[0].url} className='card-img-top' alt='...' />
            <div className='card-body text-start'>
                <h5 className='card-title'>{product.title}</h5>
                <p className='card-text'>{product.description}</p>
                <span>&#36;{product.price}</span>
            </div>
            <div className='card-footer text-start'>
                <Link className='btn rounded-0 no-border w-50' to={`/partner-update-cuisine/${handleRoute(product.title)}`}>Edit</Link>
                <button type='button' className='btn rounded-0 border-0 w-50' data-bs-toggle='modal' data-bs-target={`#static-backdrop-${product._id}`}>
                    Delete
                </button>
                <CuisineModal
                    onClickEvent={handleDeleteProduct}
                    product={product}
                    title={`Do yo want to delete ${product.title} ?`}
                    btnTitle={'Delete'}
                />
            </div>
        </div>
    )
}

export default ProductCard;
