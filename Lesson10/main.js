const express = require('express')
const app = express()
const homeController = require('./homeController')
const port = 3000
const layout = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(layout)

app.get("/name", homeController.respondWithName)
app.get("/name/:myName", homeController.respondWithName)

app.listen(port, () => { console.log(`Sever running on port ${port}`) })
