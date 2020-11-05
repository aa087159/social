let auth = {
	isUserAuthenticated: false,
	unAuthAlert: false,
	isTaken: false,
	Inconsistent: false
};

const verification = (state = auth, action) => {
	switch (action.type) {
		case 'LOGIN_VERIFY':
			return {
				...state,
				[action.key]: action.value
			};
		case 'SIGNUP_VERIFY':
			return {
				...state,
				[action.key1]: action.value1,
				[action.key2]: action.value2
			};
		default:
			return state;
	}
};

export default verification;
