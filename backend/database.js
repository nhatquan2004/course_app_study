const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const connectionString = process.env.ATLAS_URI;

async function fetchDB() {
	mongoose.connect(connectionString).then(() => {
		console.log('MongooseDB Connected');
	});
}

module.exports = fetchDB;
