import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { usersReducer } from './UsersReducer';
import { signupReducer } from './SignupReducer';
import { restaurantReducer } from './RestaurantReducer';
import { restaurantsReducer } from './RestaurantsReducer';
import { restaurantsReducersByZip } from './RestaurantsByZipRedcuer';
import { cartReducer } from './CartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  signup: signupReducer,
  restaurant: restaurantReducer,
  restaurants: restaurantsReducer,
  restaurantsByZip: restaurantsReducersByZip,
  cart: cartReducer
});

export default rootReducer;
