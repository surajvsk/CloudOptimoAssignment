const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const indexRouter =  require("./app/routers/indexRouter")



app.set('views', path.join(__dirname, './app/views'))
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs')
app.use(express.json({ limit: "200mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "200mb",
  })
);

app.use(indexRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})