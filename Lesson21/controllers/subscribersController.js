const Subscriber = require("../models/subscriber")
const getSubscriberParams = (body) => {
    return {
        name: body.name,
        email: body.email,
        zipCode: parseInt(body.zipCode)
    }
}

module.exports = {
    index: (req, res, next) => {
        Subscriber.find()
            .then(subscribers => {
                res.render('subscribers/index', { subscribers: subscribers })
            })
            .catch(error => {
                console.log(`Error fetching subscribers: ${error.message}`);
                next(error);
            });
    },

    new: (req, res) => {
        res.render('subscribers/new')
    },

    create: (req, res, next) => {
        // let subscriberParams = getSubscriberParams(req.body)
        // Subscriber.create(subscriberParams)
        //     .then(subscriber => {
        //         res.locals.redirect = '/subscribers'
        //         res.locals.subscriber = subscriber
        //     })
        //     .catch(error => {
        //         console.log(`Error saving subscriber:${error.message}`);
        //         next(error);
        //     });

        const subscriber = new Subscriber(getSubscriberParams(req.body))
        subscriber.save()
            .then(() => res.redirect('/subscribers'))
            .catch((error) => { console.log(error) })
    },

    // redirectView: (req, res, next) => {
    //     let redirectPath = res.locals.redirect
    //     if (redirectPath) res.redirect(redirectPath)
    //     else next()
    // },

    show: (req, res, next) => {
        Subscriber.findById(req.params.id)
            .then(subscriber => {
                res.render('subscribers/show', { subscriber: subscriber })
            })
    },

    edit: (req, res, next) => {
        Subscriber.findById(req.params.id)
            .then(subscriber => {
                res.render('subscribers/edit', { subscriber: subscriber })
            })
            .catch(error => {
                console.log(`Error fetching subscriber by ID: ${error.message}`);
                next(error);
            });
    },

    update: (req, res, next) => {
        Subscriber.updateOne({ _id: req.params.id }, getSubscriberParams(req.body))
            .then(() => {
                res.redirect(`/subscribers/${req.params.id}`)
            })
            .catch(error => {
                console.log(`Error updating subscriber by ID: ${error.message}`);
                next(error);
            });
    },

    delete: (req, res, next) => {
        Subscriber.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/subscribers'))
    },

    welcome: (req, res, next) => {
        res.render('welcome')
    }

}