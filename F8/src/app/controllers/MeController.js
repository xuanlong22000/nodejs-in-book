const Courses = require('../models/Courses')
const { multipleMongooseObject } = require('../../util/mongoose')

exports.storedCourses = (req, res, next) => {

    let courseQuery = Courses.find({})
    if (req.query.hasOwnProperty('_sort')) {
        courseQuery = courseQuery.sort({
            [req.query.column]: req.query.type
        })
    }

    Promise.all([courseQuery, Courses.countDocumentsDeleted()])
        .then(([courses, deletedCount]) => {
            res.render('me/stored-courses', { deletedCount, courses: multipleMongooseObject(courses) })
        })

    // Courses.find({})
    //     .then((course) => {
    //         res.render('me/stored-courses', { courses: multipleMongooseObject(course) })
    //     })
}

exports.trashCourses = (req, res, next) => {
    Courses.findDeleted({})
        .then((course) => {
            res.render('me/trash-courses', { courses: multipleMongooseObject(course) })
        })
}