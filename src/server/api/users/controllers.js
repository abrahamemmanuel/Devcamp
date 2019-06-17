/* eslint-disable class-methods-use-this */
import passport from 'passport';
import bcrypt from 'bcryptjs';
import gravatar from 'gravatar';
import User from '../../../database/models/User';
import validateRegisterInput from '../../../utils/validation/register';

class UserController {
	getLoginPage(req, res) {
		res.status(200).render('login');
	}

	getSignUpPage(req, res) {
		res.status(200).render('register');
	}

	registerUser(req, res) {
		const { name, email, password, password2 } = req.body;
		const errors = validateRegisterInput(name, email, password, password2);
		if (errors.length > 0) {
			res.status(404).render('register', { errors, name, email, password, password2 });
		} else {
			// Validation passed
			User.findOne({ email: email }).then(user => {
				if (user) {
					// User exists
					errors.push({ msg: 'User already exist with this email' });
					res
						.status(404)
						.render('register', { errors, name, email, password, password2 });
				} else {
					const avatar = gravatar.url(req.body.email, {
						s: '200', // Size
						r: 'pg', //Rating
						d: 'mm' // Default
					});

					const newUser = new User({
						name,
						email,
						avatar,
						password
					});

					// Hash password
					bcrypt.genSalt(10, (err, salt) =>
						bcrypt.hash(newUser.password, salt, (err, hash) => {
							if (err) throw err;
							// Set password to hashed
							newUser.password = hash;
							// Save user
							newUser
								.save()
								.then(user => {
									req.flash(
										'success_msg',
										'You are now registered and can log in'
									);
									res.redirect('/api/users/login');
								})
								.catch(err => console.log(err));
						})
					);
				}
			});
		}
	}

	login(req, res, next) {
		passport.authenticate('local', {
			successRedirect: '/api/dashboard',
			failureRedirect: '/api/users/login',
			failureFlash: true
		})(req, res, next);
	}

	logout(req, res) {
		req.logout();
		req.flash('success_msg', 'You are logged out');
		res.redirect('/api/users/login');
	}

	dashboard(req, res) {
		res.status(200).render('dashboard');
	}
}

const userController = new UserController();

export default userController;
