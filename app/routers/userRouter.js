const express = require('express');
const middleware = require("../../middleware/loginValidate");
const router = express.Router();

const userController =  require("../controllers/userController")

router.get('/user-dashboard', middleware.verify, userController.userDashboard)
router.get('/admin-dashboard', middleware.verify, userController.adminDashboard)

module.exports = router;