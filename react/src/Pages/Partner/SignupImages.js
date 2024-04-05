import { useEffect, useState } from 'react';

import SideNav from './SideNav';
import FileUpload from './FileUpload';
import banner from '../../Assets/add_photos.svg';
import DisplayImgaes from './DisplayImages';
import BottomNav from '../../Components/BottomNav';
import { useSelector } from 'react-redux';

const SignUpImages = ({ register }) => {
    const { signup, restaurant } = useSelector((state) => ({...state}));
    const [menuImages, setMenuImages] = useState(signup?.menuImages || []);
    const [restaurantImages, setRestaurantImages] = useState(signup?.restaurantImages || []);
    const [foodImages, setFoodImages] = useState(signup?.foodImages || []);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (restaurant) {
            setMenuImages(restaurant?.menuImages[0]);
            setFoodImages(restaurant?.foodImages[0]);
            setRestaurantImages(restaurant?.restaurantImages[0]);
        }
    }, [restaurant])

    const validateStates = () => {
        let bool;
        if (!menuImages?.urls?.length > 0 || !restaurantImages?.urls?.length > 0 || !foodImages?.urls?.length > 0) {
            bool = true;
        } else {
            bool = false;
        }
        return bool;
    }

    return (
        <div className='partner-signup container mt-5'>
            <div className='row mt-5 pt-5'>
                <SideNav />
                <div className='col-lg-6 col-md-8 col-10 ms-2'>
                    <h2 className='d-flex justify-content-start fw-light lh-lg'>Upload images</h2>
                    <div className='my-3'>
                        <form onSubmit={''} className='container'>
                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Menu images</h6>
                                <p className='fw-light text-start m-0'>Your menu will be directly visible to customers on Flavor Chronicles</p>
                                <div className='col-12 my-3 mb-md-1 px-3 text-center shadow-sm py-3 file-upload'>
                                    <div className=''>
                                        <p className='fw-light d-inline'>{'Drag & Drop to upload or '}</p>
                                        <label htmlFor={'add-menu-images-browse'} className='text-decoration-underline'>
                                            {' Browse'}
                                            <FileUpload
                                                id={'add-menu-images-browse'}
                                                images={menuImages}
                                                setImages={setMenuImages}
                                                setLoading={setLoading}
                                            />
                                        </label>
                                    </div>
                                    <div className='text-center p-5'>
                                        <DisplayImgaes
                                            images={menuImages}
                                            setImages={setMenuImages}
                                        />
                                        <label htmlFor={'add-menu-images-icon'}>
                                            <img htmlFor={'add-menu-images-icon'} src={banner} alt='add-menu' />
                                            <FileUpload
                                                id={'add-menu-images-icon'}
                                                images={menuImages}
                                                setImages={setMenuImages}
                                                setLoading={setLoading}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Restaurant images</h6>
                                <p className='fw-light text-start m-0'>{'Please upload atleast one facade shot (picture of the restaurant front)'}</p>
                                <div className='col-12 my-3 mb-md-1 px-3 text-center shadow-sm py-3 file-upload'>
                                    <div className=''>
                                        <p className='fw-light d-inline'>{'Drag & Drop to upload or '}</p>
                                        <label htmlFor={'add-restaurant-images-browse'} className='text-decoration-underline'>
                                            {' Browse'}
                                            <FileUpload
                                                id={'add-restaurant-images-browse'}
                                                images={restaurantImages}
                                                setImages={setRestaurantImages}
                                                setLoading={setLoading}
                                            />
                                        </label>
                                    </div>
                                    <div className='text-center p-5'>
                                        <DisplayImgaes
                                            images={restaurantImages}
                                            setImages={setRestaurantImages}
                                        />
                                        <label htmlFor={'add-restaurant-images-icon'}>
                                            <img htmlFor={'add-restaurant-images-icon'} src={banner} alt='add-restaurant' />
                                            <FileUpload
                                                id={'add-restaurant-images-icon'}
                                                images={restaurantImages}
                                                setImages={setRestaurantImages}
                                                setLoading={setLoading}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='form-group shadow p-3 my-3 row'>
                                <h6 className='text-start'>Food images</h6>
                                <p className='fw-light text-start m-0'>{'Please do not put images of raw ingredients'}</p>
                                <div className='col-12 my-3 mb-md-1 px-3 text-center shadow-sm py-3 file-upload'>
                                    <div className=''>
                                        <p className='fw-light d-inline'>{'Drag & Drop to upload or '}</p>
                                        <label htmlFor={'add-food-images-browse'} className='text-decoration-underline'>
                                            {' Browse'}
                                            <FileUpload
                                                id={'add-food-images-browse'}
                                                images={foodImages}
                                                setImages={setFoodImages}
                                                setLoading={setLoading}
                                            />
                                        </label>
                                    </div>
                                    <div className='text-center p-5'>
                                        <DisplayImgaes
                                            images={foodImages}
                                            setImages={setFoodImages}
                                        />
                                        <label htmlFor={'add-food-images-icon'}>
                                            <img htmlFor={'add-food-images-icon'} src={banner} alt='add-food' />
                                            <FileUpload
                                                id={'add-food-images-icon'}
                                                images={foodImages}
                                                setImages={setFoodImages}
                                                setLoading={setLoading}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <BottomNav
                    validateStates={validateStates()}
                    obj={{restaurantImages, menuImages, foodImages}}
                    prevRoute={-1}
                    nextRoute={''}
                    register={register}
                />
            </div>
        </div>
    )
}

export default SignUpImages;
