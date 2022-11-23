const {
    validationResult
} = require('express-validator')

const Users = require('../modals/Users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {

    loginPage: (req, res, next) => {
        res.render('login')
    },

    dashboard: (req, res, next) => {
        res.render('index')
    },

    signUpPage: (req, res, next) => {
        res.render('signuppage')
    },

    registerUser: (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({
                statuscode: 422,
                errors: errors.array()
            });
            return;
        }


        const hashpass = bcrypt.hashSync(req.body.confirmPassword, saltRounds);
        let data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            phoneNo: req.body.phoneNo,
            password: hashpass,
            City: req.body.City,
            State: req.body.State,
            pincode: req.body.pincode,
            address: req.body.address,
            bloodGruop: req.body.bloodGruop,
            age: req.body.age,
            COVIDVaccinationCertificate1: req.body.COVIDVaccinationCertificate1,
            COVIDVaccinationCertificate1date: req.body.COVIDVaccinationCertificate1date,
            COVIDVaccinationCertificate2: req.body.COVIDVaccinationCertificate2,
            COVIDVaccinationCertificate2date: req.body.COVIDVaccinationCertificate2date,
            firstVaccinationCityName: req.body.firstVaccinationCityName,
            secondVaccinationCityName: req.body.secondVaccinationCityName
        }
        Users.insertUsers(data).then(result => {
            res.json({
                status: 200,
                data: result.rows[0].insert_user
            })
        }).catch(error => {
            res.json({
                status: 500,
                data: error
            })
        })


    }
}