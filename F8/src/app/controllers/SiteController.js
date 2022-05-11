const Courses = require('../models/Courses')
const { multipleMongooseObject } = require('../../util/mongoose')

exports.index = (req, res) => {
    Courses.find({}).then(courses => {
        // courses = courses.map(course => course.toObject())
        res.render('home', { courses: multipleMongooseObject(courses) })
    })

    // res.render('home')
}

exports.search = (req, res) => {
    res.render('search')
}