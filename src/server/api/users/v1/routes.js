import express from 'express';
import userController from './controllers';

const userRouter = express.Router();

/**
 * @route     /v1/login
 * @descr     Get user login page
 * @acces     Public
 * @methd     GET
 */
userRouter.get('/login', userController.getLoginPage);

export default userRouter;
