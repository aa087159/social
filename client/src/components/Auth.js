class Auth {
	state = {
		userAuthenticated: true,
		passwordAuthenticated: true
	};

	signup = (callback) => {
		this.state.userAuthenticated = true;
		this.state.passwordAuthenticated = true;
		callback();
	};

	firstLogin = (user) => {
		if (user.message === 'Authenticated') {
			this.state.userAuthenticated = true;
		}
	};

	secondLogin = (callback, user) => {
		if (user) {
			this.state.userAuthenticated = true;
			this.state.passwordAuthenticated = true;
			callback();
		}
	};

	logout = (callback) => {
		this.state.userAuthenticated = false;
		this.state.passwordAuthenticated = false;
		callback();
	};
}

export default new Auth();
