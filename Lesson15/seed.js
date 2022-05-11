const mongoose = require("mongoose")
const Subscriber = require("./models/subscriber")

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);

mongoose.connection

var contacts = [
    {
        name: "Duke",
        email: "Duke@hihi.com",
        zipCode: 10016
    },
    {
        name: "Huy",
        email: "Huy@hihi.com",
        zipCode: 20331
    },
    {
        name: "Wibu",
        email: "Wibu@hihi.com",
        zipCode: 19103
    }
];

Subscriber.deleteMany().exec().then(() => { console.log('Data empty') })

var commands = []

contacts.forEach(c => {
    commands.push(Subscriber.create({
        name: c.name,
        email: c.email
    }))
})

Promise.all(commands)
    .then((r) => {
        console.log(JSON.stringify(r))
        mongoose.connection.close()
    })
    .catch((error) => { console.log(`ERROR: ${error}`); })