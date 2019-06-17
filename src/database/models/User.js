import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	avatar: {
		type: String
	},

	password: {
		type: String,
		required: true
	},

	isLogin: {
		type: Boolean,
		default: false
	},

	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('users', UserSchema);

export default User;
