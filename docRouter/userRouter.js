const express = require ('express');
const {userSignUp,verifyUser, userlogIn, forgotPassword, resetpassword, logOut} = require('../CONTROLLERS/userController');

const router = express.Router();
router.route('/signUp').post(userSignUp)
router.route('/logIn').post(userlogIn)
router.route('/verify/:id').post(verifyUser)
router.route('/forgotpassword').post(forgotPassword)
router.route('/changepassword/:id/:token').post(resetpassword)
router.route('/logOut').post(logOut)


module.exports = router;
