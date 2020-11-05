export const postRedux = (state = [], action) => {
	switch (action.type) {
		case 'POSTS':
			return action.posts || state.posts;

		default:
			return state;
	}
};

export default postRedux;
