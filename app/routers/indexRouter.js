const express = require('express');
const { loginPage } = require('../controllers/indexController');
const { validate } = require('../../Utils/validator');
const router = express.Router();

const indexController =  require("../controllers/indexController")

router.get('/', indexController.loginPage)
router.get('/login', indexController.dashboard)
router.get('/sign-up', indexController.signUpPage)
router.post('/register-user', validate('userInfoValidate'),  indexController.registerUser)

module.exports = router;