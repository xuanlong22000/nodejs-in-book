const Courses = require('../models/Courses')

exports.index = (req, res) => {
    Courses.find({}, (error, courses) => {
        if (error) throw error
        res.json(courses)
    })

    // res.render('home')
}

exports.search = (req, res) => {
    res.render('search')
}