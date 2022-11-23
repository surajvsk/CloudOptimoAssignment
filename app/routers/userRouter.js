const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
router.get('/user-dashboard', userController.userDashboard)
router.get('/admin-dashboard', userController.adminDashboard)
router.get('/user-vaccination', userController.userVaccination)
router.get('/admin-blood-grp-info', userController.bloodGroupInfo)

//FILTER ROUTER
router.post('/find-by-city-name', userController.findByCityName)
router.post('/find-by-state-name', userController.findByStateName)
router.post('/find-by-date-name', userController.findByDateName)

router.post('/find-by-pincode', userController.findByPincode)
router.post('/find-by-vc-1', userController.findByVC1)
router.post('/find-by-vc-2', userController.findByVC2)
module.exports = router;