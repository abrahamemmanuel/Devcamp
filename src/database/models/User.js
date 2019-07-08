import mongoose from 'mongoose';
import NumberInt from 'mongoose-int32';


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

	isLoggedIn: {
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
