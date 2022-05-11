const Subscriber = require('../models/subscriber')

exports.getAllSubscribers = (req, res) => {
    Subscriber.find({}).exec()
        .then((subscribers) => {
            res.render('subscribers', { subscribers: subscribers })
        })
        .catch((error) => {
            res.send(error)
            return []
        })
        .then(() => {
            console.log('promise complete')
        })
}

exports.getSubscriptionPage = (req, res) => {
    res.render('contact')
}

exports.saveSubscribers = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    })

    newSubscriber.save()
        .then(() => {
            res.render('thanks')
        })
        .catch((error) => {
            res.send(error)
            console.log(error)
        })
}