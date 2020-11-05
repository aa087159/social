export const changeHandler = (e) => {
	return {
		type: 'CHANGE_FORM',
		name: Object.keys(e)[0],
		value: Object.values(e)[0],
	};
};

export const loginVerification = (payload) => {
	return {
		type: 'LOGIN_VERIFY',
		key: Object.keys(payload)[0],
		value: Object.values(payload)[0],
	};
};

export const signupVerification = (payload) => {
	return {
		type: 'SIGNUP_VERIFY',
		key1: Object.keys(payload)[0],
		value1: Object.values(payload)[0],
		key2: Object.keys(payload)[1],
		value2: Object.values(payload)[1],
	};
};

export const postRedux = (posts) => {
	return {
		type: 'POSTS',
		posts,
	};
};
