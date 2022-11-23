const express = require('express');
const router = express.Router();



const userController =  require("../controllers/userController")

router.get('/user-dashboard',  userController.userDashboard)
router.get('/admin-dashboard',  userController.adminDashboard)
router.get('/user-vaccination' ,  userController.userVaccination)
module.exports = router;