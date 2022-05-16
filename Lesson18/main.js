const mongoose = require('mongoose')
const homeController = require('./controllers/homeController')
const usersController = require("./controllers/usersController");
const User = require('./models/user')
const Subscriber = require('./models/subscriber')
const Course = require('./models/course')
const express = require('express')
const app = express()
const layout = require('express-ejs-layouts')
const port = 3000

app.set('view engine', 'ejs')
app.use(layout)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// var testUser;
// User.create({
//     name: {
//         first: "Long",
//         last: "Bui"
//     },
//     email: "long@hihihi.com",
//     password: "pass123"
// })
//     .then(user => {
//         testUser = user;
//         return Subscriber.findOne({
//             email: user.email
//         });
//     })
//     .then(subscriber => {
//         testUser.subscribedAccount = subscriber;
//         testUser.zipCode = subscriber.zipCode;
//         testUser.courses = subscriber.courses;
//         testUser.save().then(() => console.log("user updated"));
//     })
//     .catch(error => console.log(error.message));

app.get("/users", usersController.index)

app.listen(port, () => { console.log(`Sever running on port ${port}`) })