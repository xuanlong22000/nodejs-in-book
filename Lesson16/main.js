const mongoose = require("mongoose");
const express = require('express')
const app = express()
const layout = require('express-ejs-layouts')
const subscribersController = require('./controller/subscribersController')
const port = 3000

app.set('view engine', 'ejs')
app.use(layout)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(
    "mongodb://localhost:27017/confetti_cuisine",
    { useNewUrlParser: true }
);

app.get('/contact', subscribersController.getSubscriptionPage)
app.post('/subscribe', subscribersController.saveSubscribers)

app.get('/subscribers', subscribersController.getAllSubscribers, (req, res) => {
    res.send('subscribers', { subscribers: req.data })
})

app.listen(port, () => { console.log(`Sever running on port ${port}`) })