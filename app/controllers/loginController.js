const {
    validationResult
} = require('express-validator')

const Users = require('../modals/Users')
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = {

    login: (req, res) => {
        Users.findByuserName(req.body.username).then(dbresult => {
            let redisDb = req.app.locals.redisdb
            let token = req.cookies.token;
            console.log('token:::::::::::::',token)
            if (dbresult.rows.length > 0) {
                bcrypt.compare(req.body.password, dbresult.rows[0].password, function (err, result) {
                    if (result) {
                        //LOGIN SUCCESS
                        console.log("result::::::::::::", dbresult.rows[0])
                        let user = {};
                        user.first_name = dbresult.rows[0].first_name;
                        user.last_name = dbresult.rows[0].last_name;
                        user.middle_name = dbresult.rows[0].middle_name;
                        user.id = dbresult.rows[0].id;
                        user = JSON.stringify(user);
                   
                        redisDb.set(
                            token,
                            user,
                            async function (err, response) {
                                console.log('response::::::::::::>>', response)
                                if (err) {
                                    console.log('err::::::::::::>>', err)
                                    res.json({
                                        status: 500,
                                        msg: "something went wrong...try again later"
                                    })
                                }
                            }
                        ).then(redisres => {
                            console.log('redisres', redisres)
                            if (redisres) {
                                //redisDb.expire(token, process.env.REDIS_TTL);

                                console.log('SUCCESS LOGIN')
                                if (dbresult.rows[0].role == "USER") {
                                 res.json({
                                        status: 200,
                                        redirect: "/user/user-dashboard"
                                    })
                                } else {
                                 res.json({
                                        status: 200,
                                        redirect: "/admin/admin-dashboard"
                                    })
                                }
                            }
                        })

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
    },

    logout: function (req, res) {
        console.log('LOGOUT CALLL')
        let redisDb = req.app.locals.redisdb
        let token = req.cookies.token;
        console.log('token::::::::::::', token)
        console.log('redisDb::::::::::::', redisDb)
        if (typeof req.cookies.token == "undefined") {
            res.clearCookie("token");
        return   res.redirect("/")
        } else {
            redisDb.get(req.cookies.token, async function (err, obj) {
                if (err) {
                    console.error(err);
                    res.redirect("/")
                }
            }).then(result => {
                console.log('result::::::::>>>>><<<',result)
                res.clearCookie("token");
                redisDb.del(
                    req.cookies.token,
                    async function (err, _result) {
                        if (err) {
                            console.error(err);
                            res.redirect("/")
                        } else {
                            let response = await _result;
                            if (response == 1) {
                                res.redirect("/")
                            } else {
                                console.log("error in logout");
                            }
                        }
                    }
                ).then(deleted=>{
                    res.clearCookie("token");
                    res.redirect("/")
                })
            });
        }
    },
}