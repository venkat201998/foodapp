export const restaurantsReducer = (state = null, action) => {
	switch (action.type) {
		case 'REGISTERED_RESTAURANTS':
			return action.payload;
		case 'LOGOUT':
			return action.payload;
		default:
			return state;
	}
};
