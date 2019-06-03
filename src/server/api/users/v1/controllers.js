/* eslint-disable class-methods-use-this */
import passport from 'passport';
import bcrypt from 'bcryptjs';

class  UserController{
  getLoginPage(req, res){
   res.render('login');
  }
}

const userController = new UserController();

export default userController;