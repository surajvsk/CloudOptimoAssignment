
  exports.verify = function (req, res, next) {
    let redisDb = req.app.locals.redisdb
    let token = req.cookies.token;

    console.log('redisDb:::::::::::::::::>>',req.cookies.token)

    if (typeof req.cookies.token == "undefined") {
      res.status(500).json({
        status:500,
        msg:"something went wrong...try again later",
        redirect:"/"
       })
    } else {
      redisDb.get(req.cookies.token, async function (err, obj) {
        if (err) {
          console.error(err);
       res.status(500).json({
        status:500,
        msg:"something went wrong...try again later",
        redirect:"/"
       })
        } 
      }).then(redisResp=>{
        console.log("redisResp::::::::::::", redisResp)
        if (redisResp) {
          response = JSON.parse(redisResp);
          req.body._user = {
              first_name: response.first_name,
              last_name: response.last_name,
              middle_name: response.middle_name,
              id: response.id,
          };
          res.locals.user_id = response.id;
          next();
        } else {
        res.json({status:500, redirect:'/'})
        }
      });
    }
  };
  