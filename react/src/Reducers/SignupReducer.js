export const signupReducer = (state = null, action) => {
	switch (action.type) {
		case 'SIGN_UP':
			return action.payload;
		case 'LOGOUT':
			return action.payload;
		default:
			return state;
	}
};
