const express = require('express');
const {adminSignUp, adminLogIn, UserVerify, Forgotpassword, resetpassword, changepassword} = require('../docController/addAdmin');


const Router = express.Router();

Router.route('/adminsignup').post(adminSignUp)
// Router.route('/userVerify/:id').post(verifyLink)
Router.route('/adminlogin').post(adminLogIn)
Router.route('/userVerify/:userid').post(UserVerify)
Router.route('/forgotpassword').post(Forgotpassword)
Router.route('/changepassword/:id/:token').post(resetpassword)
Router.route('/changepassword/:id').post(changepassword)

module.exports = Router