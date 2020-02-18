const API_URL = `http://localhost:${process.env.REACT_APP_API_URL}`;

export async function listLogEntries() {
	const response = await fetch(`${API_URL}/api/logs`);
	return response.json();
}

export async function giveUserName(userName) {
	const response = await fetch(`${API_URL}/api/postUserName`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({ userName })
	});

	return response.json();
}

export async function givePasswordName(user) {
	const response = await fetch(`${API_URL}/api/postFullUser`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(user)
	});

	return response.json();
}

export async function createAccount(credentials) {
	const response = await fetch(`${API_URL}/api/createaccount`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(credentials)
	});

	return response.json();
}
