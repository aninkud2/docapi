const express = require('express')
const {newDoc,logIn,docVerify,forgotPassword,resetPassword,logout} = require('../docController/docController')
const {adminSignUp, adminLogIn, UserVerify, Forgotpassword, resetpassword, changepassword} = require('../docController/addAdmin');
const {userSignUp,verifyUser, userlogIn, forgotpassword, Resetpassword, logOut} = require('../docController/userController');


const Router = express.Router()

Router.route('/sign').post(newDoc)
Router.route('/docVerify/:docid').post(docVerify)
Router.route('/login').post(logIn)
Router.route('/forgotpassword').post(forgotPassword)
Router.route("/changepassword/:id/:token").post(resetPassword)
Router.route('/logout').post(logout)


//admin routes
Router.route('/adminsignup').post(adminSignUp)
// Router.route('/userVerify/:id').post(verifyLink)
Router.route('/adminlogin').post(adminLogIn)
Router.route('/userVerify/:userid').post(UserVerify)
Router.route('/forgotpassword').post(Forgotpassword)
Router.route('/changepassword/:id/:token').post(resetpassword)
Router.route('/changepassword/:id').post(changepassword)

// user routes
Router.route('/signUp').post(userSignUp)
Router.route('/logIn').post(userlogIn)
Router.route('/verify/:id').post(verifyUser)
Router.route('/forgotpassword').post(forgotpassword)
Router.route('/changepassword/:id/:token').post(resetPassword)
Router.route('/logOut').post(logOut)

  

module.exports = Router     