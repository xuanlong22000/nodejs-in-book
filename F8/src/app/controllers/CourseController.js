const Courses = require('../models/Courses')
const { mongooseToObject } = require('../../util/mongoose')

exports.show = (req, res, next) => {
    Courses.findOne({ slug: req.params.slug })
        .then(course => {
            res.render('courses/show', { course: mongooseToObject(course) })
        })
        .catch(next)
}

exports.create = (req, res, next) => {
    res.render('courses/create')
}

exports.store = (req, res, next) => {
    res.json(req.body)
}