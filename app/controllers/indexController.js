module.exports = {
    loginPage:(req, res, next)=>{
        res.render('login')
    },

    dashboard:(req, res, next)=>{
        res.render('index')
    },

    signUpPage:(req, res, next)=>{
        res.render('signuppage')
    }
}