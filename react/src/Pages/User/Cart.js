import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ProductCheckoutCard from '../../Components/Cards/ProductCardCheckout';
import { createOrUpdateCart, createOrder } from '../../Functions/Auth';
import { useHandleCart } from '../../Functions/useHandleCart';

const Cart = () => {
    const { cart, user } = useSelector(state => ({ ...state }));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (cart) {
            setCartProducts(cart.items);
        }
    }, [cart])

    const {
        handleAddProduct,
        handleDeleteProduct
    } = useHandleCart({
        setLoading,
        navigate,
        user,
        createOrUpdateCart,
        cartProducts,
        toast,
        dispatch
    });

    const handleCheckout = () => {
        setLoading(true);
        const { items, orderdBy, cartTotal, shipping } = cart;
        createOrder(user.token, { orderdBy, items, paymentIntent: {}, shipping, orderTotal: cartTotal, totalAfterDiscount: 0 })
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error);
            })
        createOrUpdateCart(user.token, { items: [], shipping: 0, cartTotal: 0, cartQuantity: 0, totalAfterDiscount: 0, orderdBy })
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: 'CART',
                        payload: res.data.cart
                    });
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error);
            })
    }

    return (
        <>
            {cartProducts && cartProducts.length ? <div className='container-fluid row my-5 p-0 m-0 justify-content-center'>
                <div className='col-10 col-md-7 mt-5 mx-md-2'>
                    {loading ? <h3>Loading...</h3> :
                        <div className='container-fluid'>
                            {
                                cartProducts?.map(item => <div className='row shadow p-4 mb-3'>
                                    <li className='list-group-item bg-transparent px-0 py-2 m-0 border-0 w-100 text-start'>
                                        <label className='col-form-label text-start fw-bold fs-6'>Restaurant:</label>
                                        <span className='ps-2'>
                                            {item?.orderFrom?.name}
                                        </span>
                                    </li>
                                    {
                                        item.cuisines.map(cuisine => <ProductCheckoutCard
                                            key={cuisine.productId}
                                            product={cuisine}
                                            orderFrom={item?.orderFrom}
                                            handleUpdateQuantity={handleAddProduct}
                                            deleteProductFromCart={handleDeleteProduct}
                                        />)
                                    }
                                </div>)
                            }
                        </div>
                    }
                </div>
                <div className='col-10 col-md-4 mt-5 mx-md-2 container-height'>
                    <ul className='list-group shadow mb-3 p-3'>
                        <li className='list-group-item bg-transparent border-0 text-start px-4 d-flex flex-column'>
                            <label className='fw-semibold'>Address</label>
                            <span className='my-2'>{user?.address?.concat(', ', user?.city, ', ', user?.state, ', ', user?.zipCode)}</span>
                        </li>
                    </ul>
                    <ul className='list-group shadow p-3'>
                        <li className='list-group-item bg-transparent border-0 text-start px-4'>
                            <label className='col-6 col-md-8 fw-semibold'>Sub Total</label>
                            <span className='col-6 col-md-4 fw-semibold'>&#36;{cart && cart.cartTotal}</span>
                        </li>
                        <li className='list-group-item bg-transparent border-0 text-start px-4'>
                            <label className='col-6 col-md-8 fw-semibold'>Shipping</label>
                            <span className='col-6 col-md-4 fw-semibold'>&#36;{cart && cart.shipping}</span>
                        </li>
                        <li className='list-group-item bg-transparent border-0 text-start px-4'>
                            <label className='col-6 col-md-8 fw-semibold'>Estimated Tax</label>
                            <span className='col-6 col-md-4 fw-semibold'>&#36;{0}</span>
                        </li>
                        <li className='list-group-item bg-transparent border-0 text-start px-4'>
                            <label className='col-6 col-md-8 fw-semibold'>Total</label>
                            <span className='col-6 col-md-4 fw-semibold'>&#36;{cart && (cart.cartTotal + cart.shipping)}</span>
                        </li>
                        <li className='list-group-item bg-transparent border-0 mt-3'>
                            <button type='button' className='btn btn-filled' onClick={handleCheckout}>Proceed To Checkout</button>
                        </li>
                    </ul>
                </div>
            </div> : <div className='container-fluid my-5 px-md-5'>
                <div className='row mt-5 pt-5 mx-md-2'>
                    <div className='col-lg-8 col-10 offset-lg-2 offset-1 p-md-4 p-3 text-center shadow-sm'>
                        <h3>Empty Cart</h3>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Cart;
