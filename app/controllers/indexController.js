const {validationResult} = require('express-validator')
module.exports = {
    loginPage:(req, res, next)=>{
        res.render('login')
    },

    dashboard:(req, res, next)=>{
        res.render('index')
    },

    signUpPage:(req, res, next)=>{
        res.render('signuppage')
    },
    registerUser:(req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.send(formTemplet({errors}))
    }
        console.log('req:::::::::::',JSON.stringify(req.body))
    }
}