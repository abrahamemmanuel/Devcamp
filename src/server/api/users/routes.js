import express from 'express';
import { ensureAuthenticated } from '../../config/auth';
import userController from './controllers';

const userRouter = express.Router();

// @route     /users/login
// @descr     Get user Login page
// @acces     Public
// @methd     GET
userRouter.get('/users/login', userController.getLoginPage);


// @route     /users/register
// @descr     Get user signup page
// @acces     Public
// @methd     GET
userRouter.get('/users/register', userController.getSignUpPage);


// @route     /users/register
// @descr     Register new user
// @acces     Private
// @methd     POST
userRouter.post('/users/register', userController.registerUser);


// @route     /users/login
// @descr     Login user
// @acces     Private
// @methd     POST
userRouter.post('/users/login', userController.login);


// @route     /dashboard
// @descr     Get dashboard
// @acces     Private
// @methd     GET
userRouter.get('/dashboard', ensureAuthenticated, userController.dashboard);


// @route   '/logout
// @desc     Logout User
// @access   Private
// @method   POST
userRouter.get('/logout', userController.logout);


export default userRouter;
