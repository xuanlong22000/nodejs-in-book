const Courses = require('../models/Courses')
const { multipleMongooseObject } = require('../../util/mongoose')

exports.storedCourses = (req, res, next) => {
    Courses.find({})
        .then((course) => {
            res.render('me/stored-courses', { courses: multipleMongooseObject(course) })
        })
}

exports.trashCourses = (req, res, next) => {
    Courses.findDeleted({})
        .then((course) => {
            res.render('me/trash-courses', { courses: multipleMongooseObject(course) })
        })
}