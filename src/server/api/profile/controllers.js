/* eslint-disable class-methods-use-this */
import passport from 'passport';
import bcrypt from 'bcryptjs';

class ProfileCoontroller {
    getProfilePage(req, res) {
        res.status(200).render('create-profile');
    }
}

const profileController = new ProfileCoontroller();

export default profileController;