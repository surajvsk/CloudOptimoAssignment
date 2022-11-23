const express = require('express')
const path = require('path')
const app = express()
const port = 5000
const redis = require('redis');
const cookieParser = require("cookie-parser");
const {
  v4: uuidv4
} = require("uuid");
const client = redis.createClient();


const indexRouter = require("./app/routers/indexRouter")
const userRouter = require("./app/routers/userRouter")

app.set('views', path.join(__dirname, './app/views'))
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs')
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.use(express.json({
  limit: "200mb"
}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(require("sanitize").middleware);
app.use(indexRouter)
app.use('/user', userRouter)

// set a cookie
app.use(function (req, res, next) {
  if (req.cookies.token === undefined) {
    res.cookie("token", uuidv4(), {
      maxAge: 1000 * 3600 * 24 * 30 * 2,
      path: "/",
    });
  }
  next();
});


(async function () {

  //console.clear();

  client.connect()
  .then(async (res) => {
    console.log('connected');
  
    app.locals.redisdb = client;
   // client.quit();
  })
  .catch((err) => {
    console.log('err happened' + err);
  });
  app.listen(port, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})
})();