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
// @descr     Get edit-profile page
// @acces     Private
// @methd     GET
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


// @route     /api/profile/education
// @descr     Add education to profile object
// @acces     Private
// @methd     POST
profileRouter.post('/api/profile/education', ensureAuthenticated, profileController.addEducation);


// @route     /api/profile/education
// @descr     Add experience to profile object
// @acces     Private
// @methd     POST
profileRouter.post('/api/profile/experience', ensureAuthenticated, profileController.addExperience);


// @route     /api/profile/education
// @descr     Get add education
// @acces     Private
// @methd     POST
profileRouter.get('/api/profile/dashboard', ensureAuthenticated, profileController.dashboard);

export default profileRouter;
