const Users = require("../modals/Users")

module.exports = {

    userDashboard: (req, res, next) => {
        const {
            _user
        } = req.body
        Users.findById(res.locals.user_id).then(result => {
            console.log('result:::::::', result.rows)
            res.render('user/index', {
                userinfo: result.rows,
                _user: _user
            })
        })
    },

    adminDashboard: (req, res, next) => {
        const {
            _user
        } = req.body

        Users.findAllUsers(res.locals.user_id).then(result => {
            console.log('result:::::::', result.rows)
            res.render('admin/index', {
                userinfo: result.rows,
                _user: _user
            })
        })

    },

    userVaccination: (req, res, next) => {
        const {
            _user
        } = req.body
        Users.vaccinationByUserId(res.locals.user_id).then(result => {
            console.log('userVaccination:::::::', result.rows)
            res.render('user/vaccination', {
                vaccination: result.rows,
                _user: _user
            })
        })
    }
}