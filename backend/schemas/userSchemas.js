const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user',
		required: true,
	},
	password: {
		type: String,
		required: false,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	invitationToken: {
		type: String,
	},
	invitationTokenExpires: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
