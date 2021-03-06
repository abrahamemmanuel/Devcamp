import express from 'express';
import { ensureAuthenticated } from '../../config/auth';
import userController from './controllers';

const userRouter = express.Router();

// @route     /users/login
// @descr     Get user Login page
// @acces     Public
// @methd     GET
userRouter.get('/api/users/login', userController.getLoginPage);

// @route     /users/register
// @descr     Get user signup page
// @acces     Public
// @methd     GET
userRouter.get('/api/users/register', userController.getSignUpPage);

// @route     /users/register
// @descr     Register new user
// @acces     Private
// @methd     POST
userRouter.post('/api/users/register', userController.registerUser);

// @route     /users/login
// @descr     Login user
// @acces     Private
// @methd     POST
userRouter.post('/api/users/login', userController.login);

// @route     /api/users/updateAuth
// @descr     Update user loggin status
// @acces     Private
// @methd     UPDATE
userRouter.get('/api/users/updateAuth', ensureAuthenticated, userController.isLoggedIn);

// @route   '/logout
// @desc     Logout User
// @access   Private
// @method   POST
userRouter.get('/api/logout', userController.logout);

// @route   '/index
// @desc     Logout User
// @access   Private
// @method   GET
userRouter.get('/index', ensureAuthenticated, userController.getIndexPage);

export default userRouter;
