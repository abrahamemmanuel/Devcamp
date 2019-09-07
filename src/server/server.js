import express from 'express';
import ejs from 'ejs';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import key from './config/keys';
import userRouter from './api/users/routes';
import profileRouter from './api/profile/routes';
import User from '../database/models/User';

// Create server
const app = express();

// Passport Config
require('./config/passport')(passport);

// Set static folder
app.use(express.static('public'));
app.use('/css', express.static('public'));

// Set View Engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// DB Config
const db = process.env.MONGODB_URI || key.LOCALDB_URI;

// Set useFindAndModify to false
mongoose.set('useFindAndModify', false);

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));// eslint-disable-line no-console

// Load routes
app.use(userRouter);
app.use(profileRouter);

// Get Landing page
app.get('/', (req, res) => res.status(200).render('landingpage'));
if (!module.parent) { app.listen(key.env, () => console.log(`Server running on port ${key.env}`)); }// eslint-disable-line no-console

export default app;
