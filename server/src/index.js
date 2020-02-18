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
		origin: `http://localhost:${process.env.CLIENT_PORT}`
	})
);
app.use(express.json());

app.get('/', (req, res) => {
	client.connect((err) => {
		assert.equal(null, err);
		console.log('get server connected');

		const db = client.db(dbName);

		const collection = db.collection('credentials');
		// Find some documents
		collection.find({}).toArray((err, docs) => {
			assert.equal(err, null);
			console.log('Found the following records');
			console.log(docs);
			res.send(JSON.stringify(docs));
		});
		//client.close();
	});
});

app.post('/api/postUserName', (req, res) => {
	client.connect((error) => {
		if (error) throw error;
		console.log('post server connected...');
		userName = {
			userName: req.body.userName
		};

		const db = client.db(dbName);
		const collection = db.collection('credentials');

		collection
			.find({
				userName: req.body.userName
			})
			.toArray((err, result) => {
				if (err) throw err;

				if (result.length !== 0) {
					res.status(200);
					res.json({
						userName,
						message: 'Authenticated'
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
		console.log('post server connected...');
		user = {
			userName: req.body.userName,
			passWord: req.body.passWord
		};
		const db = client.db(dbName);
		const collection = db.collection('credentials');

		collection
			.find({
				userName: req.body.userName
			})
			.toArray(async (err, result) => {
				if (result.length === 0) {
					res.status(401);
					res.json({
						userName,
						message: 'username not correct'
					});
				}
				if (err) throw err;
				const match = await bcrypt.compare(
					req.body.passWord,
					result[0].passWord
				);

				if (match) {
					res.status(200);
					res.json({
						userName,
						message: 'Authenticated'
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
		console.log('create account server connected...');
		signUpCred = {
			email: req.body.email,
			userName: req.body.userName,
			passWord: req.body.passWord
		};

		const db = client.db(dbName);
		const credentialCollection = db.collection('credentials');
		const postsCollection = db.collection('posts');
		credentialCollection
			.find({
				$or: [
					{ email: req.body.email },
					{ userName: req.body.userName }
				]
			})
			.toArray((err, result) => {
				if (err) throw err;
				const { email, userName, passWord } = signUpCred;
				const { confirmPassWord } = req.body;
				let check = { inconsistency: false, taken: false };
				if (passWord !== confirmPassWord || result.length !== 0) {
					if (passWord !== confirmPassWord && result.length !== 0) {
						check.inconsistency = true;
						check.taken = true;
					} else if (
						passWord !== confirmPassWord &&
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
						message: 'created'
					});
					bcrypt.genSalt(6, (err, salt) => {
						bcrypt.hash(req.body.passWord, salt, (err, hash) => {
							credentialCollection.insertOne(
								{ ...signUpCred, passWord: hash },
								(err, result) => {
									assert.equal(err, null);
									assert.equal(1, result.result.n);
									assert.equal(1, result.ops.length);
									console.log(
										'Inserted 1 documents into the collection'
									);
								}
							);
							postsCollection.insertOne(
								{ email, userName },
								(err, result) => {
									assert.equal(err, null);
									assert.equal(1, result.result.n);
									assert.equal(1, result.ops.length);
									console.log(
										'Inserted 1 documents into the collection'
									);
								}
							);
						});
					});
				}
			});
	});
});

const port = process.env.SERVER_PORT || 5002;
app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
