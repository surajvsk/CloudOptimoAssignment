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
    },

    findByCityName: (req, res, next) => {
        const {
            _user,
            city
        } = req.body
        Users.findByCityName(res.locals.user_id, city).then(result => {
            res.json({
                user_list: result.rows,
                _user: _user
            })
        })
    },

    findByStateName: (req, res, next) => {
        const {
            _user,
            state
        } = req.body
        Users.findByStateName(res.locals.user_id, state).then(result => {
            res.json({
                user_list: result.rows,
                _user: _user
            })
        })
    },

    findByDateName: (req, res, next) => {
        const {
            _user,
            start_date,
            end_date
        } = req.body

        Users.findByDateName(res.locals.user_id, start_date, end_date).then(result => {
            res.json({
                user_list: result.rows,
                _user: _user
            })
        })
    },

    bloodGroupInfo: (req, res, next) => {
        const {
            _user
        } = req.body

        Promise.all([Users.certificateInfo(res.locals.user_id), 
            Users.findAllPincode(), 
            Users.findVC1Certificate(), 
            Users.findVC2Certificate()]).then(result => {
            console.log('result:::::::::::::', result)
            res.render('admin/blood-grp-info', {
                user_list: result[0].rows,
                pincode_list: result[1].rows,
                findVC1Certificate: result[2].rows,
                findVC2Certificate: result[3].rows,
                _user: _user
            })
        })
    },

    findByPincode: (req, res, next)=>{
        const {
            _user, pincode
        } = req.body
        Users.findByPincode(res.locals.user_id, pincode).then(result => {
            res.json({
                user_list: result.rows,
                _user: _user
            })
        })
    },

    findByVC1:(req, res, next)=>{
        const {
            _user, cert
        } = req.body
        Users.findByCert1(res.locals.user_id, cert).then(result => {
            res.json({
                user_list: result.rows,
                _user: _user
            })
        })
    },

    findByVC2:(req, res, next)=>{
        const {
            _user, cert
        } = req.body
        Users.findByCert2(res.locals.user_id, cert).then(result => {
            res.json({
                user_list: result.rows,
                _user: _user
            })
        })
    }
}