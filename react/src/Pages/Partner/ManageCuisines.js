import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import ProductCard from '../../Components/Cards/ProductCard';
import { getCuisines, deleteCuisine } from '../../Functions/Auth';
import { useSelector } from 'react-redux';

const ManageCuisines = () => {
    const { restaurant } = useSelector((state) => ({...state}));

    const [loading, setLoading] = useState(true);
    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        getCuisines(restaurant?.email)
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    setCuisines(res.data.products);
                } else {
                    toast.error(res.data.error);
                }
                setLoading(false);
            })
            .catch(e => {
                toast.error(e);
                setLoading(false);
            })
    }, [restaurant])

    const handleDeleteProduct = (obj) => {
        const { product: { title } } = obj;
        setLoading(true);
        deleteCuisine(restaurant.token, title, restaurant.email)
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    // dispatch({
                    //     type: 'USER_PRODUCTS',
                    //     payload: res.data.products
                    // })
                    setCuisines(res.data.products);
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

    return (
        <div className='row mt-5 pt-5 mx-md-2'>
            <div className='col-lg-8 col-md-12 col-10 offset-lg-2 offset-md-0 offset-1 p-md-4 p-3 text-center shadow'>
                {loading ? <h3 className='text-center m-3'>Loading...</h3> :
                    <form onSubmit={''} className='row px-lg-5 py-lg-3 d-flex justify-content-center'>
                        <h3 className='text-center mb-3'>Manage Cuisines</h3>
                        <div className='row p-2'>
                            {cuisines?.length > 0 && cuisines?.map(prod =>
                                <ProductCard
                                    key={prod._id}
                                    product={prod}
                                    handleClickEvent={handleDeleteProduct}
                                    email={restaurant?.email}
                                />)
                            }
                        </div>
                    </form>}
            </div>
        </div>
    )
}

export default ManageCuisines;
