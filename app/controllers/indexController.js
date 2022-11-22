const {
    validationResult
} = require('express-validator')

const Users = require('../modals/Users')
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


        let user_array = []
        user_array.push(req.body)
        console.log('req:::::::::::', user_array)
        Users.insertUsers(user_array).then(result => {
            console.log('result:::::::::::::',result.rows[0].insert_user)
            res.json({
                status: 200,
                data: result.rows[0].insert_user
            })
        }).catch(error => {
            console.log('error:::::::::::::',error)
        })


    }
}