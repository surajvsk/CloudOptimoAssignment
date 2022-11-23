const {
    validationResult
} = require('express-validator')

const Users = require('../modals/Users')
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {

    login: (req, res) => {

        Users.findByuserName(req.body.username).then(dbresult => {

            if (dbresult.rows.length > 0) {
                bcrypt.compare(req.body.password, dbresult.rows[0].password, function (err, result) {
                    if (result) {
                        //LOGIN SUCCESS
                        console.log("result::::::::::::", dbresult.rows[0])
                        console.log('SUCCESS LOGIN')

                        if (dbresult.rows[0].role == "USER") {
                            res.json({
                                status: 200,
                                redirect: "/user-dashboard"
                            })
                        } else {
                            res.json({
                                status: 200,
                                redirect: "/admin-dashboard"
                            })
                        }
                    } else {
                        //INVALID LOGIN INFO
                        res.json({
                            status: 400,
                            msg: "Invalid username and password"
                        })
                    }
                });
            } else {
                res.json({
                    status: 400,
                    msg: "User not exist"
                })
            }


        })


    }
}