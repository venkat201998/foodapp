import { Link } from 'react-router-dom';

import './index.css'

const SideNav = () => {
    return (
        <div className='col-lg-2 offset-2 col-md-8 col-10 me-2 p-0 side-nav'>
            <div className='shadow p-4'>
                <h6 className='text-start border-bottom pb-3'>1. Create your restaurant page</h6>
                <ul class='list-group'>
                    <li class='list-group-item bg-transparent m-0 p-0 border-0'>
                        <Link to={'/partner-signup'} className='text-decoration-none text-black'>
                            <h6 className='text-start'>Restaurant Information</h6>
                            <p className='fw-light text-start'>Restaurant name, address, contact no., owner details</p>
                        </Link>
                    </li>
                    <li class='list-group-item bg-transparent m-0 p-0 border-0'>
                        <Link to={'/partner-signup/restaurant-type'} className='text-decoration-none text-black'>
                            <h6 className='text-start'>Restaurant Type & Timings</h6>
                            <p className='fw-light text-start'>Establishment & cuisine type, opening hours</p>
                        </Link>
                    </li>
                    <li class='list-group-item bg-transparent m-0 p-0 border-0'>
                        <Link to={'/partner-signup/upload-images'} className='text-decoration-none text-black'>
                            <h6 className='text-start'>Upload Images</h6>
                            <p className='fw-light text-start'>Menu, restaurant, food images</p>
                        </Link>

                    </li>
                </ul>
            </div>
            <div className='shadow p-4 my-3'>
                <h6 className='text-start'>2. Register for Online ordering</h6>
            </div>
        </div>
    )
}

export default SideNav;
