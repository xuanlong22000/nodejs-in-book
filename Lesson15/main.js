const express = require('express')
const app = express()
const subscribersController = require('./controller/subscribersController')
const mongoose = require('mongoose')
const port = 3000
const layout = require('express-ejs-layouts')

app.set("view engine", "ejs");
app.use(layout);

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
)

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

app.get('/subscribers', subscribersController.getAllSubscribers, (req, res, next) => {
    // res.send(req.data)
    res.render('subscribers', { subscribers: req.data })
})



app.listen(port, () => { console.log(`Sever running on port ${port}`) })