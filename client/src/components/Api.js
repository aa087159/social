const API_URL = `http://localhost:${process.env.REACT_APP_API_URL}`;

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

export async function postText(post) {
	const response = await fetch(`${API_URL}/api/postText`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(post)
	});

	return response.json();
}

export async function getPosts(collection) {
	const response = await fetch(`${API_URL}/api/getPosts`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			collection: collection
		}
	});

	return response.json();
}

export async function updatePost(update) {
	const response = await fetch(`${API_URL}/api/updatePost`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(update)
	});

	return response.json();
}

export async function commentPost(comment) {
	const response = await fetch(`${API_URL}/api/commentPost`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(comment)
	});
	return response.json();
}

export async function getComments(userName) {
	const response = await fetch(`${API_URL}/api/getComments`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			userName: userName
		}
	});

	return response.json();
}

export async function getUser(userName) {
	const response = await fetch(`${API_URL}/api/getUser`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			userName: userName
		}
	});

	return response.json();
}

export async function followUser(users) {
	const response = await fetch(`${API_URL}/api/followUser`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(users)
	});
	return response.json();
}
