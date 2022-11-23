const {
  redisClient
} = require("../utils/redisClient");
exports.verify = function (req, res, next) {
  if (typeof req.cookies.token == "undefined") {
    res.redirect("/")
  } else {
    redisClient.client.get(req.cookies.token, async function (err, obj) {
      if (err) {
        console.error(err);
        res.status(500).json({status:500,msg:"something went wrong...try again later"})
      } else {
        let response = await obj;
        if (response) {
          response = JSON.parse(response);
          console.log('response::::::::::::::::>',response)
          req.body._user = {
            first_name: response.first_name,
            last_name: response.last_name,
            middle_name: response.middle_name,
            id: response.id,
          };
          res.locals.user_id = response.id;
          next();
        } else {
          res.redirect("/")
        }
      }
    });
  }
};