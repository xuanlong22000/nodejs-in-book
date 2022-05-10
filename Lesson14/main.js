const Subscriber = require('./model/subscriber')
const mongoose = require('mongoose')

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
)

// const subscriberSchema = mongoose.Schema({
//     name: String,
//     email: String,
//     zipCode: Number
// })

// const Subscriber = mongoose.model("Subscriber", subscriberSchema)

Subscriber.create(
    {
        name: 'Long12',
        email: 'Long12@hihi.com'
    }, (error, saveDocument) => {
        if (error) console.log(error)
        console.log(saveDocument)
    }
)

var myQuery = Subscriber.findOne({ name: 'Long' }).where('email', /hi/)

myQuery.exec((error, data) => {
    if (error) console.log(error)
    console.log(data)
})

