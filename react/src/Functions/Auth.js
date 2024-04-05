import axios from 'axios';

export const createOrUpdateUser = async (userDetails, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/createOrUpdateUser`,
        {
            userDetails
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const checkUser = async (email, role) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/checkUserRole`,
        {
            email,
            role
        }
    )
}

export const currentUser = async (email, idToken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getCurrentUser`,
        {
            email
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getUsers = async (idToken) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/getUsers`,
        {
            headers: {
                idToken
            }
        }
    )
}

export const getUsersByRole = async (idToken, role) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getUsersByRole`,
        {
            role
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getRestaurants = async (idToken) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/getRestaurants`,
        {
            headers: {
                idToken
            }
        }
    )
}

export const registerRestaurant = async (idToken, obj) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/registerRestaurant`,
        {
            obj
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getCurrentRestaurant = async (idToken, email) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getCurrentRestaurant`,
        {
            email
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getRestaurant = async (idToken, restaurantName) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getRestaurant`,
        {
            restaurantName
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const modifyRestaurantStatus = async (idToken, email, status) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/modifyRestaurantStatus`,
        {
            email,
            status
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const createOrUpdateCuisine = async (idToken, cuisineDetails) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/createOrUpdateCuisine`,
        {
            cuisineDetails
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const deleteCuisine = async (idToken, title, email) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/deleteCuisine`,
        {
            title,
            email
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getCuisines = async (email) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getCuisines`,
        {
            email
        }
    )
}

export const getCuisine = async (idToken, email, title) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getCuisine`,
        {
            title,
            email
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getOrdersByDriver = async (idToken, email, driverStatus) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getOrdersByDriver`,
        {
            email,
            driverStatus
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getOrdersByRestaurant = async (idToken, email, restaurantStatus) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getOrdersByRestaurant`,
        {
            email,
            restaurantStatus
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getOrdersByUser = async (idToken, email, userOrderStatus) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getOrdersByUser`,
        {
            email,
            userOrderStatus
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getRestaurantsByZip = async (zipCode) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getRestaurantsByZip`,
        {
            zipCode
        }
    )
}

export const createOrUpdateCart = async (idToken, cart) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/createOrUpdateCart`,
        {
            cart
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const getCart = async (idToken, orderdBy) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/getCart`,
        {
            orderdBy
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const createOrder = async (idToken, orderDetails) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/createOrder`,
        {
            orderDetails
        },
        {
            headers: {
                idToken
            }
        }
    )
}

export const modifyOrderStatus = async (idToken, orderObj, role) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/modifyOrderStatus`,
        {
            orderObj,
            role
        },
        {
            headers: {
                idToken
            }
        }
    )
}