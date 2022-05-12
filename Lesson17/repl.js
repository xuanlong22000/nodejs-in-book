const mongoose = require("mongoose")
const Subscriber = require("./models/subscriber");
const Course = require("./models/course");
const subscriber = require("./models/subscriber");
var testCourse, testSubscriber

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

Subscriber.deleteMany({})
    .then(() => console.log(`Removed All Subscriber records!`))
    .then(() => {
        return Course.deleteMany({});
    })
    .then(() => console.log(`Removed All Course records!`))
    .then(() => {
        return Subscriber.create({
            name: "Long",
            email: "Long@hihihi.com",
            zipCode: "12345"
        });
    })
    .then((subscriber) => {
        testSubscriber = subscriber
        console.log(testSubscriber)
    })
    .then(() => {
        return Subscriber.findOne({
            name: "Long"
        });
    })
    .then((subscriber) => {
        console.log(`Found a data ${subscriber}`)
    })
    .then(() => {
        return Course.create({
            title: "Duke",
            description: "Duke bbbbbbbb",
            zipCode: 12345,
            items: ["lol", "cs:go"]
        });
    })
    .then(course => {
        testCourse = course;
        console.log(`Created course: ${course.title}`);
    })

    .then(() => {
        testSubscriber.courses.push(testCourse);
        testSubscriber.save();
    })
    .then(() => {
        return Subscriber.populate(testSubscriber, "courses");
    })
    .then(subscriber => console.log(subscriber))
    .then(() => {
        return Subscriber.find({
            courses: mongoose.Types.ObjectId(testCourse._id)
        });
    })
    .then(subscriber => console.log(subscriber));