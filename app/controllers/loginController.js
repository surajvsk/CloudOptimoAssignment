const {
    validationResult
} = require('express-validator')

const Users = require('../modals/Users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {
    redisClient
  } = require("../../Utils/RedisClient");

module.exports = {

    login: (req, res) => {
        console.log('res::::::::::::::::::::', req)
        let token = req.cookies.token;
        Users.findByuserName(req.body.username).then(dbresult => {
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
                        redisClient.client.set(
                            token,
                            user,
                            async function (err, response) {
                              if (err) {
                                console.log(err);
                                res.status(500).json({sttaus:500,msg:"something went wrong...try again later"})
                              } else {
                                let resp = await response;
                                console.log("resp redis write ==> ", resp);
                                redisClient.client.expire(token, process.env.REDIS_TTL);
                                console.log("role", dbresult.rows[0].role);
                                if (typeof dbresult.rows[0].role == "undefined") {
                                    res.status(500).json({sttaus:500,msg:"something went wrong...try again later"})
                                } else {
                                  console.log('SUCCESS LOGIN')
                                  if (dbresult.rows[0].role == "USER") {
                                   res.json({
                                          status: 200,
                                          redirect: "/user/user-dashboard"
                                      })
                                  } else {
                                   res.json({
                                          status: 200,
                                          redirect: "/user/admin-dashboard"
                                      })
                                  }
                                }
                              }
                            }
                          );
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
        if (typeof req.cookies.token == "undefined") {
            res.redirect("/login")
        } else {
          redisClient.client.get(req.cookies.token, async function (err, obj) {
            if (err) {
              console.error(err);
              res.redirect("/login")
            } else {
              res.clearCookie("token");
              redisClient.client.del(
                req.cookies.token,
                async function (err, result) {
                  if (err) {
                    console.error(err);
                  res.redirect("/login")
                  } else {
                    let response = await result;
                    if (response == 1) {
                        res.redirect("/login")
                    } else {
                      console.log("error in logout");
                    }
                  }
                }
              );
            }
          });
        }
      }
}