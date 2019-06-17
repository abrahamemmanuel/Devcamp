import express from 'express';
import { ensureAuthenticated } from '../../config/auth';
import profileController from './controllers';

const profileRouter = express.Router();

// @route     /Profile
// @descr     Get users profile
// @acces     Private
// @methd     GET
profileRouter.get('/api/profile', ensureAuthenticated, profileController.getCurrentUserProfile);

// @route     /Profile
// @descr     Create or Edit users profile
// @acces     Private
// @methd     POST
profileRouter.post('/api/profile', ensureAuthenticated, profileController.createUserProfile);

export default profileRouter;
