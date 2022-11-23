const express = require('express');
const { loginPage } = require('../controllers/indexController');
const  validate  = require('../../Utils/validator');
const router = express.Router();

const indexController =  require("../controllers/indexController")
const loginController =  require("../controllers/loginController")

router.get('/', indexController.loginPage)
router.get('/login', indexController.dashboard)
router.get('/sign-up', indexController.signUpPage)
router.post('/register-user', validate('userInfoValidate'),  indexController.registerUser)
router.post('/login', loginController.login)
router.get('/logout', loginController.logout);
module.exports = router;