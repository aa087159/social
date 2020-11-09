const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const cors = require('cors');
require('dotenv').config();

const DB_URL = process.env.MONGODB_URL;
const dbName = 'users';
const client = new MongoClient(DB_URL, { useUnifiedTopology: true });

const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(
	cors({
		origin: `http://localhost:${process.env.CLIENT_PORT}`,
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	client.connect((err) => {
		assert.equal(null, err);

		const db = client.db(dbName);

		const collection = db.collection('credentials');
		// Find some documents
		collection.find({}).toArray((err, docs) => {
			assert.equal(err, null);
			res.send(JSON.stringify(docs));
		});
		//client.close();
	});
});

app.post('/api/postUserName', (req, res) => {
	client.connect((error) => {
		if (error) throw error;
		userName = {
			userName: req.body.userName,
		};

		const db = client.db(dbName);
		const collection = db.collection('credentials');

		collection
			.find({
				userName: req.body.userName,
			})
			.toArray((err, result) => {
				if (err) throw err;

				if (result.length !== 0) {
					res.status(200);
					res.json({
						userName,
						message: 'Authenticated',
					});
				} else {
					res.status(401);
					res.json({ message: 'Unauthenticated' });
				}
			});
	});
});

app.post('/api/postFullUser', (req, res) => {
	client.connect((error) => {
		if (error) throw error;
		user = {
			userName: req.body.userName,
			password: req.body.password,
		};

		const db = client.db(dbName);
		const collection = db.collection('credentials');

		collection
			.find({
				userName: req.body.userName,
			})
			.toArray(async (err, result) => {
				if (result.length === 0) {
					res.status(401);
					res.json({
						userName,
						message: 'username not correct',
					});
				}
				if (err) throw err;
				const match = await bcrypt.compare(
					req.body.password,
					result[0].password
				);

				if (match) {
					res.status(200);
					res.json({
						userName,
						message: 'Authenticated',
					});
				} else if (!match) {
					res.status(401);
					res.json({ message: 'Unauthenticated' });
				}
			});
	});
});

app.post('/api/createaccount', (req, res) => {
	client.connect((error) => {
		if (error) throw error;
		signUpCred = {
			email: req.body.email,
			userName: req.body.userName,
			password: req.body.password,
			following: new Array(),
			followers: new Array(),
		};

		const db = client.db(dbName);
		const credentialCollection = db.collection('credentials');
		credentialCollection
			.find({
				$or: [
					{ email: req.body.email },
					{ userName: req.body.userName },
				],
			})
			.toArray((err, result) => {
				if (err) throw err;
				const { email, userName, password } = signUpCred;
				const { confirmPassword } = req.body;
				let check = { inconsistency: false, taken: false };
				if (password !== confirmPassword || result.length !== 0) {
					if (password !== confirmPassword && result.length !== 0) {
						check.inconsistency = true;
						check.taken = true;
					} else if (
						password !== confirmPassword &&
						result.length === 0
					) {
						check.inconsistency = true;
						check.taken = false;
					} else {
						check.inconsistency = false;
						check.taken = true;
					}
					res.json({ message: check });
				} else if (result.length === 0) {
					res.status(200);

					res.json({
						signUpCred,
						message: 'created',
					});
					bcrypt.genSalt(6, (err, salt) => {
						bcrypt.hash(req.body.password, salt, (err, hash) => {
							credentialCollection.insertOne(
								{ ...signUpCred, password: hash },
								(err, result) => {
									assert.equal(err, null);
									assert.equal(1, result.result.n);
									assert.equal(1, result.ops.length);
									console.log(
										'credentials collection one inserted'
									);
								}
							);
							db.createCollection(signUpCred.userName);
						});
					});
				}
			});
	});
});

app.post('/api/postText', (req, res) => {
	client.connect((error) => {
		if (error) throw error;

		const db = client.db(dbName);
		const postsCollection = db.collection(req.body.userName || 'aa087159');
		postsCollection.find().toArray(async (err, result) => {
			postsCollection.insertOne(
				{
					userName: req.body.userName,
					title: req.body.title,
					text: req.body.text,
					heartCount: 0,
					shareCount: 0,
					reblogCount: 0,
					commentCount: 0,
					date: new Date(),
				},
				(err, result) => {
					assert.equal(err, null);
					assert.equal(1, result.result.n);
					assert.equal(1, result.ops.length);
					res.json({ message: 'text posted' });
					//console.log('posts collection one inserted');
				}
			);
		});
	});
});

app.get('/api/getPosts', (req, res) => {
	client.connect((error) => {
		if (error) throw error;
		const db = client.db(dbName);
		const postsCollection = db.collection(
			req.headers.collection || 'aa087159'
		);

		postsCollection
			.find()
			.sort({ date: -1 })
			.toArray(async (err, result) => {
				res.json(result);
			});
	});
});

app.post('/api/updatePost', (req, res) => {
	var ObjectID = require('mongodb').ObjectID;
	client.connect((error) => {
		if (error) throw error;
		const db = client.db(dbName);
		const postsCollection = db.collection(req.body.userName || 'aa087159');
		if (req.body.update === 'plus') {
			postsCollection.findOneAndUpdate(
				{ _id: ObjectID(req.body.id) },
				{ $inc: { heartCount: 1 } },
				{ returnOriginal: false },
				(err, user) => {
					if (err) throw err;
					res.json({ message: user.value.heartCount });
				}
			);
		} else {
			postsCollection.findOneAndUpdate(
				{ _id: ObjectID(req.body.id) },
				{ $inc: { heartCount: -1 } },
				{ returnOriginal: false },
				(err, user) => {
					if (err) throw err;
					res.json({ message: user.value.heartCount });
				}
			);
		}
	});
});

app.post('/api/commentPost', (req, res) => {
	let ObjectID = require('mongodb').ObjectID;
	client.connect((error) => {
		if (error) throw error;
		const db = client.db(dbName);
		const postsCollection = db.collection(req.body.userName || 'aa087159');
		postsCollection.findOneAndUpdate(
			{ _id: ObjectID(req.body.id) },
			{
				$addToSet: {
					comments: {
						userName: req.body.userName || 'aa087159',
						comment: req.body.comment,
						date: new Date(),
					},
				},
			},
			{
				sort: { 'comments.date': -1 },
				upsert: true,
				returnOriginal: false,
			},
			(err, user) => {
				if (err) throw err;
				console.log(user);
				res.json(user.value.comments);
			}
		);
	});
});

app.get('/api/getComments', (req, res) => {
	client.connect((error) => {
		if (error) throw error;
		const db = client.db(dbName);
		const postsCollection = db.collection(
			req.headers.username || 'aa087159'
		);
		postsCollection
			.aggregate(
				{ $unwind: '$comments' },
				{ $sort: { 'comments.date': -1 } },
				{ $group: { _id: '$_id', comments: { $push: '$comments' } } },
				{ $project: { comments: 1, _id: 0 } }
			)
			.toArray(async (err, result) => {
				res.json(result);
			});
	});
});

app.get('/api/getUser', (req, res) => {
	client.connect((error) => {
		if (error) throw error;
		const db = client.db(dbName);
		const postsCollection = db.collection(req.headers.username);
		postsCollection.find().toArray(async (err, result) => {
			res.json(result);
		});
	});
});

app.post('/api/followUser', (req, res) => {
	let ObjectID = require('mongodb').ObjectID;
	client.connect((error) => {
		if (error) throw error;
		const db = client.db(dbName);
		const credentials = db.collection('credentials');
		if (
			req.body.userName === '' ||
			req.body.userName === req.body.strangerUser
		) {
			res.status(400).send({ error: 'bad request!' });
		} else {
			credentials.findOneAndUpdate(
				{ userName: req.body.userName },
				{
					$addToSet: {
						following: {
							user: req.body.strangerUser,
							date: new Date(),
						},
					},
				},
				{
					upsert: false,
					returnOriginal: false,
				}
			);
			credentials.findOneAndUpdate(
				{ userName: req.body.strangerUser },
				{
					$addToSet: {
						followers: {
							user: req.body.userName,
							date: new Date(),
						},
					},
				},
				{
					upsert: false,
					returnOriginal: false,
				}
			);
		}
	});
});

const port = process.env.SERVER_PORT || 5002;
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
