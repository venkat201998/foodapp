export const restaurantReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGGED_IN_RESTAURANT':
			return action.payload;
		case 'LOGOUT':
			return action.payload;
		default:
			return state;
	}
};
