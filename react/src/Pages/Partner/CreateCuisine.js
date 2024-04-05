import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createOrUpdateCuisine, getCuisine } from '../../Functions/Auth';
import FileUpload from './FileUpload';

const CreateCuisine = () => {
    const { restaurant } = useSelector((state) => ({ ...state }));
    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    let checkParam = location.pathname.includes('update');

    useEffect(() => {
        if (restaurant?.cuisineType) {
            setCategories(restaurant?.cuisineType);
        }

        if (restaurant && checkParam) {
            setLoading(true);
            const { token, email } = restaurant
            getCuisine(token, email, location.pathname.split('/')[2].split('-').join(' '))
                .then(res => {
                    if(res.status === 200) {
                        toast.success(res.data.message);
                        setTitle(res.data.product.title);
                        setDescription(res.data.product.description);
                        setPrice(res.data.product.price);
                        setCategory(res.data.product.category);
                        setQuantity(res.data.product.quantity);
                        setImages(res.data.product.images[0]);
                    } else {
                        toast.error(res.data.message);
                    }
                    setLoading(false);
                })
                .catch(e => {
                    toast.error(e);
                    setLoading(false);
                })
        }
    }, [restaurant, location.pathname])

    const handleSubmit = (e) => {
        e.preventDefault();
        createOrUpdateCuisine(restaurant.token, { email: restaurant?.email, title, description, price, quantity, category, images, id: '' })
            .then(res => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    navigate('/partner-manage-cuisines');
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch(e => toast.error(e))
    }

    const handleClear = () => { }

    return (
        <div className='row mt-5 pt-5 mx-md-2 d-flex justify-content-center'>
            <div className='col-lg-8 col-10 px-md-4 px-3 shadow'>
                {
                    loading ? <h3 className='text-center m-3'>Loading...</h3> :
                        <form onSubmit={handleSubmit} className='row px-lg-5 py-lg-3 d-flex justify-content-center'>
                            <h3 className='text-center mb-3'>{checkParam ? 'Cuisine Updation Form' : 'Cuisine Registration Form'}</h3>
                            <div className='form-group row p-2'>
                                <label htmlFor='title' className='col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6'>Title</label>
                                <div className='col-md-8 col-12 mb-3 mb-md-1 p-0'>
                                    <input
                                        id='title'
                                        type='text'
                                        className='form-control w-100'
                                        value={title}
                                        required
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder='Cuisine Title'
                                    />
                                </div>
                            </div>
                            <div className='form-group row p-2'>
                                <label htmlFor='description' className='col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6'>Description</label>
                                <div className='col-md-8 col-12 mb-3 mb-md-1 p-0'>
                                    <input
                                        id='description'
                                        type='text'
                                        className='form-control w-100'
                                        value={description}
                                        required
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder='Cuisine Description'
                                    />
                                </div>
                            </div>
                            <div className='form-group row p-2'>
                                <label htmlFor='cuisine-price' className='col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6'>Price</label>
                                <div className='col-md-8 col-12 mb-3 mb-md-1 p-0'>
                                    <input
                                        id='cuisine-price'
                                        type='text'
                                        className='form-control w-100'
                                        value={price}
                                        required
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder='Cuisine Price'
                                    />
                                </div>
                            </div>
                            <div className='form-group row p-2'>
                                <label htmlFor='quantity' className='col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6'>Quantity</label>
                                <div className='col-md-8 col-12 mb-3 mb-md-1 p-0'>
                                    <input
                                        id='quantity'
                                        type='text'
                                        className='form-control w-100'
                                        value={quantity}
                                        required
                                        onChange={(e) => setQuantity(e.target.value)}
                                        placeholder='Cuisine Quantity'
                                    />
                                </div>
                            </div>
                            <div className='form-group row p-2'>
                                <label htmlFor='category' className='col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6'>Category</label>
                                <div className='col-md-8 col-12 mb-3 mb-md-1 p-0'>
                                    <select
                                        id='category'
                                        className='form-select w-100'
                                        value={category}
                                        required
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option defaultValue>Select Cuisine Category</option>
                                        {categories && categories.map(category => <option key={category} value={category}>{category}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className='form-group row p-2'>
                                <label htmlFor='formFile' className='col-md-3 d-none d-md-block col-form-label text-end fw-bold fs-6'>Image</label>
                                <div className='col-md-8 col-12 mb-3 mb-md-1 p-0 text-start'>
                                    <FileUpload
                                        id={'formFile'}
                                        images={images}
                                        setImages={setImages}
                                        setLoading={setLoading}
                                    />
                                </div>
                            </div>
                            <div className='form-group row p-2'>
                                <div className='col-md-4 col-12 offset-md-3 text-start p-0'>
                                    <button
                                        className='btn btn-raised btn-filled fw-bold me-md-3 me-1'
                                        type='submit'
                                        disabled={!title || !description || !price || !quantity || !category || (category === 'Select Cuisine Category') || !(images && images.urls && images.urls.length)}
                                    >
                                        {checkParam ? 'Update' : 'Register'}
                                    </button>
                                    <button
                                        className='btn btn-raised btn-hollow ms-md-3 ms-1'
                                        type='clear'
                                        onClick={handleClear}
                                    >
                                        {checkParam ? 'Cancel' : 'Clear'}
                                    </button>
                                </div>
                            </div>
                        </form>
                }
            </div>
        </div >
    )
}

export default CreateCuisine;
