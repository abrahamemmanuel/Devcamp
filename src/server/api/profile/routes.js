import express from 'express';
import { ensureAuthenticated } from '../../config/auth';
import profileController from './controllers';

const profileRouter = express.Router();

// @route     /api/profile
// @descr     Get users profile
// @acces     Private
// @methd     GET
profileRouter.get('/api/profile', ensureAuthenticated, profileController.getCurrentUserProfile);


// @route     /api/profile
// @descr     Create or Edit users profile
// @acces     Private
// @methd     POST
profileRouter.post('/api/profile', ensureAuthenticated, profileController.createUserProfile);


// @route     /api/edit-profile
// @descr     Create or Edit users profile
// @acces     Private
// @methd     POST
profileRouter.get('/api/edit-profile', ensureAuthenticated, profileController.editProfile);


// @route     /api/profile/exprience
// @descr     Get add experience
// @acces     Private
// @methd     GET
profileRouter.get('/api/profile/experience', ensureAuthenticated, profileController.getExperiencePage);


// @route     /api/profile/education
// @descr     Get add education
// @acces     Private
// @methd     GET
profileRouter.get('/api/profile/education', ensureAuthenticated, profileController.getEducationPage);

export default profileRouter;
