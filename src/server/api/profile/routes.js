import express from 'express';
import { ensureAuthenticated } from '../../config/auth';
import profileController from './controllers';

const profileRouter = express.Router();

// @route     /create-profile
// @descr     Get create-profile page
// @acces     Private
// @methd     GET
profileRouter.get('/create-profile', ensureAuthenticated, profileController.getProfilePage);

export default profileRouter;
