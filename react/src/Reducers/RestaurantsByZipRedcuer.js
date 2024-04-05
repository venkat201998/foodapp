export const restaurantsReducersByZip = (state = null, action) => {
	switch (action.type) {
		case 'RESTAURANTS_BY_ZIP':
			return action.payload;
		case 'LOGOUT':
			return action.payload;
		default:
			return state;
	}
};
