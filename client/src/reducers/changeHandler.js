let form = {
	userName: '',
	email: '',
	password: '',
	confirmPassword: '',
	text: '',
	title: '',
};

export const changeHandler = (state = form, action) => {
	switch (action.type) {
		case 'CHANGE_FORM':
			return {
				...state,
				[action.name]: action.value,
			};
		default:
			return state;
	}
};

export default changeHandler;
//[action.name]: action.value || state[action.name]
