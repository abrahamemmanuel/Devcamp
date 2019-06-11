/* eslint-disable class-methods-use-this */
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../../../database/models/User';

class UserController {
  getLoginPage(req, res) {
    res.status(200).render('login');
  }

  getSignUpPage(req, res) {
    res.status(200).render('register');
  }

  registerUser(req, res) {
    const { name, email, password, password2 } = req.body;

    let errors = [];
    
    // Check required fields
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please fill in all fields' });
    }
    
    // Check passwords match
    if (password !== password2) {

      errors.push({ msg: 'Passwords do not match' });
    }


    // Check pass length
    if (password.length < 6) {
      errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
      res.render('register', { errors, name, email, password, password2 });
    } else {
      // Validation passed
      User.findOne({ email: email })
        .then(user => {
          if (user) {
            // User exists
            errors.push({ msg: 'User already exist with this email' });
            res.render('register', { errors, name, email, password, password2 });
          } else {
            const newUser = new User({
              name,
              email,
              password
            });

            // Hash password
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // Set password to hashed
              newUser.password = hash;
              // Save user
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.status(200).redirect('/users/login');
                  // res.status(200).json(user);
                })
                .catch(err => console.log(err));
            }));
          }
        });
    }
  }

  login(req, res, next) {
    passport.authenticate('local', {
     successRedirect: '/create-profile',
     failureRedirect: '/users/login',
     failureFlash: true,
    })(req, res, next);
  }

  logout(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  }

  dashboard(req, res) {
    res.status(200).render('dashboard');
  }
}

const userController = new UserController();

export default userController;
