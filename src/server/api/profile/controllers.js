/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose';
import Profile from '../../..//database/models/Profile';
import User from '../../..//database/models/User';
import validateProfileInput from '../../../utils/validation/profile';

class ProfileCoontroller {
  getCurrentUserProfile(req, res) {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          // Add to the errors object
          errors.noprofile = "You don't have a profile yet";
          return res.status(400).render('create-profile', { errors });
        } else {
          return res.status(200).render('private-profile', { profile });
        }
      })
      .catch(err => res.status(501).json(err));
  }

  editProfile(req, res) {
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => res.status(200).render('edit-profile', { profile }));
  }

  createUserProfile(req, res) {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).redirect('/api/profile', { errors });
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    // Skills split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (profile) {

          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.status(200).render('edit-profile', { profile }));
        } else {
          //Create

          // Check if handle exist
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              // Add to errors
              errors.handle = 'That handle already exist';
              return res.status(400).render('create-profile', { errors });
            }

            // Save Profile
            new Profile(profileFields)
              .save()
              .then(profile => res.status(200).render('private-profile', { profile }));
          });
        }
      });

  }

  getExperiencePage(req, res) {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          // Add to the errors object
          errors.noprofile = "You don't have a profile yet";
          return res.status(400).render('create-profile', { errors });
        } else {
          return res.status(200).render('add-experience', { profile });
        }
      })
      .catch(err => res.status(501).json(err));
  }

  getEducationPage(req, res) {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          // Add to the errors object
          errors.noprofile = "You don't have a profile yet";
          return res.status(400).render('create-profile', { errors });
        } else {
          return res.status(200).render('add-education', { profile });
        }
      })
      .catch(err => res.status(501).json(err));
  }

  addEducation(req, res) {
    // Find loggedin user by id
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // create new Education object
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }

        // Add to edu array
        profile.education.unshift(newEdu);

        profile.save().then(profile => res.redirect('/api/profile/dashboard'))
      });
  }

  addExperience(req, res) {
    // Find loggedin user by id
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // create new Education object
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }

        // Add to exp array
        profile.experience.unshift(newExp);

        profile.save().then(profile => res.redirect('/api/profile/dashboard'))
      });
  }

  dashboard(req, res) {
    Profile.findOne({ user: req.user.id })
      .populate('users', ['name', 'isLoggedIn'])
      .then(profile => res.status(200).render('dashboard', { profile }))
  }
}

const profileController = new ProfileCoontroller();

export default profileController;
