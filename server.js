require("dotenv").config();
const express = require("express");
const path = require("path");
const redis = require('redis');
const middleware = require("./middleware/loginValidate");
const { redisClient } = require("./Utils/RedisClient");
const app = express();
const {
  v4: uuidv4
} = require("uuid");
const cookieParser = require("cookie-parser");
const port = 5000

app.use(express.json({
  limit: "200mb"
}));
app.use(
  express.urlencoded({
    extended: true,
    limit: "200mb",
  })
);

//const client = redis.createClient();

app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

// set a cookie
app.use(function (req, res, next) {
  console.log('TOKEN:::::::::>>', req.cookies.token)
  if (req.cookies.token === undefined) {
    res.cookie("token", uuidv4(), {
      maxAge: 1000 * 3600 * 24 * 30 * 2,
      path: "/",
    });
  }
  next();
});



app.use(require("sanitize").middleware);



app.use(require("sanitize").middleware);
//Router Configuration
//Routers
const indexRouter = require("./app/routers/indexRouter")
const userRouter = require("./app/routers/userRouter")
app.use(indexRouter)
app.use('/user', middleware.verify, userRouter)

app.set('views', path.join(__dirname, './app/views'))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");




(async function () {
  console.clear();
  await redisClient.connect(
    process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    process.env.REDIS_PASS
  );
  app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
  })
})();