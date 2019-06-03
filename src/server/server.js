import express from 'express';
import path from 'path';
import ejs from 'ejs';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import key from './config/keys';
import router from './api/api';

// Create server
const app = express();

// load api routes
const api = router;

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

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flashhero
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

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));// eslint-disable-line no-console

// Routes
app.use('/api', api);

// Get Landing page
app.get('/', (req, res) => res.status(200).render('landingpage'));
if (!module.parent) { app.listen(key.env, () => console.log(`Server running on port ${key.env}`)); }// eslint-disable-line no-console

export default app;
